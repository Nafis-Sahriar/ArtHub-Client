"use client";
import React from 'react';
import Link from 'next/link';
import { Palette, Monitor, Hammer, Droplets, Camera, Brush, ChevronRight } from 'lucide-react'; 

export default function ArtCategories() {
    const categories = [
        { id: 'oil', name: 'Oil Painting', icon: Palette },
        { id: 'digital', name: 'Digital Art', icon: Monitor },
        { id: 'sculpture', name: 'Sculpture', icon: Hammer },
        { id: 'watercolor', name: 'Watercolor', icon: Droplets },
        { id: 'acrylic', name: 'Acrylic', icon: Brush }
    ];

    return (
      
        <section className="py-5 bg-linear-to-b from-[#F4F7F0] to-[#E9F5DB]/40 relative z-10 w-[90%]  mx-auto rounded-3xl ">
            
          
            <div className="w-[90%] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
              
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#11140E] mb-2">
                            Explore by Medium
                        </h2>
                        <p className="text-[#718355] font-medium text-lg">
                            Jump directly into your favorite art styles.
                        </p>
                    </div>
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    
                    {categories.map((cat) => {
                        const Icon = cat.icon; 
                        
                        return (
                            <Link 
                                key={cat.id}
                                href={`/artworks?category=${cat.id}&page=1&perPage=4`}
                               
                                className="group flex items-center justify-between w-full p-3 sm:p-4 rounded-2xl border border-[#CFE1B9]/60 bg-white/70 backdrop-blur-sm shadow-[0_2px_10px_rgba(113,131,85,0.05)] transition-all duration-300 hover:shadow-md hover:bg-white hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-4">
                                
                                    <div className="w-12 h-12 rounded-xl bg-[#E9F5DB] border border-[#CFE1B9]/50 flex items-center justify-center text-[#718355] group-hover:bg-[#718355] group-hover:text-white transition-colors duration-300">
                                        <Icon size={22} strokeWidth={2.5} />
                                    </div>
                                    
                                  
                                    <h3 className="text-lg font-bold text-[#11140E] group-hover:text-[#4A5D23] transition-colors">
                                        {cat.name}
                                    </h3>
                                </div>

                               
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#97A97C] group-hover:bg-[#E9F5DB] group-hover:text-[#718355] transition-all duration-300 mr-1">
                                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}