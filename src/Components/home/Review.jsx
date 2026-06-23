"use client";
import React from 'react';
import { Star } from 'lucide-react';

export default function Review() {
    const reviews = [
        {
            id: 1,
            name: "Mr. Tom",
            role: "Buyer",
            avatar: "https://i.ibb.co.com/cpvNGZ6/Screenshot-2026-05-12-003137.png",
            text: "The authentication process at ArtHub is seamless. I purchased a canvas last month and it arrived in Dhaka in perfect, museum-grade packaging.",
            rating: 5
        },
        {
            id: 2,
            name: "Prof.Dr. Shahin",
            role: "Artist",
            avatar: "https://i.ibb.co.com/rGGVT6WL/Screenshot-2026-06-23-140823.png",
            text: "Finally, a platform that understands the value of local creators. The dashboard makes managing my revenue and portfolio incredibly intuitive.",
            rating: 5
        },
        {
            id: 3,
            name: "Mozammelul Haque",
            role: "Buyer",
            avatar: "https://i.ibb.co.com/bM0cmbKD/Screenshot-2026-06-23-140945.png",
            text: "The curated gallery is breathtaking. I love that I can filter by medium—it made finding my first oil painting such an enjoyable experience.",
            rating: 5
        }
    ];

    return (
        <section className="py-10 w-[90%] mx-auto  bg-[#F4F7F0] mb-5">
            <div className="w-[90%] max-w-7xl mx-auto">
                
             
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-[#11140E] mb-4 italic">
                        Buyer & Artist&apos;s Voices
                    </h2>
                    <p className="text-[#718355] font-medium text-lg">
                        Trusted by the community of ArtHub.
                    </p>
                </div>

                {/* Review Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div 
                            key={review.id} 
                            className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(113,131,85,0.05)] border border-[#CFE1B9]/20 flex flex-col justify-between"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={18} className="fill-[#718355] text-[#718355]" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-600 leading-relaxed mb-8 italic">
                                {review.text}
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4 border-t border-[#F4F7F0] pt-6">
                                <div className="w-12 h-12 rounded-full bg-[#E9F5DB] overflow-hidden border border-[#CFE1B9]">
                                    {/* You can replace this img with your actual ImageBB link */}
                                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#11140E]">{review.name}</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#718355]">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}