import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Optional: secure this with Supabase Auth
export async function POST(req: NextRequest) {
    const { subscriptionId, userId } = await req.json();

    if (!subscriptionId || !userId) {
        return NextResponse.json({ error: 'Missing subscription ID or user ID' }, { status: 400 });
    }

    try {
        // const deletedSubscription = await stripe.subscriptions.update(subscriptionId, {
        //     cancel_at_period_end: false,
        // });
        const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);
        // Update user_data table in Supabase
        const { error: supabaseError } = await supabase
            .from('user_data')
            .update({ pro_user: false, sub_id: null })
            .eq('user_id', userId);

        if (supabaseError) {
            console.error('Supabase update error:', supabaseError);
            return NextResponse.json({ error: 'Subscription cancelled, but failed to update user data.' }, { status: 500 });
        }

        return NextResponse.json({ status: 'cancelled', subscription: deletedSubscription });
    } catch (error: unknown) {
        console.error('Stripe cancel error:', error);
        let message = 'An unknown error occurred';
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
