"use client";
import React from 'react';
import { Users, Palette, ShoppingBag, DollarSign } from 'lucide-react';

const StatsCards = ({ totalUsers, totalArtists, totalArtworksSold, totalRevenue }) => {
    
    
    const formattedRevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(totalRevenue || 0);

    const cards = [
        {
            title: "Total Users",
            value: totalUsers || 0,
            subtitle: "Registered buyers & general users",
            icon: Users,
            colorClass: "text-blue-600",
            bgClass: "bg-blue-50"
        },
        {
            title: "Total Artists",
            value: totalArtists || 0,
            subtitle: "Verified platform creators",
            icon: Palette,
            colorClass: "text-[#718355]",
            bgClass: "bg-[#E9F5DB]"
        },
        {
            title: "Artworks Sold",
            value: totalArtworksSold || 0,
            subtitle: "Total individual pieces purchased",
            icon: ShoppingBag,
            colorClass: "text-amber-600",
            bgClass: "bg-amber-50"
        },
        {
            title: "Total Revenue",
            value: formattedRevenue,
            subtitle: "Purchases & Subscriptions combined",
            icon: DollarSign,
            colorClass: "text-emerald-600",
            bgClass: "bg-emerald-50"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className="bg-white rounded-3xl p-6 shadow-sm border border-[#CFE1B9]/50 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${card.bgClass}`}>
                            <card.icon className={`size-6 ${card.colorClass}`} />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-3xl font-black text-zinc-900 tracking-tight mb-1">
                            {card.value}
                        </h3>
                        <p className="text-sm font-bold text-zinc-700 uppercase tracking-wide">
                            {card.title}
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                            {card.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;