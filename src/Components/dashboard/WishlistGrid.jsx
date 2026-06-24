import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import ArtworkCard from '../artworks/ArtworkCard';

export default function WishlistGrid({ wishlistItems = [], user }) {
    
    if (wishlistItems.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-24 bg-white border border-[#CFE1B9]/40 rounded-3xl shadow-sm text-center px-4 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-[#E9F5DB] text-[#718355] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#CFE1B9]/60">
                    <Heart size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">
                    No saved artworks yet
                </h3>
                <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">
                    Your wishlist is currently empty. Explore the gallery to find and save masterpieces that inspire you.
                </p>
                <Link
                    href="/"
                    className="bg-[#718355] text-white font-bold rounded-xl px-8 py-3.5 hover:bg-[#5A6B42] shadow-md shadow-[#718355]/20 transition-all hover:-translate-y-0.5"
                >
                    Explore the Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                    <ArtworkCard 
                        key={item._id} 
                        artwork={item.artworkDetails} 
                        user={user} 
                    />
                ))}
            </div>
        </div>
    );
}