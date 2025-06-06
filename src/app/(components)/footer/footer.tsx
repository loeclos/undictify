import { CrypticClock } from '@/components/cryptic-clock';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full p-5">
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                <div className="flex w-full items-center md:items-start justify-center md:justify-start">
                    <p className="font-mono text-zinc-500 text-sm">
                        © loeclos 2025 all rights reserved
                    </p>
                </div>

                <div className="flex w-full items-center justify-center">
                    <Link 
                        href="https://bolt.new" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                    >
                        <Image
                            src="/white_circle_360x360.png"
                            alt="Powered by Bolt"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </Link>
                </div>

                <div className="flex w-full items-center md:items-end justify-center md:justify-end">
                    <CrypticClock />
                </div>
            </div>
        </div>
    );
}