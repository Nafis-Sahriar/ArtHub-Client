"use client";
import React, { useState, useEffect, useRef } from 'react';
import ArtworkCard from '@/components/artworks/ArtworkCard'; 
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons'; 

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
            const scrollAmount = direction === 'left' ? -280 : 280;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!isLoading && artworks.length === 0) return null; 

    return (
       
        <section className="pt-32 pb-20 bg-[#F4F7F0] overflow-hidden relative z-10">
            <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#11140E] mb-2">
                            Featured Masterpieces
                        </h2>
                        <p className="text-[#718355] font-medium text-lg">
                            Handpicked selections from our top creators.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 hidden sm:flex">
                        <button 
                            onClick={() => slide('left')}
                            className="w-12 h-12 rounded-full border-2 border-[#CFE1B9] bg-white flex items-center justify-center text-[#718355] hover:bg-[#E9F5DB] hover:text-[#4A5D23] hover:border-[#97A97C] transition-all shadow-sm"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft width={20} height={20} />
                        </button>
                        <button 
                            onClick={() => slide('right')}
                            className="w-12 h-12 rounded-full border-2 border-[#CFE1B9] bg-white flex items-center justify-center text-[#718355] hover:bg-[#E9F5DB] hover:text-[#4A5D23] hover:border-[#97A97C] transition-all shadow-sm"
                            aria-label="Scroll right"
                        >
                            <ChevronRight width={20} height={20} />
                        </button>
                    </div>
                </div>

                <div className="relative -mx-4 sm:mx-0">
                    <div 
                        ref={sliderRef}
                        className="flex gap-4 sm:gap-6 px-4 sm:px-0 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="w-[75vw] sm:w-[260px] md:w-[240px] lg:w-[260px] shrink-0 h-[340px] bg-white border border-[#CFE1B9]/50 rounded-2xl animate-pulse snap-center sm:snap-start"></div>
                            ))
                        ) : (
                            artworks.map((art) => (
                                <div 
                                    key={art._id} 
                                    className="w-[75vw] sm:w-[260px] md:w-[240px] lg:w-[260px] shrink-0 snap-center sm:snap-start"
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