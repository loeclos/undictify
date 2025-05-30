import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SplashCursor } from '@/components/ui/splash-cursor';

export default function LandingPage() {
    return (
        <main className="min-h-screen text-foreground flex items-center justify-center px-6 bg-black">
            <section className="text-center max-w-xl space-y-6 z-50">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-sans text-white">
                    We're Not Quite Ready Yet
                </h1>
                <p className="text-muted text-base sm:text-lg leading-relaxed font-sans">
                    This site is under construction — but hey, while you're
                    here...
                </p>
                <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button className="rounded-lg px-6 py-3 text-base font-semibold shadow-md flex items-center gap-2">
                        Press Here <ArrowRight className="w-4 h-4" />
                    </Button>
                </a>
            </section>
            <SplashCursor />
        </main>
    );
}
