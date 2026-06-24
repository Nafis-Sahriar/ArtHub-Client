import React from 'react';
import Link from 'next/link';
import { Coffee, ArrowLeft } from 'lucide-react';

export default function CommunityComingSoonPage() {
    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-[#F4F7F0] select-none">
            
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                
                <div className="w-20 h-20 bg-[#E9F5DB] text-[#718355] rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <Coffee size={36} strokeWidth={1.5} />
                </div>
                
               
                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
                    ArtHub Community is coming soon!
                </h1>
                
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed">
                    We&apos;re putting the finishing touches on a dedicated space for you to share studio updates, ask for feedback, and genuinely connect with the rest of the ArtHub family.
                </p>
                
                <p className="text-[#718355] font-semibold text-sm tracking-wide uppercase pt-2 pb-8">
                    Opening very soon.
                </p>

                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#718355] hover:bg-[#5A6B42] px-8 py-4 rounded-xl transition-all shadow-md shadow-[#718355]/20 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <ArrowLeft size={18} />
                        Head back to the Gallery
                    </Link>
                </div>

            </div>
        </div>
    );
}