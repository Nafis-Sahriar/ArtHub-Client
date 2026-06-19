import React from 'react';
import { Palette } from 'lucide-react';

const ArtistLoadingPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F7F0]">
            
            {/* The "Color Wheel" Spinner */}
            <div className="relative flex items-center justify-center size-28">
                {/* Outer Ring - Smooth Forward Spin */}
                <div className="absolute inset-0 rounded-full border-4 border-[#CFE1B9] border-t-[#718355] animate-spin"></div>
                
                {/* Inner Ring - Smooth Reverse Spin */}
                <div 
                    className="absolute inset-3 rounded-full border-4 border-transparent border-b-[#97A97C] border-l-[#97A97C] animate-spin" 
                    style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                ></div>
                
                {/* Center Canvas */}
                <div className="relative flex size-14 items-center justify-center rounded-full bg-[#E9F5DB] shadow-sm">
                    <Palette className="size-6 text-[#718355]" />
                </div>
            </div>

            {/* Text Area */}
            <div className="mt-8 text-center flex flex-col items-center">
                <h2 className="text-xl font-black text-[#718355] tracking-widest uppercase mb-3">
                    ArtHub
                </h2>
                
                {/* Animated Bouncing Dots text */}
                <div className="flex items-center gap-2 text-[#97A97C]">
                    <span className="text-xs font-bold uppercase tracking-wider">Preparing Canvas</span>
                    <div className="flex gap-1 mb-0.5">
                        {/* Inline styles used for staggered animation delays */}
                        <div className="size-1.5 rounded-full bg-[#718355] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="size-1.5 rounded-full bg-[#718355] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="size-1.5 rounded-full bg-[#718355] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistLoadingPage;