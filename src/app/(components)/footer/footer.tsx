import { CrypticClock } from '@/components/cryptic-clock';

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full p-5">
            <div className="flex flex-col md:flex-row items-center justify-end w-full">
                <div className="flex w-full items-center md:items-start justify-center md:justify-start">
                    <p className="font-mono text-zinc-500 text-sm">
                        © loeclos 2025 all rights reserved
                    </p>
                </div>

                <div className="flex w-full items-center md:items-end justify-center md:justify-end">
                    <CrypticClock />
                </div>
            </div>
        </div>
    );
}

