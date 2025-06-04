import { cn } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LoginButtons } from './(components)/login-buttons';
import Link from 'next/link';

// Server action for email/password login
async function signInWithEmail(formData: FormData) {
    'use server';
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        redirect('/login?error=Missing email or password');
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    redirect('/dashboard');
}

export default async function Page({
    className,
    searchParams,
    ...props
}: React.ComponentProps<'div'> & {
    searchParams?: { error?: string };
}) {
    const supabase = await createClient();

    // Wait for searchParams to be available
    const error = (await searchParams)?.error;

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userData?.user && !userError) {
        redirect('/dashboard');
    }

    return (
        <div className="flex px-3 h-screen bg-black font-mono items-center justify-center">
            <div className={cn('flex flex-col gap-6', className)} {...props}>
                <Card className="bg-background">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>
                            Login with your Github or Google account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={signInWithEmail}>
                            <div className="grid gap-6">
                                <LoginButtons />

                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-neutral-950 text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                
                                {/* Display error message if present */}
                                {error && (
                                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                                        {error}
                                    </div>
                                )}
                                
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        href="/signup"
                                        className="underline underline-offset-4"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    By clicking continue, you agree to our{' '}
                    <a href="#">Terms of Service</a> and{' '}
                    <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
}