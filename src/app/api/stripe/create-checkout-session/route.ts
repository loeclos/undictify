// app/api/stripe/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});


export async function POST(req: NextRequest) {
  const { userId, email } = await req.json();

  if (!userId || !email) {
    return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription', // or "payment" for one-time
    customer_email: email,
    line_items: [
      {
        price: 'price_1RX6yT3IQlRaOntwX28yYFTz', // replace with your actual price ID
        quantity: 1,
      },
    ],
    metadata: {
      supabase_user_id: userId,
      user_email: email,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pro/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pro/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
