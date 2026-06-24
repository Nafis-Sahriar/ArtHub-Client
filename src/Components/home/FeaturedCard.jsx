"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { Image as ImageIcon, ShoppingCart, Eye } from 'lucide-react';

const FeaturedCard = ({ artwork }) => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/artworks/${artwork._id}`);
    };

    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#CFE1B9]/50 shadow-xs hover:shadow-xl transition-all duration-300">
            
        
            <div 
                className="relative w-full aspect-4/3 bg-gray-100 cursor-pointer overflow-hidden shrink-0"
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
                        <ImageIcon className="text-[#97A97C] size-8 sm:size-10 opacity-50" />
                    </div>
                )}
                
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold text-[#718355] capitalize shadow-xs">
                    {artwork.category}
                </div>

                {
                    artwork.status === 'sold' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-lg sm:text-xl font-bold tracking-wide">SOLD</span>
                        </div>
                    )
                }
            </div>

           
            <div className="p-3.5 sm:p-5 flex flex-col grow justify-between">
                <div>
                    <h3 
                        className="text-base sm:text-xl font-bold text-[#11140E] line-clamp-1 cursor-pointer hover:text-[#718355] transition-colors leading-tight"
                        onClick={handleNavigate}
                    >
                        {artwork.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1 mb-3 sm:mb-4 truncate">
                        By <span className="text-[#718355]">{artwork.artistName || "Unknown Artist"}</span>
                    </p>
                </div>

                <div className="flex flex-col grow justify-end">
                    <div className="mb-3 sm:mb-4 flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-black text-[#11140E]">${artwork.price}</span>
                    </div>

                    
                    <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                        <Button 
                            variant="flat" 
                            className="w-full bg-[#F4F7F0] text-[#718355] font-semibold rounded-xl h-9 sm:h-10 text-xs sm:text-sm px-2 min-w-0"
                            onClick={handleNavigate}
                        >
                            <Eye size={16} className="shrink-0" /> 
                            <span className="truncate">Details</span>
                        </Button>
                        <Button 
                            className="w-full bg-[#718355] text-white font-semibold rounded-xl hover:bg-[#87986A] shadow-md shadow-[#718355]/20 h-9 sm:h-10 text-xs sm:text-sm px-2 min-w-0"
                            onClick={handleNavigate}
                        >
                            <ShoppingCart size={16} className="shrink-0" /> 
                            <span className="truncate">Buy Now</span>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FeaturedCard;