import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { escapeHtml } from '@/lib/issue-detection'
import { clientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit'

/**
 * Book-a-Demo form submission (#demo-form). Reuses the existing Resend
 * mechanism (same env contract as the guest-issue alerts).
 */

const REQUIRED_FIELDS = ['name', 'hotel', 'role', 'email', 'country', 'propertyType', 'properties', 'interest'] as const

export async function POST(req: NextRequest) {
  if (!rateLimit(`demo:${clientIp(req)}`, 5, 60_000)) {
    return rateLimitResponse()
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const fields: Record<string, string> = {}
  for (const key of [...REQUIRED_FIELDS, 'phone', 'message'] as const) {
    const value = body[key]
    fields[key] = typeof value === 'string' ? value.trim().slice(0, 2000) : ''
  }

  const missing = REQUIRED_FIELDS.filter((k) => !fields[k])
  if (missing.length > 0) {
    return Response.json({ error: 'Missing required fields.', missing }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return Response.json({ error: 'Please provide a valid business email.' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[demo-request] RESEND_API_KEY is not set — cannot deliver demo request')
    return Response.json({ error: 'Unable to submit right now. Please email sales@axionari.com.' }, { status: 503 })
  }

  const to = process.env.DEMO_REQUEST_TO || 'sales@axionari.com'
  const resend = new Resend(process.env.RESEND_API_KEY)
  const rows = Object.entries({
    Name: fields.name,
    Hotel: fields.hotel,
    Role: fields.role,
    'Business Email': fields.email,
    Phone: fields.phone || '—',
    Country: fields.country,
    'Property Type': fields.propertyType,
    'Number of Properties': fields.properties,
    'Wants to explore': fields.interest,
    Message: fields.message || '—',
  })
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;color:#666;width:170px;vertical-align:top">${k}</td><td style="padding:8px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
    )
    .join('')

  try {
    const result = await resend.emails.send({
      /* axionari.com is the only domain verified for sending in Resend;
         hotelcompanion.ai is not registered there and has no MX. No-reply
         sender, with reply-to set to the prospect so a reply reaches them
         rather than the robot. */
      from: 'Hotel Companion <no-reply@axionari.com>',
      to,
      replyTo: fields.email,
      subject: `Demo request — ${fields.hotel} (${fields.name})`,
      html: `
        <h2 style="font-family:sans-serif;color:#1a1a1a">New Demo Request</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">${rows}</table>
        <p style="font-family:sans-serif;font-size:13px;color:#999;margin-top:24px">Sent by Hotel Companion · hotelcompanion.ai</p>
      `,
    })
    if (result.error) {
      console.error('[demo-request] Resend error:', result.error)
      return Response.json({ error: 'Unable to submit right now. Please try again.' }, { status: 502 })
    }
  } catch (e) {
    console.error('[demo-request] Resend exception:', e)
    return Response.json({ error: 'Unable to submit right now. Please try again.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
