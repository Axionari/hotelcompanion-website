// Moved verbatim from src/app/api/assistant/[id]/route.ts so the logic is
// unit-testable (Next.js route files may only export route handlers).

export function detectRevenueSignal(message: string): string | null {
  const lower = message.toLowerCase()
  if (lower.includes('spa') || lower.includes('massage') || lower.includes('treatment') || lower.includes('masaje') || lower.includes('tratamiento')) return 'spa'
  if (lower.includes('restaurant') || lower.includes('dinner') || lower.includes('breakfast') || lower.includes('lunch') || lower.includes('food') || lower.includes('restaurante') || lower.includes('cena') || lower.includes('desayuno') || lower.includes('almuerzo') || lower.includes('comida')) return 'restaurant'
  if (lower.includes('tour') || lower.includes('activity') || lower.includes('excursion') || lower.includes('excursión') || lower.includes('actividad') || lower.includes('paseo')) return 'activity'
  if (lower.includes('transport') || lower.includes('taxi') || lower.includes('airport') || lower.includes('transfer') || lower.includes('transporte') || lower.includes('aeropuerto') || lower.includes('traslado')) return 'transport'
  if (lower.includes('checkout') || lower.includes('check out') || lower.includes('late') || lower.includes('salida tardía') || lower.includes('salida tardia') || lower.includes('tardío') || lower.includes('tardio')) return 'late_checkout'
  if (lower.includes('upgrade') || lower.includes('room') || lower.includes('habitación') || lower.includes('habitacion') || lower.includes('cuarto')) return 'room_upgrade'
  return null
}
