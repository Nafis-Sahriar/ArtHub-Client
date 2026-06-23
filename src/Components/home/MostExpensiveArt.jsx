"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function MostExpensiveArt() {
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExpensiveArt = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/most-expensive-art`, { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setArtwork(data);
                }
            } catch (error) {
                console.error("Failed to fetch most expensive art:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpensiveArt();
    }, []);

  
    if (isLoading) return null;
    if (!artwork) return null;

 
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative w-[90%] rounded-3xl overflow-hidden bg-[#11140E] text-white py-10 my-10">
            
         
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#718355]/20 blur-[150px] pointer-events-none" 
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
                className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/4 rounded-full bg-[#CFE1B9]/15 blur-[120px] pointer-events-none" 
            />

            
            <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
                
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                    className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16"
                >
               
                    <motion.div variants={fadeInUp} className="relative group">
                     
                        <div className="absolute -inset-1 bg-linear-to-r from-[#CFE1B9] to-[#718355] rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        
                        <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden border border-[#CFE1B9]/20 bg-[#1A1D16]">
                            <img 
                                src={artwork.imageUrl || 'https://via.placeholder.com/800x600'} 
                                alt={artwork.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                          
                            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-sm font-semibold text-[#CFE1B9] uppercase tracking-wider">
                                {artwork.category || "Masterpiece"}
                            </div>
                        </div>
                    </motion.div>

                  
                    <motion.div variants={fadeInUp} className="flex flex-col justify-center">
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#718355]/20 border border-[#718355]/30 text-[#CFE1B9] w-max mb-6">
                            <Sparkles size={16} />
                            <span className="text-xs font-bold tracking-wide uppercase">Crown Jewel Collection</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
                            {artwork.title}
                        </h2>

                        <p className="text-xl text-[#97A97C] font-medium mb-6">
                            Created by <span className="text-white">{artwork.artistName || "Unknown Master"}</span>
                        </p>

                       
                        <div className="mb-8">
                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Valued At</p>
                            <p className="text-5xl font-bold bg-linear-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-transparent inline-block">
                                ${artwork.price?.toLocaleString()}
                            </p>
                        </div>

                       
                        <p className="text-gray-400 leading-relaxed mb-10 line-clamp-4 text-lg">
                            {artwork.description || "A breathtaking piece that defines the pinnacle of artistic expression on ArtHub. Experience the raw emotion, masterful technique, and unparalleled vision of this extraordinary work."}
                        </p>

                        
                        <div>
                            <Link href={`/artworks/${artwork._id}`}>
                                <Button 
                                    size="lg"
                                    className="bg-[#CFE1B9] text-[#11140E] font-bold px-8 py-6 rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(207,225,185,0.3)] hover:shadow-[0_0_30px_rgba(207,225,185,0.5)] group"
                                >
                                    View Details
                                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                                </Button>
                            </Link>
                        </div>

                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}