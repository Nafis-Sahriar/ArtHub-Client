import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AdminLoadingPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F7F0]">
            
            {/* The "Command Core" Animation */}
            <div className="relative flex items-center justify-center size-24 mb-8">
                
                {/* Stark Outer Box - Slow Spin */}
                <div 
                    className="absolute inset-0 border-4 border-zinc-900 rounded-xl animate-spin" 
                    style={{ animationDuration: '3s' }}
                ></div>
                
                {/* Inner Accent Box - Reverse Fast Spin */}
                <div 
                    className="absolute inset-2 border-4 border-[#718355] rounded-lg animate-spin" 
                    style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                ></div>
                
                {/* Central Core */}
                <div className="relative flex size-12 items-center justify-center bg-zinc-900 rounded-md shadow-[0_0_15px_rgba(113,131,85,0.4)]">
                    <ShieldCheck className="size-6 text-white" />
                </div>
                
            </div>

            {/* Text Area */}
            <div className="text-center flex flex-col items-center">
                <h2 className="text-2xl font-black text-zinc-900 tracking-[0.2em] uppercase mb-3">
                    System Admin
                </h2>
                
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#718355] uppercase tracking-widest">
                        Accessing Secure Data
                    </span>
                    
                    {/* Hard Square Loading Blocks instead of soft round dots */}
                    <div className="flex gap-1.5 mt-0.5">
                        <div className="size-1.5 bg-zinc-900 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                        <div className="size-1.5 bg-zinc-900 animate-pulse" style={{ animationDelay: '200ms' }}></div>
                        <div className="size-1.5 bg-zinc-900 animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AdminLoadingPage;