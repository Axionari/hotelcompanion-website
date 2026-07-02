// Moved verbatim from src/app/api/assistant/[id]/route.ts so the logic is
// unit-testable (Next.js route files may only export route handlers).

export const ISSUE_KEYWORDS = [
  'broken', 'not working', 'issue', 'problem', 'maintenance', 'leak',
  'no hot water', 'no water', 'no electricity', 'no wifi', 'wifi not working',
  'air conditioning', ' ac ', 'toilet', 'emergency', 'help', 'stuck', 'locked out',
  'roto', 'no funciona', 'problema', 'fuga', 'sin agua', 'sin luz', 'sin wifi',
  'aire acondicionado', 'emergencia', 'ayuda', 'atascado', 'cerrado', 'mantenimiento',
  'no hay agua caliente',
]

export function detectIssue(message: string): boolean {
  const lower = message.toLowerCase()
  return ISSUE_KEYWORDS.some(kw => lower.includes(kw))
}

const ROOM_PATTERN = /room\s*[#:]?\s*(\d+)|habitaci[oó]n\s*[#:]?\s*(\d+)|cuarto\s*[#:]?\s*(\d+)|#\s*(\d+)|\b(\d{1,4})\b/i

export function extractRoomNumberFromMessage(content: string): string | null {
  const match = content.match(ROOM_PATTERN)
  if (!match) return null
  return match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? null
}

export function extractRoomNumber(messages: Array<{ role: string; content: string }>): string | null {
  for (const m of messages) {
    const found = extractRoomNumberFromMessage(m.content)
    if (found) return found
  }
  return null
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
