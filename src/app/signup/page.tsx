import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SignupForm from './(components)/signup-form';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user && !error) {
    redirect('/dashboard');
  }

  return (
    <div className="flex px-3 h-screen bg-black font-mono items-center justify-center">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <SignupForm />
            <div className="bg-muted relative hidden md:block h-full w-full">
              <Image
                src="/call-to-action.png"
                alt="Image"
                fill
                className="object-cover dark:brightness-[0.8]"
                priority
              />
            </div>
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
