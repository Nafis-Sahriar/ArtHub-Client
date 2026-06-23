"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Globe, ShieldCheck, Palette, Zap, Users, Heart } from 'lucide-react';

export default function AboutPage() {
    // --- Framer Motion Animation Variants ---
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardScaleUp = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    
    const coreValues = [
        { icon: Palette, title: "Empowering Creators", desc: "We provide the tools, audience, and zero-friction marketplace artists need to turn their passion into a sustainable career." },
        { icon: ShieldCheck, title: "Verified Authenticity", desc: "Every piece on ArtHub is vetted. Buyers can collect with confidence knowing they are investing in genuine originality." },
        { icon: Globe, title: "Global Canvas", desc: "Art knows no borders. We connect a watercolorist in Paris with a collector in Tokyo in milliseconds." },
        { icon: Users, title: "Community First", desc: "More than a store, ArtHub is a gathering place for those who appreciate the profound impact of visual storytelling." },
        { icon: Zap, title: "Seamless Technology", desc: "We utilize cutting-edge web tech to ensure your browsing, buying, and selling experience is lightning fast and secure." },
        { icon: Heart, title: "Preserving Culture", desc: "By supporting living artists, we actively participate in funding and preserving the culture of our generation." }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#11140E] text-white selection:bg-[#CFE1B9] selection:text-[#11140E] pb-24">
            
          
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
                className="absolute left-1/2 top-0 h-200 w-200 -translate-x-1/2 rounded-full bg-[#718355]/15 blur-[200px] pointer-events-none" 
            />
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}
                className="absolute bottom-0 right-0 h-150 w-150 translate-x-1/3 translate-y-1/3 rounded-full bg-[#CFE1B9]/10 blur-[150px] pointer-events-none" 
            />

            <div className="relative z-10 mx-auto w-[90%] max-w-7xl pt-32 sm:pt-40">
                
              
                <motion.div 
                    initial="hidden" animate="visible" variants={staggerContainer}
                    className="text-center max-w-4xl mx-auto mb-32"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#718355]/20 border border-[#718355]/30 text-[#CFE1B9] mb-8">
                        <span className="text-sm font-bold tracking-widest uppercase">Our Story</span>
                    </motion.div>
                    
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black leading-tight mb-8">
                        Redefining the <br />
                        <span className="bg-linear-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-transparent italic">
                            Digital Art World
                        </span>
                    </motion.h1>
                    
                    <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 leading-relaxed">
                        ArtHub was born from a simple belief: breathtaking art deserves a breathtaking platform. We are bridging the gap between masterful creators and passionate collectors through seamless, beautiful technology.
                    </motion.p>
                </motion.div>


            
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32"
                >
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Gallery of the <span className="text-[#CFE1B9]">Future.</span></h2>
                        <div className="w-20 h-1 bg-linear-to-r from-[#CFE1B9] to-[#718355] rounded-full mb-8"></div>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp} className="space-y-6 text-gray-400 text-lg leading-relaxed">
                        <p>
                            Historically, entering the art market required navigating exclusive galleries, high commission fees, and geographical limitations. We built ArtHub to tear down those walls.
                        </p>
                        <p>
                            Whether you are a digital artist minting your first piece, or an oil painter with decades of experience, ArtHub provides a zero-friction environment to showcase your portfolio to the world. For collectors, it&apos;s a curated haven of authenticity.
                        </p>
                    </motion.div>
                </motion.div>


              
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32"
                >
                    {[
                        { value: "50K+", label: "Artworks Hosted" },
                        { value: "12K+", label: "Verified Artists" },
                        { value: "$2M+", label: "Artist Payouts" },
                        { value: "99%", label: "Client Satisfaction" }
                    ].map((stat, idx) => (
                        <motion.div 
                            key={idx} variants={cardScaleUp}
                            className="rounded-[2rem] border border-[#CFE1B9]/10 bg-white/5 p-8 text-center backdrop-blur-xl hover:bg-white/10 transition-colors duration-300"
                        >
                            <h3 className="text-4xl md:text-5xl font-black bg-linear-to-br from-white to-[#97A97C] bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>


            
                <div className="mb-32">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">The principles that guide every feature we build and every artist we onboard.</p>
                    </motion.div>

                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {coreValues.map((val, idx) => {
                            const Icon = val.icon;
                            return (
                                <motion.div 
                                    key={idx} variants={cardScaleUp}
                                    className="rounded-[2rem] border border-[#CFE1B9]/10 bg-white/5 p-8 backdrop-blur-sm hover:border-[#CFE1B9]/30 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[#718355]/20 border border-[#718355]/50 flex items-center justify-center mb-6 group-hover:bg-[#CFE1B9] group-hover:text-[#11140E] transition-colors duration-300">
                                        <Icon size={28} className="text-[#CFE1B9] group-hover:text-[#11140E]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{val.desc}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>


            
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardScaleUp}
                    className="relative rounded-[3rem] overflow-hidden border border-[#CFE1B9]/20 bg-[#1A1D16] py-20 px-8 text-center"
                >
              
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#718355]/20 pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to join the movement?</h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Whether you are here to curate your dream collection or share your genius with the world, your canvas awaits.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/register">
                                <Button 
                                    className="w-full sm:w-auto bg-[#CFE1B9] text-[#11140E] font-bold text-lg px-10 py-7 rounded-2xl hover:bg-white transition-all shadow-[0_0_20px_rgba(207,225,185,0.2)] hover:shadow-[0_0_30px_rgba(207,225,185,0.4)]"
                                >
                                    Create an Account
                                </Button>
                            </Link>
                            <Link href="/artworks">
                                <Button 
                                    variant="bordered"
                                    className="w-full sm:w-auto border border-[#CFE1B9]/30 text-white font-bold text-lg px-10 py-7 rounded-2xl hover:bg-white/10 transition-all"
                                >
                                    Browse Gallery
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}