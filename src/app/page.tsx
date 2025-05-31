'use client';

import Navbar from '@/components/navbar/navbar';
import { Hero } from '@/components/homepage/hero/hero';
import Footer from '@/components/homepage/footer/footer';


const navItems = [
    { id: 'home', text: 'Home', url: '#' },
    { id: 'about', text: 'About', url: '#' },
    { id: 'projects', text: 'Projects', url: '#' },
    { id: 'resume', text: 'Resume', url: '#' },
];

export default function Page() {
    return (
        <>
            <Navbar links={navItems} />

            <main className="min-h-screen text-foreground flex flex-col items-center justify-center px-6 bg-black relative">
                <section className="text-center max-w-xl space-y-6">
                <Hero />

                </section>


                <Footer />
            </main>
        </>
    );
}
