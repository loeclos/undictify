'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        let { data: signUpData, error: signUpError } =
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: 'https://undictify.netlify.app/auth/confirm',
                },
            });

        if (signUpError) {
            console.error('Signup error:', signUpError.message);
        } else {
            console.log('User signed up:', signUpData);
            router.push('/dashboard');
        }
    };

    const handleOAuth = async (provider: 'google' | 'github') => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: 'https://undictify.netlify.app/auth/callback',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (data?.url) {
            window.location.href = data.url;
        }
    };

    return (
        <form className="p-6 md:p-8 bg-background" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome</h1>
                    <p className="text-muted-foreground text-balance">
                        Create a new Undictify account
                    </p>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={() => handleOAuth('github')}
                    >
                        GitHub
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={() => handleOAuth('google')}
                    >
                        Google
                    </Button>
                </div>
            </div>
        </form>
    );
}