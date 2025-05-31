'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
interface NavbarLink {
    id: string;
    url: string;
    text: string;
}
interface HoverEvent extends React.MouseEvent<HTMLElement> {}

interface HandleHover {
    (e: HoverEvent, link: NavbarLink): void;
}

const Navbar = ({ links }: { links: NavbarLink[] }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLDivElement>(null);
    let lastScrollY: number | null = null;

    useEffect(() => {
        lastScrollY = window.pageYOffset;
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            setIsVisible(currentScrollY <= (lastScrollY ?? 0));
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleHover: HandleHover = (e, link) => {
        if (!navRef.current) return;
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setHoverPosition({
            left: rect.left - navRef.current.offsetLeft,
            width: rect.width,
        });
        setHoveredLink(link.id);
    };

    return (
        <nav className="fixed lg:left-0 lg:right-0 z-50">
            <div
                ref={navRef}
                className={`relative w-screen max-w-[90%] lg:max-w-5xl mx-auto transition-transform duration-300 backdrop-blur-md bg-zinc-100/50 dark:bg-black border border-zinc-900 dark:text-white rounded-2xl shadow-lg ${
                    isVisible ? 'translate-y-5' : '-translate-y-full'
                }`}
            >
                <div className="hidden  relative md:grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">
                    <div className="relative text-left py-4 px-3">
                        {/* Hover background effect */}
                        <div
                            className="absolute bottom-3 h-8 bg-zinc-200 dark:bg-zinc-900 rounded-lg transition-all duration-300"
                            style={{
                                left: hoverPosition.left,
                                width: hoverPosition.width,
                                opacity: hoveredLink ? 1 : 0,
                            }}
                        />

                        {/* Links */}
                        {links.map((link) => (
                            <Link
                                key={link.id}
                                href={link.url}
                                className="relative text-black dark:text-white px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-200 z-10"
                                onMouseEnter={(e) => handleHover(e, link)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center md:justify-end gap-2 py-2 px-4">
                        <Link
                            href={'/login'}
                            className="relative text-black dark:text-white border border-zinc-800 px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-300 z-10 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        >
                            Login
                        </Link>
                        <Link
                            href={'/login'}
                            className="relative overflow-hidden text-black dark:text-white border border-zinc-800 px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-300 z-10 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)] shine-hover"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
                <div className="p-2 block md:hidden">
                    <Drawer>
                        <DrawerTrigger className="flex justify-center items-center z-50 border-2 border-zin-400 w-full h-full p-1 rounded-lg">
                            <Menu />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerFooter>
                                {links.map((link) => (
                                    <Link
                                        key={link.id}
                                        href={link.url}
                                        className="relative text-black dark:text-white px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-200 z-10"
                                        onMouseEnter={(e) =>
                                            handleHover(e, link)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredLink(null)
                                        }
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                                <Link
                                    href={'/login'}
                                    className="relative text-center text-black dark:text-white border border-zinc-800 px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-300 z-10 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={'/login'}
                                    className="relative text-center overflow-hidden text-black dark:text-white border border-zinc-800 px-3 py-2 rounded-md text-md font-sans font-bold transition-all duration-300 z-10 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.4)] shine-hover"
                                >
                                    Sign Up
                                </Link>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
