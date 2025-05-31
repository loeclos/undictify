import { CrypticClock } from '@/components/cryptic-clock';

export default function Footer() {
    return (
        <div className='flex flex-row'>
            <div className="fixed bottom-6 right-6 z-50">
                <CrypticClock />
            </div>

            <div className="fixed bottom-6 left-6 z-50">
                <p className="font-mono text-zinc-500 text-sm">
                    © loeclos 2025 all rights reserved
                </p>
            </div>
        </div>
    );
}
