"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { Image as ImageIcon, ShoppingCart, Eye } from 'lucide-react';

const ArtworkCard = ({ artwork }) => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/artworks/${artwork._id}`);
    };

    return (
        <div className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#CFE1B9]/50 shadow-sm hover:shadow-xl transition-all duration-300">
            
         
            <div 
                className="relative w-full aspect-[4/3] bg-gray-100 cursor-pointer overflow-hidden"
                onClick={handleNavigate}
            >
                {artwork.imageUrl ? (
                    <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <ImageIcon className="text-[#97A97C] size-10 opacity-50" />
                    </div>
                )}
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#718355] capitalize shadow-sm">
                    {artwork.category}
                </div>
            </div>

            
            <div className="p-5 flex flex-col grow">
                <h3 
                    className="text-xl font-bold text-[#11140E] line-clamp-1 cursor-pointer hover:text-[#718355] transition-colors"
                    onClick={handleNavigate}
                >
                    {artwork.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1 mb-4">
                    By <span className="text-[#718355]">{artwork.artistName || "Unknown Artist"}</span>
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-black text-[#11140E]">${artwork.price}</span>
                </div>

              
                <div className="mt-5 grid grid-cols-2 gap-2">
                    <Button 
                        variant="flat" 
                        className="bg-[#F4F7F0] text-[#718355] font-semibold rounded-xl"
                        onClick={handleNavigate}
                    >
                        <Eye size={18} /> Details
                    </Button>
                    <Button 
                        className="bg-[#718355] text-white font-semibold rounded-xl hover:bg-[#87986A] shadow-md shadow-[#718355]/20"
                        onClick={handleNavigate}
                    >
                        <ShoppingCart size={18} /> Buy Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;