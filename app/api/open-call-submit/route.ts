import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await req.json()
    const { session_id, name, email, instagram, tiktok, creator_type, bio, portfolio_links } = body

    // Verify Stripe payment
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    // Check for duplicate submission
    const { data: existing } = await supabase
      .from('open_call_submissions')
      .select('id')
      .eq('stripe_session_id', session_id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Already submitted' }, { status: 400 })
    }

    // Save submission
    const { error } = await supabase.from('open_call_submissions').insert({
      name,
      email,
      instagram: instagram || null,
      tiktok: tiktok || null,
      creator_type,
      bio,
      portfolio_links,
      stripe_session_id: session_id,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Submission error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}