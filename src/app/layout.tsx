import type { Metadata } from 'next';
import {
    Space_Grotesk,
    IBM_Plex_Mono,
    DM_Sans,
} from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
    variable: '--font-space-grotesk',
    subsets: ['latin'],
});

const ibmPlexMono = IBM_Plex_Mono({
    variable: '--font-ibm-plex-mono',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const dm_sans = DM_Sans({
    variable: '--font-dm-sans',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Undictify',
    description: 'The best app to help you lock out of doom scrolling.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${dm_sans.variable} antialiased dark`}
            >
                <Toaster />
                {children}
            </body>
        </html>
    );
}
