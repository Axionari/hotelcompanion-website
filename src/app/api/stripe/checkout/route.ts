import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

// Lazily instantiated so `next build` does not require STRIPE_SECRET_KEY.
let _stripe: Stripe | null = null
function getStripe(): Stripe {
  return (_stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY!))
}

// The two literal ids are what UpgradeModal currently sells; the env ids are
// the newer price set from REBUILD.md. All verified active in Stripe.
const ALLOWED_PRICE_IDS = new Set(
  [
    'price_1TALsJBgMSWbEFIIFMFSR5Nz',
    'price_1TALnGBgMSWbEFIIYeCYeBfT',
    process.env.STRIPE_PRICE_SINGLE_MONTHLY,
    process.env.STRIPE_PRICE_SINGLE_ANNUAL,
    process.env.STRIPE_PRICE_GROUP_MONTHLY,
    process.env.STRIPE_PRICE_GROUP_ANNUAL,
    process.env.STRIPE_PRICE_PORTFOLIO_MONTHLY,
  ].filter((id): id is string => Boolean(id))
)

export async function POST(req: Request) {
  try {
    const { priceId, coupon, propertyId } = await req.json()

    if (!priceId || !propertyId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!ALLOWED_PRICE_IDS.has(priceId)) {
      return Response.json({ error: 'Unknown price' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { data: property } = await supabase
      .from('properties')
      .select('id')
      .eq('id', propertyId)
      .eq('user_id', user.id)
      .single()
    if (!property) {
      return Response.json({ error: 'Property not found' }, { status: 403 })
    }

    const host = req.headers.get('host') ?? ''
    const proto = host.startsWith('localhost') ? 'http' : 'https'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`

    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      ...(coupon ? { discounts: [{ coupon }] } : {}),
      success_url: `${siteUrl}/dashboard?success=true`,
      cancel_url: `${siteUrl}/dashboard?canceled=true`,
      metadata: { propertyId, userId: user.id, priceId },
      subscription_data: {
        metadata: { propertyId, userId: user.id },
      },
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
