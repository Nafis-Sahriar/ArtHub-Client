"use client";
import React from 'react';
import { ShieldCheck, Lock, Globe, Award } from 'lucide-react';

export default function TrustBanner() {
    const trustFeatures = [
        {
            icon: Lock,
            title: "Secure Checkout",
            description: <>Payments powered by <span className="font-bold text-[#8A81FF]">stripe</span></>
        },
        {
            icon: ShieldCheck,
            title: "Buyer Protection",
            description: "Full refunds for damaged or lost transit."
        },
        {
            icon: Award,
            title: "Verified Authenticity",
            description: "Direct from the artist's studio to you."
        },
        {
            icon: Globe,
            title: "Global Shipping",
            description: "Fully insured international delivery."
        }
    ];

    return (
       
        <section className="relative overflow-hidden py-16 bg-[#11140E] border-y border-[#CFE1B9]/10 rounded-3xl w-[90%] mx-auto my-10">
            
         
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-50 w-200 rounded-full bg-[#718355]/15 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {trustFeatures.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                           
                            <div 
                                key={idx} 
                                className="flex flex-col items-center text-center p-6 rounded-[2rem] bg-white/5 border border-[#CFE1B9]/10 backdrop-blur-md hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group"
                            >
                               
                                <div className="w-14 h-14 rounded-2xl bg-[#718355]/20 border border-[#718355]/30 flex items-center justify-center mb-5 text-[#CFE1B9] group-hover:scale-110 group-hover:bg-[#CFE1B9] group-hover:text-[#11140E] transition-all duration-300 shadow-[0_0_20px_rgba(113,131,85,0.15)]">
                                    <Icon size={26} strokeWidth={2} />
                                </div>
                                
                                <h4 className="text-lg font-bold text-white mb-2">
                                    {feature.title}
                                </h4>
                                
                                <p className="text-sm font-medium text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}