import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

// No test reaches an email provider or uses real credentials.
const mocks = vi.hoisted(() => ({ send: vi.fn(), allowed: vi.fn() }))
vi.mock('resend', () => ({ Resend: class { emails = { send: mocks.send } } }))
vi.mock('@/lib/rate-limit', () => ({
  clientIp: () => 'test-client',
  rateLimit: mocks.allowed,
  rateLimitResponse: () => Response.json({ error: 'Rate limited' }, { status: 429 }),
}))

import { POST } from './route'

const inquiry = { name: 'Alex Guest', email: 'alex@example.com', hotel: 'Example Hotel' }
function request(body: unknown) {
  return new NextRequest('http://localhost/api/demo-request', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('demo inquiry boundary', () => {
  beforeEach(() => {
    mocks.send.mockReset().mockResolvedValue({ data: { id: 'test-only' }, error: null })
    mocks.allowed.mockReset().mockReturnValue(true)
    vi.stubEnv('RESEND_API_KEY', 'test-only-key')
    vi.stubEnv('DEMO_REQUEST_TO', 'sales@example.com')
  })
  afterEach(() => vi.unstubAllEnvs())

  it('accepts the three-field inquiry without the retired qualification fields', async () => {
    const response = await POST(request(inquiry))
    expect(response.status).toBe(200)
    expect(mocks.send).toHaveBeenCalledOnce()
    expect(mocks.send).toHaveBeenCalledWith(expect.objectContaining({
      to: 'sales@example.com', replyTo: inquiry.email,
    }))
  })

  it('requires hotel identity and never sends an incomplete inquiry', async () => {
    const response = await POST(request({ name: inquiry.name, email: inquiry.email }))
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ missing: ['hotel'] })
    expect(mocks.send).not.toHaveBeenCalled()
  })

  it('rejects an invalid email and malformed JSON data without sending', async () => {
    expect((await POST(request({ ...inquiry, email: 'invalid' }))).status).toBe(400)
    expect((await POST(request(null))).status).toBe(400)
    expect(mocks.send).not.toHaveBeenCalled()
  })

  it('preserves rate limiting before an email attempt', async () => {
    mocks.allowed.mockReturnValue(false)
    expect((await POST(request(inquiry))).status).toBe(429)
    expect(mocks.send).not.toHaveBeenCalled()
  })

  it('does not claim success when the provider rejects delivery', async () => {
    mocks.send.mockResolvedValue({ error: { message: 'Test rejection' } })
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      expect((await POST(request(inquiry))).status).toBe(502)
    } finally {
      log.mockRestore()
    }
  })
})
