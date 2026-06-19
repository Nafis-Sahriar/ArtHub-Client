import React from 'react';
import { Palette } from 'lucide-react';

const GlobalLoadingPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F7F0]">
            
            <div className="relative flex items-center justify-center">
                
                <div className="absolute size-24 rounded-full border-4 border-[#718355] opacity-20 animate-ping"></div>
                
                
                <div className="relative flex size-20 items-center justify-center rounded-full bg-[#E9F5DB] border-4 border-[#CFE1B9]">
                    <Palette className="size-8 text-[#718355] animate-pulse" />
                </div>
            </div>

        
            <div className="mt-8 text-center space-y-2">
                <h2 className="text-xl font-black text-[#718355] tracking-tight">
                    ArtHub
                </h2>
                <p className="text-sm font-medium text-[#97A97C] animate-pulse">
                    Preparing your canvas...
                </p>
            </div>
        </div>
    );
};

export default GlobalLoadingPage;