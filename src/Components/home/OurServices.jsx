"use client";
import React, { useState } from 'react';
import { SlidersHorizontal, ShieldCheck, LayoutDashboard, Brush, Layers, TrendingUp } from 'lucide-react';

export default function OurServices() {
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'collector' | 'artist'

    const services = [
        // COLLECTOR PILLARS
        {
            id: 1,
            title: "Multi-Parameter Discovery",
            target: "collector",
            badge: "For Collectors",
            badgeBg: "bg-[#CFE1B9]/20 text-[#CFE1B9] border-[#CFE1B9]/30",
            icon: SlidersHorizontal,
            description: "Browse our live database with high-fidelity filtering. Search by specific artists, instantly isolate mediums (oil, digital, sculpture), and sort by price or newly dropped masterpieces."
        },
        {
            id: 2,
            title: "Secure Instant Acquisition",
            target: "collector",
            badge: "For Collectors",
            badgeBg: "bg-[#CFE1B9]/20 text-[#CFE1B9] border-[#CFE1B9]/30",
            icon: ShieldCheck,
            description: "Lock in one-of-a-kind artworks instantly via our tokenized Stripe gateway. Manage your active delivery profiles and track your physical or digital shipments safely."
        },
        {
            id: 3,
            title: "Collector Spending Hub",
            target: "collector",
            badge: "For Collectors",
            badgeBg: "bg-[#CFE1B9]/20 text-[#CFE1B9] border-[#CFE1B9]/30",
            icon: LayoutDashboard,
            description: "Access your personalized collection portal. View live telemetry on your total capital spent, inspect your collected inventory count, and update your profile avatars."
        },

        // ARTIST PILLARS
        {
            id: 4,
            title: "Studio Artwork Publishing",
            target: "artist",
            badge: "For Creators",
            badgeBg: "bg-[#E9F5DB]/20 text-[#E9F5DB] border-[#E9F5DB]/30",
            icon: Brush,
            description: "Upload high-resolution canvas files directly to the ArtHub index. Assign custom pricing, define your aesthetic category, and drop new pieces directly into the collector stream."
        },
        {
            id: 5,
            title: "Real-Time Catalog Control",
            target: "artist",
            badge: "For Creators",
            badgeBg: "bg-[#E9F5DB]/20 text-[#E9F5DB] border-[#E9F5DB]/30",
            icon: Layers,
            description: "Maintain 100% autonomy over your active listings. Instantly update artwork pricing, rewrite descriptive narratives, or toggle an artwork's status between 'Available' and 'Sold'."
        },
        {
            id: 6,
            title: "Studio Revenue Telemetry",
            target: "artist",
            badge: "For Creators",
            badgeBg: "bg-[#E9F5DB]/20 text-[#E9F5DB] border-[#E9F5DB]/30",
            icon: TrendingUp,
            description: "Track the financial heartbeat of your studio. View clean metrics on total generated revenue, inspect itemized historical sales dispatches, and review incoming transaction logs."
        }
    ];

    const filteredServices = activeTab === 'all' 
        ? services 
        : services.filter(s => s.target === activeTab);

    return (
        <section className="py-20">
            
            {/* 90% Island Container */}
            <div className="w-[90%]  mx-auto rounded-3xl bg-gradient-to-b from-[#11140E] via-[#181C13] to-[#11140E] p-8 sm:p-12 md:p-16 lg:p-20 border border-[#CFE1B9]/20 shadow-2xl text-white">
                
                {/* --- HEADER & TAB CONTROLS --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#718355]/20 border border-[#718355]/30 text-[#CFE1B9] mb-4 text-xs font-bold uppercase tracking-widest">
                            Platform Capabilities
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                            Built for <br />
                            <span className="bg-gradient-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-transparent">
                                Collectors & Curators
                            </span>
                        </h2>
                    </div>

                    {/* Interactive Role Toggle */}
                    <div className="flex items-center bg-white/5 border border-white/10 p-1.5 rounded-2xl w-max">
                        <button 
                            onClick={() => setActiveTab('all')}
                            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === 'all' ? 'bg-[#718355] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            All Features ({services.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('collector')}
                            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === 'collector' ? 'bg-[#718355] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            For Collectors
                        </button>
                        <button 
                            onClick={() => setActiveTab('artist')}
                            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === 'artist' ? 'bg-[#718355] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            For Artists
                        </button>
                    </div>
                </div>

                {/* --- STATIC SERVICES GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredServices.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div 
                                key={service.id}
                                className="group rounded-[2rem] border border-[#CFE1B9]/15 bg-white/5 p-8 md:p-10 backdrop-blur-md transition-all duration-300 hover:border-[#CFE1B9]/40 hover:bg-white/10 hover:-translate-y-1.5"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-[#718355]/20 border border-[#718355]/40 flex items-center justify-center text-[#CFE1B9] group-hover:scale-110 group-hover:bg-[#CFE1B9] group-hover:text-[#11140E] transition-all duration-300 shadow-sm">
                                        <Icon size={26} strokeWidth={2} />
                                    </div>

                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${service.badgeBg}`}>
                                        {service.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#CFE1B9] transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}