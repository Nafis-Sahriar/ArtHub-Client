"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons'; 
import ArtworkCard from '../artworks/ArtworkCard';

export default function FeaturedSection() {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featuredArtworks`, { cache: 'no-store' });
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setArtworks(data);
                }
            } catch (error) {
                console.error("Failed to fetch featured artworks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    const slide = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -320 : 320;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!isLoading && artworks.length === 0) return null; 

    return (
        <section className="pt-32 pb-20 overflow-hidden relative z-10 w-full">
            <div className="w-[90%] max-w-7xl mx-auto">
                
              
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#11140E] mb-2 italic">
                            Featured Masterpieces
                        </h2>
                        <p className="text-[#718355] font-medium text-lg">
                            Handpicked selections from our top creators.
                        </p>
                    </div>
                    
                  
                    <div className="items-center gap-3 hidden lg:flex">
                        <button 
                            onClick={() => slide('left')}
                            className="w-12 h-12 rounded-full border border-[#CFE1B9] bg-white/50 backdrop-blur-sm flex items-center justify-center text-[#718355] hover:bg-[#E9F5DB] hover:text-[#4A5D23] hover:border-[#97A97C] transition-all shadow-sm"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft width={20} height={20} />
                        </button>
                        <button 
                            onClick={() => slide('right')}
                            className="w-12 h-12 rounded-full border border-[#CFE1B9] bg-white/50 backdrop-blur-sm flex items-center justify-center text-[#718355] hover:bg-[#E9F5DB] hover:text-[#4A5D23] hover:border-[#97A97C] transition-all shadow-sm"
                            aria-label="Scroll right"
                        >
                            <ChevronRight width={20} height={20} />
                        </button>
                    </div>
                </div>

               
                <div className="block lg:hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="w-full h-100 bg-white/40 border border-[#CFE1B9]/50 rounded-3xl animate-pulse" />
                            ))
                        ) : (
                            artworks.slice(0, 6).map((art) => ( 
                                <div key={art._id} className="w-full">
                                    <ArtworkCard artwork={art} />
                                </div>
                            ))
                        )}
                    </div>
                </div>


               
                <div className="hidden lg:block relative w-full">
                    <div 
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-75 shrink-0 h-100 bg-white/40 border border-[#CFE1B9]/50 rounded-3xl animate-pulse snap-start"
                                />
                            ))
                        ) : (
                            artworks.map((art) => (
                                <div 
                                    key={art._id} 
                                    className="w-75 shrink-0 snap-start"
                                >
                                    <ArtworkCard artwork={art} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}