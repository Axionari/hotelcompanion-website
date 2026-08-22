import { describe, it, expect } from 'vitest'
import { detectRevenueSignal } from '@/lib/revenue-signal'

describe('detectRevenueSignal', () => {
  it('detects English signals', () => {
    expect(detectRevenueSignal('Can I book a massage?')).toBe('spa')
    expect(detectRevenueSignal('What time is the restaurant open for dinner?')).toBe('restaurant')
    expect(detectRevenueSignal('Is there a tour or excursion available?')).toBe('activity')
    expect(detectRevenueSignal('I need a taxi to the airport')).toBe('transport')
    expect(detectRevenueSignal('Can I get a late checkout?')).toBe('late_checkout')
    expect(detectRevenueSignal('Can I upgrade my room?')).toBe('room_upgrade')
  })

  it('detects Spanish signals', () => {
    expect(detectRevenueSignal('¿Puedo reservar un masaje?')).toBe('spa')
    expect(detectRevenueSignal('¿A qué hora abre el restaurante para la cena?')).toBe('restaurant')
    expect(detectRevenueSignal('¿Tienen alguna excursión disponible?')).toBe('activity')
    expect(detectRevenueSignal('Necesito transporte al aeropuerto')).toBe('transport')
    expect(detectRevenueSignal('¿Puedo tener una salida tardía?')).toBe('late_checkout')
    expect(detectRevenueSignal('¿Puedo mejorar mi habitación?')).toBe('room_upgrade')
  })

  it('does not flag ordinary questions in either language', () => {
    expect(detectRevenueSignal('What time does the pool close?')).toBe(null)
    expect(detectRevenueSignal('¿A qué hora cierra la piscina?')).toBe(null)
    expect(detectRevenueSignal('Buenas tardes, ¿cómo están?')).toBe(null)
  })
})
