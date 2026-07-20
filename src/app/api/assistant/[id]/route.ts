import { streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createServiceClient } from '@/lib/supabase/service'
import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { detectIssue, extractRoomNumber, extractRoomNumberFromMessage, escapeHtml } from '@/lib/issue-detection'
import { clientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit'

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const HALLUCINATION_GUARDRAIL = `Only recommend specific restaurants, businesses, attractions or services if they are explicitly mentioned in the hotel's knowledge base. For general destination questions, provide helpful guidance about the area but never invent or assume specific business names, addresses, hours, or prices that are not in your knowledge base.`

const FALLBACK_BEHAVIOR = `When a guest asks something not covered in your knowledge base, do not say you don't know or that information is unavailable. Instead respond helpfully using your general knowledge about the destination, travel, and hospitality. Be warm, resourceful, and genuinely helpful. Never leave a guest without a useful answer. If you truly cannot help, offer to connect them with the front desk.`

const ISSUE_HANDLING = `When a guest reports a maintenance issue, problem, or emergency, do NOT tell them to call the front desk or contact staff themselves. Instead: (1) Acknowledge the issue warmly, (2) Tell them you are alerting the team right now, (3) Ask for their room number if not already known, (4) Reassure them someone will be with them shortly. Never redirect guests to call anyone — your job is to handle it for them and make them feel taken care of.`

const STYLE_INSTRUCTIONS: Record<string, string> = {
  warm_local: 'Speak like a warm, genuine local friend. Personal, conversational, use the guest\'s name when known.',
  refined_concierge: 'Speak with the polish of a five-star concierge. Precise, professional, impeccable.',
  barefoot_luxury: 'Relaxed and warm but never casual to a fault. Think luxury beach resort — effortlessly refined.',
  playful_explorer: 'Fun, enthusiastic, and adventurous. Use occasional emojis. Make guests excited to explore.',
  zen_mindful: 'Calm, unhurried, thoughtful. Every response feels considered and serene.',
}

function sendIssueAlert(
  alertEmail: string,
  hotelName: string,
  guestMessage: string,
  roomNumber: string | null
) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[alert] RESEND_API_KEY is not set — cannot send alert')
    return
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const room = roomNumber ?? 'Not provided — assistant is asking'
  const time = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: true })
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: alertEmail,
    subject: `Guest Issue — ${hotelName} — Room ${room}`,
    html: `
      <h2 style="font-family:sans-serif;color:#1a1a1a">Guest Issue Alert</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 0;color:#666;width:140px">Property</td><td style="padding:8px 0"><strong>${escapeHtml(hotelName)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Room Number</td><td style="padding:8px 0"><strong>${escapeHtml(room)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Time</td><td style="padding:8px 0">${time} UTC</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top">Guest Message</td><td style="padding:8px 0">${escapeHtml(guestMessage)}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:13px;color:#999;margin-top:24px">Sent by Hotel Companion · hotelcompanion.ai</p>
    `,
  }).then(r => console.log('[alert] Resend response:', JSON.stringify(r)))
  .catch(e => console.error('[alert] Resend error:', e.message))
}

function sendRoomUpdateAlert(
  alertEmail: string,
  hotelName: string,
  roomNumber: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[alert] RESEND_API_KEY is not set — cannot send room update alert')
    return
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const time = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: true })
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: alertEmail,
    subject: `Guest Issue UPDATE — Room ${roomNumber} confirmed — ${hotelName}`,
    html: `
      <h2 style="font-family:sans-serif;color:#1a1a1a">Guest Issue UPDATE — Room Confirmed</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 0;color:#666;width:140px">Property</td><td style="padding:8px 0"><strong>${escapeHtml(hotelName)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Room Number</td><td style="padding:8px 0"><strong>${escapeHtml(roomNumber)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Time</td><td style="padding:8px 0">${time} UTC</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:13px;color:#999;margin-top:24px">Sent by Hotel Companion · hotelcompanion.ai</p>
    `,
  }).then(r => console.log('[alert] room update Resend response:', JSON.stringify(r)))
  .catch(e => console.error('[alert] room update Resend error:', e.message))
}

