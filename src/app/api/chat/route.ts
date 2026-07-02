import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { marazulChatConfig } from "@/lib/marazul-config";
import { clientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type SimpleMessage = { role: string; content: string };
type PartsMessage = { role: string; parts: Array<{ type: string; text?: string }> };

function normalizeMessages(messages: (SimpleMessage | PartsMessage)[]) {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => {
      const role = m.role as "user" | "assistant";
      if ("content" in m) {
        return { role, content: String(m.content).slice(0, 4000) };
      }
      const text = m.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("");
      return { role, content: text.slice(0, 4000) };
    });
}

export async function POST(req: Request) {
  try {
    if (!rateLimit(`chat:${clientIp(req)}`, 20, 60_000)) {
      return rateLimitResponse();
    }

    const body = await req.json();
    const { messages } = body as { messages: (SimpleMessage | PartsMessage)[] };

    if (!messages || !Array.isArray(messages) || messages.length > 60) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    // This endpoint only serves the public MarAzul demo. The system prompt is
    // fixed server-side; client-supplied prompts are ignored.
    const result = streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: marazulChatConfig.systemPrompt,
      messages: normalizeMessages(messages),
      maxOutputTokens: 1024,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[chat/route]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
