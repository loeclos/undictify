import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SplashCursor } from '@/components/ui/splash-cursor';
import { CrypticClock } from '@/components/cryptic-clock';

export default function LandingPage() {
    return (
        <main className="min-h-screen text-foreground flex flex-col items-center justify-center px-6 bg-black relative">
            <section className="text-center max-w-xl space-y-6 z-50">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-sans text-white">
                    We{'\''}re Not Quite Ready Yet
                </h1>
                <p className="text-muted text-base sm:text-lg leading-relaxed font-sans">
                    This site is under construction — but hey, while you{'\''}re
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
            
            <div className="fixed bottom-6 right-6 z-50">
                <CrypticClock />
            </div>
            
            <div className="fixed bottom-6 left-6 z-50">
                <p className="font-mono text-zinc-500 text-sm">
                    © loeclos 2025 all rights reserved
                </p>
            </div>
            
            <SplashCursor />
        </main>
    );
}