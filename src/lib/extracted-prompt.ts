// Single source of truth for the guest-assistant system prompt built from
// extractor output. Both /api/extract (which feeds the onboarding preview) and
// the onboarding save path use this, so the previewed assistant and the saved
// production assistant are byte-for-byte identical.
//
// Field names here MUST match the JSON contract in /api/extract's extractor
// prompt (amenities.list, nearby.list, policies.checkIn/checkOut). A mismatch
// here is exactly the bug this module was created to prevent.

type Extracted = Record<string, unknown>;

export function buildExtractedSystemPrompt(extracted: Extracted): string {
  const lines: string[] = [];
  lines.push(`You are the AI Guest Companion for ${extracted.hotelName || "this hotel"}.`);
  if (extracted.summary) lines.push(String(extracted.summary));
  if (extracted.location) lines.push(`Location: ${extracted.location}`);

  const restaurant = extracted.restaurant as { found?: boolean; name?: string; hours?: string } | undefined;
  if (restaurant?.found) {
    lines.push(`Restaurant: ${restaurant.name || "on-site dining available"}${restaurant.hours ? ` (${restaurant.hours})` : ""}`);
  }
  const spa = extracted.spa as { found?: boolean; name?: string; hours?: string } | undefined;
  if (spa?.found) {
    lines.push(`Spa: ${spa.name || "spa & wellness available"}${spa.hours ? ` (${spa.hours})` : ""}`);
  }
  const amenities = extracted.amenities as { found?: boolean; list?: string[] } | undefined;
  if (amenities?.found && amenities.list?.length) {
    lines.push(`Amenities: ${amenities.list.join(", ")}`);
  }
  const policies = extracted.policies as { found?: boolean; checkIn?: string; checkOut?: string; other?: string } | undefined;
  if (policies?.found) {
    if (policies.checkIn) lines.push(`Check-in: ${policies.checkIn}`);
    if (policies.checkOut) lines.push(`Check-out: ${policies.checkOut}`);
    if (policies.other) lines.push(`Policies: ${policies.other}`);
  }
  const nearby = extracted.nearby as { found?: boolean; list?: string[] } | undefined;
  if (nearby?.found && nearby.list?.length) {
    lines.push(`Nearby: ${nearby.list.join(", ")}`);
  }

  lines.push("");
  lines.push("Answer guest questions concisely and helpfully. Only use information provided above. Always respond in the same language the guest writes in.");

  return lines.join("\n");
}
