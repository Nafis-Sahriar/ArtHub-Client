import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const BuyerLoadingPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F7F0]">
            
           
            <div className="relative flex items-center justify-center w-24 h-28 mb-8">
                
               
                <div 
                    className="absolute inset-0 bg-[#E9F5DB] rounded-xl rotate-6 border border-[#CFE1B9] animate-pulse" 
                    style={{ animationDelay: '300ms', animationDuration: '2s' }}
                ></div>
                
                
                <div 
                    className="absolute inset-0 bg-[#CFE1B9] rounded-xl -rotate-3 border border-[#97A97C] animate-pulse" 
                    style={{ animationDelay: '150ms', animationDuration: '2s' }}
                ></div>
                
                
                <div 
                    className="absolute inset-0 bg-white rounded-xl shadow-lg border-2 border-[#718355] flex items-center justify-center animate-bounce" 
                    style={{ animationDuration: '2.5s' }}
                >
                    <ImageIcon className="size-8 text-[#718355] opacity-90" />
                </div>
            </div>

          
            <div className="text-center flex flex-col items-center">
                <h2 className="text-xl font-black text-[#718355] tracking-widest uppercase mb-3">
                    ArtHub
                </h2>
                
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-bold text-[#97A97C] uppercase tracking-wider">
                        Assembling Collection
                    </span>
                    
                   
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 bg-[#718355] rounded-full animate-ping" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-[#718355] rounded-full animate-ping" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-[#718355] rounded-full animate-ping" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerLoadingPage;