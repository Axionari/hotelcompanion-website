import { describe, it, expect } from 'vitest'
import { detectIssue, extractRoomNumber, extractRoomNumberFromMessage, escapeHtml } from '@/lib/issue-detection'

describe('detectIssue', () => {
  it('detects English maintenance issues', () => {
    expect(detectIssue('The AC is not working')).toBe(true)
    expect(detectIssue('There is a leak in the bathroom')).toBe(true)
  })

  it('detects Spanish maintenance issues', () => {
    expect(detectIssue('El aire acondicionado no funciona')).toBe(true)
    expect(detectIssue('Hay una fuga de agua')).toBe(true)
  })

  it('does not flag ordinary questions', () => {
    expect(detectIssue('What time is breakfast?')).toBe(false)
    expect(detectIssue('Can you recommend a restaurant?')).toBe(false)
  })
})

describe('extractRoomNumber', () => {
  it('reads an explicit room number', () => {
    expect(extractRoomNumberFromMessage('I am in room 221')).toBe('221')
    expect(extractRoomNumberFromMessage('habitación 12')).toBe('12')
  })

  it('scans a message list for the first room number', () => {
    const msgs = [
      { role: 'user', content: 'the ac is broken' },
      { role: 'assistant', content: 'what room are you in?' },
      { role: 'user', content: 'Room 305' },
    ]
    expect(extractRoomNumber(msgs)).toBe('305')
  })

  it('reads a #-prefixed room number', () => {
    expect(extractRoomNumberFromMessage('#412 has no towels')).toBe('412')
  })

  it('accepts a bare number when it is the entire message', () => {
    expect(extractRoomNumberFromMessage('304')).toBe('304')
    expect(extractRoomNumberFromMessage('  304  ')).toBe('304')
    expect(extractRoomNumberFromMessage('#304')).toBe('304')
  })

  it('does not treat an unrelated bare number in a sentence as a room number', () => {
    expect(extractRoomNumberFromMessage('There are 4 of us in the group')).toBeNull()
    expect(extractRoomNumberFromMessage('I will be back around 5pm')).toBeNull()
  })

  it('prefers an explicit room mention over an earlier unrelated number', () => {
    expect(
      extractRoomNumberFromMessage('I will be back around 5, room 304 has no water')
    ).toBe('304')
  })

  it('returns null for messages with no digits', () => {
    expect(extractRoomNumberFromMessage('the ac is broken')).toBeNull()
  })
})

describe('escapeHtml', () => {
  it('neutralizes HTML in guest-controlled content', () => {
    expect(escapeHtml('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;'
    )
    expect(escapeHtml('a & b "c" \'d\'')).toBe('a &amp; b &quot;c&quot; &#39;d&#39;')
  })
})
