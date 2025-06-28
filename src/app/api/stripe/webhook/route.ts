
import { NextRequest, NextResponse } from 'next/server'; // or 'next' for pages
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role to allow unrestricted access
);

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscriptionId = session.subscription as string;
    const userEmail = session.metadata?.user_email;

    if (userEmail) {
      const { error } = await supabase
        .from('user_data')
        .update({ sub_id: subscriptionId, pro_user: true })
        .eq('email', userEmail); // or `.eq('id', user_id)` if using ID

      if (error) {
        console.error('Supabase Update Error:', error);
        return new NextResponse('Failed to update user', { status: 500 });
      }
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}
