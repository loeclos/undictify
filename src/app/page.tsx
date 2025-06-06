'use client';

import Navbar from '@/app/(components)/navbar/navbar';
import { Hero } from '@/app/(components)/hero/hero';
import Footer from '@/app/(components)/footer/footer';

const navItems = [
    { id: 'home', text: 'Home', url: '/' },
    { id: 'blog', text: 'Blog', url: '/blog' },
    { id: 'dashboard', text: 'Dashboard', url: '/dashboard' },
];

export default function Page() {


    return (
        <>
            <Navbar links={navItems} />
            <main className="min-h-screen text-foreground flex flex-col items-center justify-center px-6 bg-black relative">
                <section className="text-center max-w-xl space-y-6">
                    <Hero/>
                </section>
                <Footer />
            </main>
        </>

    );
}
