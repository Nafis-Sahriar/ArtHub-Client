"use client";
import React, { useState, useEffect } from 'react';
import { Avatar } from '@heroui/react';
import { Trophy } from 'lucide-react';

export default function TopArtists() {
  
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
              
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/top-artists`, { cache: 'no-store' });
                const data = await res.json();
                
                
                if (Array.isArray(data)) {
                    setArtists(data);
                }
            } catch (error) {
                console.error("Failed to fetch top artists:", error);
            } finally {
                
                setIsLoading(false);
            }
        };

        fetchTopArtists();
    }, []);

    
    const getInitials = (name) => {
        if (!name) return "A";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

   
    if (!isLoading && artists.length === 0) return null;

    return (
        <section className="py-20">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                
          
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-[#11140E] mb-4 flex items-center justify-center gap-3">
                        <Trophy className="text-[#718355] size-8 md:size-10" />
                        Top Curators
                    </h2>
                    <p className="text-[#718355] font-medium text-lg max-w-2xl mx-auto">
                        Meet the brilliant minds behind our most collected masterpieces this month.
                    </p>
                </div>

              
                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 max-w-5xl mx-auto">
                    
                    {isLoading ? (
                       
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="w-full md:w-[300px] bg-[#F4F7F0] rounded-[2rem] p-8 flex flex-col items-center animate-pulse border border-[#CFE1B9]/50">
                                <div className="w-24 h-24 bg-white rounded-full mb-4"></div>
                                <div className="w-32 h-6 bg-white rounded-md mb-2"></div>
                                <div className="w-20 h-4 bg-white rounded-md"></div>
                            </div>
                        ))
                    ) : (
               
                        artists.map((artist, index) => {
                            
                    
                            const rankColors = [
                                'bg-[#E9F5DB] border-[#97A97C] text-[#4A5D23]', 
                                'bg-gray-50 border-gray-200 text-gray-600',       
                                'bg-orange-50 border-orange-200 text-orange-700' 
                            ];

                            return (
                                <div 
                                    key={artist.artistId} 
                                    className="w-full md:w-[300px] relative bg-white rounded-[2rem] p-8 flex flex-col items-center border border-[#CFE1B9]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                                >
                                    
                                    <div className={`absolute -top-4 shadow-sm border px-4 py-1 rounded-full text-sm font-black ${rankColors[index] || rankColors[1]}`}>
                                        #{index + 1} Best Seller
                                    </div>

                                
                                    <Avatar className="w-28 h-28 text-large ring-4 ring-[#F4F7F0] group-hover:ring-[#CFE1B9] transition-all mb-5">
                                        {artist.imageUrl && <Avatar.Image src={artist.imageUrl} alt={artist.name} />}
                                        <Avatar.Fallback className="bg-[#E9F5DB] text-[#4A5D23] font-bold text-2xl">
                                            {getInitials(artist.name)}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <h3 className="text-xl font-bold text-[#11140E] mb-1 text-center line-clamp-1 w-full">
                                        {artist.name}
                                    </h3>
                                    <p className="text-[#718355] font-semibold bg-[#F4F7F0] px-4 py-1.5 rounded-xl mt-2 text-sm">
                                        {artist.totalSales} {artist.totalSales === 1 ? 'Artwork' : 'Artworks'} Sold
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </section>
    );
}