function detectRevenueSignal(message: string): string | null {
  const lower = message.toLowerCase()
  if (lower.includes('spa') || lower.includes('massage') || lower.includes('treatment')) return 'spa'
  if (lower.includes('restaurant') || lower.includes('dinner') || lower.includes('breakfast') || lower.includes('lunch') || lower.includes('food')) return 'restaurant'
  if (lower.includes('tour') || lower.includes('activity') || lower.includes('excursion')) return 'activity'
  if (lower.includes('transport') || lower.includes('taxi') || lower.includes('airport') || lower.includes('transfer')) return 'transport'
  if (lower.includes('checkout') || lower.includes('check out') || lower.includes('late')) return 'late_checkout'
  if (lower.includes('upgrade') || lower.includes('room')) return 'room_upgrade'
  return null
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!rateLimit(`assistant:${clientIp(req)}`, 30, 60_000)) {
    return rateLimitResponse()
  }

  const { id } = await params
  const { messages, sessionId } = await req.json()

  if (!Array.isArray(messages) || messages.length > 80 || typeof sessionId !== 'string') {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Guests are anonymous; all reads/writes here are server-side on behalf of
  // the property, so use the service role instead of anon RLS policies.
  const supabase = createServiceClient()

  // Fetch property
  const { data: property } = await supabase
    .from('properties')
    .select('system_prompt, hotel_name, is_active, conversational_style, alert_email')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!property) {
    return new Response('Property not found', { status: 404 })
  }

  const styleKey = (property.conversational_style as string) || 'warm_local'
  const styleInstruction = STYLE_INSTRUCTIONS[styleKey] ?? STYLE_INSTRUCTIONS.warm_local
  const composedPrompt = `${property.system_prompt}\n\nCOMMUNICATION STYLE: ${styleInstruction}\n\nGUARANTEED ACCURACY: ${HALLUCINATION_GUARDRAIL}\n\nFALLBACK BEHAVIOR: ${FALLBACK_BEHAVIOR}\n\nISSUE HANDLING: ${ISSUE_HANDLING}`

  // Find or create conversation
  let conversationId: string | null = null
  const { data: existingConv } = await supabase
    .from('conversations')
    .select('id')
    .eq('property_id', id)
    .eq('guest_session_id', sessionId)
    .single()

  if (existingConv) {
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString(), message_count: messages.length })
      .eq('id', existingConv.id)
    conversationId = existingConv.id
  } else {
    const { data: newConv } = await supabase
      .from('conversations')
      .insert({ property_id: id, guest_session_id: sessionId, message_count: messages.length })
      .select('id')
      .single()
    conversationId = newConv?.id ?? null
  }

  // Save user message
  const lastUserMessage = messages[messages.length - 1]
  if (lastUserMessage?.role === 'user' && conversationId) {
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      property_id: id,
      role: 'user',
      content: lastUserMessage.content,
      revenue_signal: detectRevenueSignal(lastUserMessage.content)
    })
  }

  // Normalize messages
  const normalized = (messages as Array<{ role: string; content: string }>)
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content.slice(0, 4000) }))

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: composedPrompt,
    messages: normalized,
    maxOutputTokens: 1024,
    onFinish: async ({ text }) => {
      if (conversationId) {
        await supabase.from('messages').insert({
          conversation_id: conversationId,
          property_id: id,
          role: 'assistant',
          content: text
        })
      }
      // Issue alert — fire and forget
      if (lastUserMessage?.role === 'user' && property.alert_email) {
        const allMessages = messages as Array<{ role: string; content: string }>
        const issueDetected = detectIssue(lastUserMessage.content)

        if (issueDetected) {
          // First alert — send immediately, include room number if already known
          const roomNumber = extractRoomNumber(allMessages)
          sendIssueAlert(property.alert_email, property.hotel_name, lastUserMessage.content, roomNumber)
          const { error: issueError } = await supabase.from('issue_logs').insert({
            property_id: id,
            guest_message: lastUserMessage.content,
            room_number: roomNumber || null,
            status: 'open'
          })
          if (issueError) console.error('[issue_log] insert error:', issueError.message)
        } else {
          // Check if this follow-up message contains a room number and a prior message had an issue
          const roomInThisMessage = extractRoomNumberFromMessage(lastUserMessage.content)
          if (roomInThisMessage) {
            const priorMessages = allMessages.slice(0, -1)
            const priorIssue = priorMessages.some(m => m.role === 'user' && detectIssue(m.content))
            if (priorIssue) {
              sendRoomUpdateAlert(property.alert_email, property.hotel_name, roomInThisMessage)
            }
          }
        }
      }
    }
  })

  return result.toTextStreamResponse()
}
