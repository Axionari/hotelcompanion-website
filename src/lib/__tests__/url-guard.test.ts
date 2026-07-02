import { describe, it, expect } from 'vitest'
import { ipIsPrivate, parsePublicHttpUrl } from '@/lib/url-guard'

describe('ipIsPrivate', () => {
  it('flags private and loopback ranges', () => {
    expect(ipIsPrivate('127.0.0.1')).toBe(true)
    expect(ipIsPrivate('10.0.0.5')).toBe(true)
    expect(ipIsPrivate('192.168.1.1')).toBe(true)
    expect(ipIsPrivate('172.16.0.1')).toBe(true)
    expect(ipIsPrivate('169.254.169.254')).toBe(true) // cloud metadata
    expect(ipIsPrivate('::1')).toBe(true)
  })

  it('allows public addresses', () => {
    expect(ipIsPrivate('8.8.8.8')).toBe(false)
    expect(ipIsPrivate('1.1.1.1')).toBe(false)
  })
})

describe('parsePublicHttpUrl', () => {
  it('rejects non-http schemes and internal hostnames', () => {
    expect(parsePublicHttpUrl('file:///etc/passwd')).toBeNull()
    expect(parsePublicHttpUrl('http://localhost/admin')).toBeNull()
    expect(parsePublicHttpUrl('http://foo.internal')).toBeNull()
    expect(parsePublicHttpUrl('http://127.0.0.1')).toBeNull()
    expect(parsePublicHttpUrl('not a url')).toBeNull()
  })

  it('accepts ordinary public URLs', () => {
    expect(parsePublicHttpUrl('https://example.com/page')?.hostname).toBe('example.com')
  })
})
