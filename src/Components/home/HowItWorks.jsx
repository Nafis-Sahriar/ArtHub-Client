"use client";
import React from 'react';
import { Compass, ShieldCheck, PackageOpen } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            title: "Browse & Discover",
            description: "Explore our curated gallery of verified original artworks. Filter by medium, artist, or style to find the perfect piece that speaks to you.",
            icon: Compass
        },
        {
            id: 2,
            title: "Secure Purchase",
            description: "Buy with confidence. Our Stripe-powered checkout ensures your payment is safe, and your funds are protected until delivery is confirmed.",
            icon: ShieldCheck
        },
        {
            id: 3,
            title: "Receive Masterpiece",
            description: "Your artwork is carefully packaged by the artist and shipped directly to your door with full insurance and global tracking.",
            icon: PackageOpen
        }
    ];

    return (
        <section className="py-24 bg-[#F4F7F0] relative z-10 overflow-hidden w-[90%] rounded-3xl mx-auto">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Section Header --- */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black text-[#11140E] mb-4">
                        How It Works
                    </h2>
                    <p className="text-[#718355] font-medium text-lg max-w-2xl mx-auto">
                        A seamless, secure journey from discovering an artist to hanging the canvas on your wall.
                    </p>
                </div>

                {/* --- Timeline Container --- */}
                <div className="relative">
                    
                    {/* The Connecting Line (Horizontal on Desktop, Vertical on Mobile) */}
                    <div className="absolute left-9.5 md:left-[16.66%] top-0 md:top-10 bottom-0 md:bottom-auto w-[2px] md:w-[66.66%] md:h-[3px] bg-[#CFE1B9]/40 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.id} className="relative z-10 flex flex-row md:flex-col items-start md:items-center">
                                    
                                    {/* The Circular Numbered Node */}
                                    <div className="w-20 h-20 shrink-0 rounded-full bg-[#E9F5DB] border-8 border-[#F4F7F0] flex items-center justify-center text-[#718355] shadow-sm mb-0 md:mb-8 mr-6 md:mr-0 z-10">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 opacity-70">Step</span>
                                            <span className="text-2xl font-black leading-none">{step.id}</span>
                                        </div>
                                    </div>

                                    {/* The Pristine White Card */}
                                    {/* Notice the exact shadow class you requested, and zero border! */}
                                    <div className="bg-white shadow-[0_8px_30px_rgba(113,131,85,0.08)] rounded-[2rem] p-8 text-left md:text-center w-full transition-transform duration-300 hover:-translate-y-2">
                                        
                                        <div className="w-12 h-12 bg-[#F4F7F0] text-[#718355] rounded-xl flex items-center justify-center mb-6 md:mx-auto">
                                            <Icon size={24} strokeWidth={2} />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-[#11140E] mb-3">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-gray-500 font-medium leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}