import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { parsePublicHttpUrl, assertResolvesPublic } from "@/lib/url-guard";
import { clientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { buildExtractedSystemPrompt } from "@/lib/extracted-prompt";

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 12000);
}

async function fetchUrlText(url: string): Promise<string> {
  const parsed = parsePublicHttpUrl(url);
  if (!parsed || !(await assertResolvesPublic(parsed))) {
    throw new Error("URL is not a public http(s) address");
  }
  const res = await fetch(parsed, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PlaceCompanionBot/1.0)" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Failed to fetch URL: ${res.status}`);
  const finalUrl = parsePublicHttpUrl(res.url);
  if (res.url && !finalUrl) throw new Error("URL redirected to a non-public address");
  const html = await res.text();
  return stripHtml(html);
}

export async function POST(req: Request) {
  try {
    if (!rateLimit(`extract:${clientIp(req)}`, 5, 60_000)) {
      return rateLimitResponse();
    }

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const body = await req.json();
    const { text, url, files } = body as {
      text?: string;
      url?: string;
      files?: Array<{ name: string; base64: string }>;
    };
    console.log("[extract] request:", { hasUrl: !!url, hasText: !!text, fileCount: files?.length ?? 0 });

    if (!text && !url && (!files || files.length === 0)) {
      return Response.json({ error: "Provide a website URL, documents, or text description" }, { status: 400 });
    }

    let combinedText = "";

    // Source 1: URL
    if (url) {
      try {
        const scraped = await fetchUrlText(url);
        combinedText += `\n\n[WEBSITE CONTENT]\n${scraped}`;
        console.log("[extract] scraped URL, length:", scraped.length);
      } catch {
        console.warn("[extract] URL fetch failed, continuing with other sources");
        if (!text && (!files || files.length === 0)) {
          return Response.json(
            { error: "Could not fetch that URL. Try uploading a document or pasting your hotel text instead." },
            { status: 422 },
          );
        }
      }
    }

    // Source 2: PDF files (parsing not available — skipped)
    if (files && files.length > 0) {
      for (const file of files) {
        combinedText += `\n\n[PDF UPLOAD: ${file.name} — processing not available]`;
      }
    }

    // Source 3: Additional text
    if (text) {
      combinedText += `\n\n[ADDITIONAL INFO]\n${text.slice(0, 6000)}`;
    }

    const sourceText = combinedText.trim().slice(0, 20000);

    if (sourceText.length < 30) {
      return Response.json(
        { error: "Not enough content found. Try adding more detail or uploading a document." },
        { status: 422 },
      );
    }

    console.log("[extract] calling AI, combined length:", sourceText.length);
    const { text: raw } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: `You are a hotel information extractor. Given raw hotel text or website content, extract structured information and return ONLY valid JSON with no markdown, no explanation, no code fences.`,
      messages: [
        {
          role: "user",
          content: `Extract hotel information from the text below. Return a JSON object with exactly these fields:
{
  "hotelName": "string or null",
  "restaurant": { "found": boolean, "name": "string or null", "hours": "string or null" },
  "spa": { "found": boolean, "name": "string or null", "hours": "string or null" },
  "amenities": { "found": boolean, "list": ["array of strings"] },
  "policies": { "found": boolean, "checkIn": "string or null", "checkOut": "string or null", "other": "string or null" },
  "nearby": { "found": boolean, "list": ["array of strings"] },
  "location": "string or null",
  "summary": "2-3 sentence summary of this hotel for an AI assistant to use as context"
}

Hotel text:
${sourceText}`,
        },
      ],
      maxOutputTokens: 1024,
    });

    console.log("[extract] AI response (first 500):", raw.slice(0, 500));
    // Strip markdown code fences if present
    const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    let extracted: Record<string, unknown>;
    try {
      extracted = JSON.parse(cleaned);
    } catch (e) {
      console.error("[extract] JSON parse failed. Raw response:", raw.slice(0, 500), e);
      return Response.json(
        { error: "Could not parse hotel information. Please try again." },
        { status: 422 },
      );
    }

    // Build the system prompt the onboarding preview will use. The saved
    // production assistant reuses this exact string (see onboarding page), so
    // preview and production stay identical.
    extracted.systemPrompt = buildExtractedSystemPrompt(extracted);

    console.log("[extract] success, hotelName:", extracted.hotelName);
    return Response.json({ extracted });
  } catch (err) {
    console.error("[extract/route] unhandled error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: `Internal server error: ${message}` }, { status: 500 });
  }
}
