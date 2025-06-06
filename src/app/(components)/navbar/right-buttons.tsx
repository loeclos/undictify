'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RightButtons() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // null = loading
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = await createClient();
                const { data: userData, error: userError } = await supabase.auth.getUser();
                setLoggedIn(!!(userData?.user && !userError));
            } catch (error) {
                console.error('Auth check failed:', error);
                setLoggedIn(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            const supabase = await createClient();
            await supabase.auth.signOut();
            setLoggedIn(false);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Show loading state while checking authentication
    if (loggedIn === null) {
        return (
            <div className="flex gap-2">
                <div className="animate-pulse bg-zinc-300 dark:bg-zinc-700 h-10 w-16 rounded-md"></div>
                <div className="animate-pulse bg-zinc-300 dark:bg-zinc-700 h-10 w-20 rounded-md"></div>
            </div>
        );
    }

    return (
        <>
            {!loggedIn ? (
                <>
                    <Link
                        href={'/login'}
                        className="relative text-black dark:text-white border border-zinc-800 px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-300 z-10 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    >
                        Login
                    </Link>
                    <Link
                        href={'/signup'}
                        className="relative overflow-hidden text-black dark:text-white border border-zinc-800 px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-300 z-10 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)] shine-hover"
                    >
                        Sign Up
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        href={'/dashboard'}
                        className="relative overflow-hidden text-black dark:text-white border border-zinc-800 px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-300 z-10 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)] shine-hover"
                    >
                        Go to dashboard
                    </Link>
                    <Button
                        onClick={logout}
                        className="relative text-black bg-black dark:text-white border border-zinc-800 px-3 py-2 h-full rounded-md text-md font-sans font-bold cursor-pointer transition-all duration-300 z-10 shadow-sm hover:bg-black hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    >
                        Logout
                    </Button>
                </>
            )}
        </>
    );
}