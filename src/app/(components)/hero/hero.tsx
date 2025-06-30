import React from 'react';

const Hero = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black relative overflow-hidden font-mono">
            {/* Background: subtle scanlines and vignette */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Scanlines */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to bottom, transparent, transparent 2px, #222 3px, transparent 4px)",
                    }}
                />
                {/* Vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 60%, #000 100%)",
                        opacity: 0.7,
                    }}
                />
            </div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.04] z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 0 0' fill='none' stroke='%2300ffea' stroke-width='1'/%3e%3cpath d='m 0 60 l 60 0 0 0' fill='none' stroke='%2300ffea' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect fill='url(%23grid)' width='100%25' height='100%25'/%3e%3c/svg%3e")`,
                }}
            ></div>

            {/* Main content */}
            <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
   

                {/* Main heading */}
                <div className="space-y-6 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#00ffea] leading-tight tracking-tight drop-shadow-[0_2px_8px_#00ffea55] uppercase">
                        Site was taken down
                    </h1>

                    <div className="flex items-center justify-center space-x-4 my-8">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00ffea]"></div>
                        <div className="w-2 h-2 bg-[#00ffea] rounded-full animate-pulse"></div>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00ffea]"></div>
                    </div>

                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extralight text-[#00ffea] tracking-wide uppercase">
                        due to inability to work
                    </h2>

                    {/* Decorative smile */}
                    <div className="flex justify-center mt-12 mb-8">
                        <div className="text-6xl md:text-8xl text-[#00ffea] animate-bounce delay-700 select-none drop-shadow-[0_2px_8px_#00ffea55]">
                            :)
                        </div>
                    </div>
                </div>

                {/* Subtitle */}
                <div className="mt-16 animate-fade-in delay-500">
                    <p className="text-lg md:text-xl text-[#00ffea] font-light leading-relaxed max-w-2xl mx-auto opacity-80">
                        Sometimes the most honest thing we can do is acknowledge when we've reached our limits.
                        <br className="hidden md:block" />
                        <span className='font-bold text-3xl'>All user data/accounts have been deleted.</span>
                    </p>
                </div>

                {/* Bottom decorative elements */}
                <div className="flex justify-center items-center space-x-8 mt-20 animate-fade-in delay-1000">
                    <div className="w-2 h-2 bg-[#00ffea] rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-[#00ffea] rounded-full animate-pulse delay-200"></div>
                    <div className="w-3 h-3 bg-[#00ffea] rounded-full animate-pulse delay-400"></div>
                    <div className="w-1 h-1 bg-[#00ffea] rounded-full animate-pulse delay-600"></div>
                    <div className="w-2 h-2 bg-[#00ffea] rounded-full animate-pulse delay-800"></div>
                </div>
            </div>

            {/* Corner decorative elements */}
            <div className="absolute top-8 left-8 w-12 h-12 border-2 border-[#00ffea] rounded-full opacity-30 animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 border-2 border-[#00ffea] rounded-full opacity-40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className="absolute top-1/3 right-12 w-6 h-6 border-2 border-[#00ffea] rounded-full opacity-20 animate-spin" style={{ animationDuration: '25s' }}></div>
        </div>
    );
};

export { Hero };
