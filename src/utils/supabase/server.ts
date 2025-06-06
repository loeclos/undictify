import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookieStore = await cookies();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Missing Supabase environment variables');
    }

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookies: Array<{ name: string; value: string; options?: unknown }>) {
                    cookies.forEach(cookie => {
                        try {
                            cookieStore.set({ name: cookie.name, value: cookie.value, ...(cookie.options || {}) });
                        } catch {
                            // Handle cookie setting error in server components
                        }
                    });
                },
            },
        }
    );
}