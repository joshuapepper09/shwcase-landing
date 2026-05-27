import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const { email } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price: process.env.STRIPE_OPEN_CALL_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/drop/submit?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/drop`,
      metadata: {
        type: 'open_call',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Open call checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}