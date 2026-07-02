import { describe, it, expect } from 'vitest'
import { buildExtractedSystemPrompt } from '@/lib/extracted-prompt'

// Regression lock for the onboarding mapping bug: the extractor emits
// amenities.list / nearby.list / policies.checkIn / policies.checkOut, and this
// builder — the single source used by both the preview and the saved
// production prompt — must surface all of them.
const extracted = {
  hotelName: 'Casa Aurelia',
  summary: 'A boutique hotel in San Miguel.',
  location: 'San Miguel de Allende',
  restaurant: { found: true, name: 'El Patio', hours: '7am-11pm' },
  spa: { found: true, name: 'Serena Spa', hours: '9am-7pm' },
  amenities: { found: true, list: ['Rooftop pool', 'Free WiFi', 'Valet parking'] },
  policies: { found: true, checkIn: '3 PM', checkOut: '12 PM', other: 'No pets' },
  nearby: { found: true, list: ['Jardín Principal', 'Fabrica La Aurora'] },
}

describe('buildExtractedSystemPrompt', () => {
  const prompt = buildExtractedSystemPrompt(extracted)

  it('includes amenities from amenities.list', () => {
    expect(prompt).toContain('Rooftop pool')
    expect(prompt).toContain('Valet parking')
  })

  it('includes nearby places from nearby.list', () => {
    expect(prompt).toContain('Jardín Principal')
    expect(prompt).toContain('Fabrica La Aurora')
  })

  it('includes check-in and check-out from policies.checkIn/checkOut', () => {
    expect(prompt).toContain('Check-in: 3 PM')
    expect(prompt).toContain('Check-out: 12 PM')
  })

  it('includes hotel name, restaurant and spa', () => {
    expect(prompt).toContain('Casa Aurelia')
    expect(prompt).toContain('El Patio')
    expect(prompt).toContain('Serena Spa')
  })

  it('omits sections that were not found', () => {
    const bare = buildExtractedSystemPrompt({ hotelName: 'Bare Hotel' })
    expect(bare).toContain('Bare Hotel')
    expect(bare).not.toContain('Amenities:')
    expect(bare).not.toContain('Check-in:')
  })
})
