import Link from 'next/link';
import Image from 'next/image';

export default function BoltLogo() {
    return (
                <div className="fixed bottom-6 right-6 z-50">
                  <Link
                    href="https://bolt.new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group"
                  >
                    <Image
                      src="/white_circle_360x360.png"
                      alt="Powered by Bolt"
                      width={360}
                      height={360}
                      className="rounded-full md:h-18 md:w-18 h-12 w-12 transform transition-transform duration-150 ease-out group-hover:scale-110 group-hover:rotate-[10deg] group-hover:animate-spin-slow"
                    />
                  </Link>
                </div>

    );
}