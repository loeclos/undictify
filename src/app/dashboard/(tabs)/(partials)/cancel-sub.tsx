'use client';

import React, { useState } from 'react';

type CancelSubButtonProps = {
    subscriptionId: string | null;
    userId?: string;
};

const cancelSubscription = async (
    subscriptionId: string | null,
    userId?: string
) => {
    const res = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        body: JSON.stringify({ subscriptionId, userId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
    }

    return data;
};

export default function CancelSubButton({
    subscriptionId,
    userId,
}: CancelSubButtonProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCancel = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await cancelSubscription(subscriptionId, userId);
            setSuccess(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleCancel}
                disabled={loading || success}
                className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 cursor-pointer text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50"
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                        Cancelling...
                    </span>
                ) : success ? (
                    <span>Subscription Cancelled 🎉</span>
                ) : (
                    <span>Cancel Subscription</span>
                )}
            </button>
            {error && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded">
                    {error}
                </p>
            )}
            {success && (
                <p className="mt-3 text-sm text-green-600 bg-green-50 px-4 py-2 rounded">
                    Your subscription has been cancelled.
                </p>
            )}
        </div>
    );
}
