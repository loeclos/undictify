import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveRight, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => ['amazing', 'new', 'wonderful', 'beautiful', 'smart'],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <div className="w-full font-sans">
            <div className="container mx-auto">
                <div className="flex gap-8 mt-20  lg:pb-10 items-center justify-center flex-col">
                    <div>
                        <Button variant="secondary" size="sm" className="gap-4">
                            Read our launch article{' '}
                            <MoveRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex gap-4 flex-col">
                        <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                            <span className="text-spektr-cyan-50">
                                This is something
                            </span>
                            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                                &nbsp;
                                {titles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute font-semibold"
                                        initial={{ opacity: 0, y: '-100' }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 50,
                                        }}
                                        animate={
                                            titleNumber === index
                                                ? {
                                                      y: 0,
                                                      opacity: 1,
                                                  }
                                                : {
                                                      y:
                                                          titleNumber > index
                                                              ? -150
                                                              : 150,
                                                      opacity: 0,
                                                  }
                                        }
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <p className="text-lg md:text-md leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center font-serif">
                            Undictify is the social media un-addictor — a fresh
                            approach to helping you take back control.
                            Thoughtfully designed to shift your relationship
                            with digital life, it’s not just another app — it’s
                            a quiet rebellion.
                        </p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Link href={'/dashboard'}>
                            <Button
                                size="lg"
                                className="gap-4"
                                variant="outline"
                            >
                                Go to dashboard{' '}
                                <LayoutDashboard className="w-4 h-4" />
                            </Button>
                        </Link>

                        <Link href={'/signup'}>
                            <Button size="lg" className="gap-4 cursor-pointer">
                                Sign up here <MoveRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Hero };
