'use client';

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

export default function SubscribeButton() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    // 1. Get the current auth user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = '/login';
      return;
    }

    // 2. Check if user is already a PRO user
    const { data: userData, error } = await supabase
      .from('user_data')
      .select('pro_user')
      .eq('user_id', user.id)
      .single();
      console.log(userData);

    if (error) {
      console.error('Failed to fetch user status:', error);
      alert('Error checking subscription status.');
      setLoading(false);
      return;
    }

    if (userData?.pro_user) {
      alert('You are already a PRO member!');
      setLoading(false);
      return;
    }

    // 3. User is not PRO, create Stripe Checkout session
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 cursor-pointer text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50"
    >
      {loading ? 'Checking...' : 'Upgrade to PRO'}
    </button>
  );
}
