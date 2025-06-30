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
                        <Hero/>
    );
}
