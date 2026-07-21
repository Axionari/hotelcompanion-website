import { describe, it, expect } from 'vitest'
import { buildMarazulPrompt, parseReply, pickFallback } from './marazulDemo'

describe('parseReply', () => {
  it('extracts a card and strips its tag from the prose', () => {
    const r = parseReply('Akumal is twenty minutes south.\n\n[[card:beach]]')
    expect(r.text).toBe('Akumal is twenty minutes south.')
    expect(r.card).toBe('beach')
    expect(r.action).toBeUndefined()
  })

  it('extracts a card and a mock action together', () => {
    const r = parseReply('The ocean-view suite is free tonight.\n[[card:upgrade]][[action:upgrade]]')
    expect(r.card).toBe('upgrade')
    expect(r.action).toBe('upgrade')
    expect(r.text).toBe('The ocean-view suite is free tonight.')
  })

  it('hides a tag that is still streaming in rather than showing it raw', () => {
    // This is the case that would otherwise flash "[[card:be" at the guest.
    expect(parseReply('Akumal is lovely. [[card:be').text).toBe('Akumal is lovely.')
    expect(parseReply('Akumal is lovely. [[').text).toBe('Akumal is lovely.')
  })

  it('ignores a card id that is not in the vocabulary', () => {
    const r = parseReply('Sure.\n[[card:helicopter]]')
    expect(r.card).toBeUndefined()
    expect(r.text).toBe('Sure.')
  })

  it('returns plain prose untouched when there is no tag', () => {
    expect(parseReply('The pool is open until 10pm.')).toEqual({
      text: 'The pool is open until 10pm.',
      card: undefined,
      action: undefined,
    })
  })
})

describe('pickFallback', () => {
  it('answers the intent that was actually asked', () => {
    expect(pickFallback('en', 0, 'where is the best beach?').card).toBe('beach')
    expect(pickFallback('en', 0, 'we are hungry, room service?').card).toBe('dish-grid')
    expect(pickFallback('en', 0, 'do you have a massage available?').card).toBe('spa')
  })

  it('matches Spanish intents too', () => {
    expect(pickFallback('es', 0, '¿cuál es la mejor playa?').card).toBe('beach')
    expect(pickFallback('es', 0, 'quisiéramos cenar en la habitación').card).toBe('dish-grid')
  })

  it('treats "where do locals eat" as a destination question, not room service', () => {
    // The food matcher would also match "eat", so ordering is load-bearing.
    expect(pickFallback('en', 0, 'where do locals actually eat?').card).toBe('map')
    expect(pickFallback('es', 0, '¿dónde comen los locales?').card).toBe('map')
  })

  it('does not let the destination matcher swallow a beach question', () => {
    // Regression: "la mejor playa cerca de aquí" matched the map fallback
    // because the destination matcher listed the generic word "cerca".
    expect(pickFallback('es', 0, '¿Cuál es la mejor playa cerca de aquí?').card).toBe('beach')
    expect(pickFallback('en', 0, 'What is the best beach near here?').card).toBe('beach')
  })

  it('covers the upgrade intent that the suggestion chips offer', () => {
    expect(pickFallback('en', 0, 'can we upgrade to an ocean view?').card).toBe('upgrade')
    expect(pickFallback('es', 0, '¿podemos mejorar a vista al mar?').card).toBe('upgrade')
  })

  it('offers a mock action on the intents that can be acted on', () => {
    expect(pickFallback('en', 0, 'can we upgrade?').action).toBe('upgrade')
    expect(pickFallback('en', 0, 'dinner in the room please').action).toBe('roomservice')
    expect(pickFallback('en', 0, 'book me a massage').action).toBe('spa')
    // Nothing to book about a beach recommendation.
    expect(pickFallback('en', 0, 'best beach?').action).toBeUndefined()
  })

  it('never leaks the match pattern into the reply', () => {
    expect(pickFallback('en', 0, 'beach')).not.toHaveProperty('match')
  })

  it('gives a graceful non-answer when nothing matches on the first miss', () => {
    const r = pickFallback('en', 0, 'what is the wifi password?')
    expect(r.text.length).toBeGreaterThan(0)
    expect(r.card).toBeUndefined()
  })

  it('rotates rather than repeating when misses continue', () => {
    const a = pickFallback('en', 1, 'xyzzy')
    const b = pickFallback('en', 2, 'xyzzy')
    expect(a.text).not.toBe(b.text)
  })
})

describe('buildMarazulPrompt', () => {
  it('seeds from the shared MarAzul config rather than a private copy', () => {
    const p = buildMarazulPrompt('en')
    expect(p).toContain('MarAzul Riviera Maya')
    expect(p).toContain('Casa Marina')
    expect(p).toContain('Spa Ixchel')
  })

  it('teaches the card vocabulary and the scope limit', () => {
    const p = buildMarazulPrompt('en')
    expect(p).toContain('[[card:beach]]')
    expect(p).toContain('[[action:roomservice]]')
    expect(p).toContain('never take payment')
  })

  it('asks for Spanish when the interface is Spanish', () => {
    expect(buildMarazulPrompt('es')).toContain('Reply in Spanish')
  })

  it('stays inside the route’s 8000-character prompt cap', () => {
    expect(buildMarazulPrompt('en').length).toBeLessThan(8000)
    expect(buildMarazulPrompt('es').length).toBeLessThan(8000)
  })
})
