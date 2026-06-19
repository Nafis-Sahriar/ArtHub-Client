'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

const CollectionGallery = ({ collection }) => {

   
    if (!collection || collection.length === 0) {
        return (
            <div className="w-full rounded-3xl border border-dashed border-[#CFE1B9] bg-[#F9FBF6] p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-[#E9F5DB] rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="text-[#718355] w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Your collection is empty</h3>
                <p className="text-zinc-500 mb-6 max-w-md mx-auto">
                    You have not acquired any masterpieces yet. Explore the gallery and find something that speaks to you.
                </p>
                <Link href="/artworks">
                    <Button className="bg-[#718355] text-white font-bold rounded-xl px-8 shadow-lg shadow-[#718355]/20 hover:bg-[#5a6b42] transition-all">
                        Browse Marketplace
                    </Button>
                </Link>
            </div>
        );
    }


    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {collection.map((item) => (
                <div 
                    key={item._id} 
                    className="group bg-white border border-[#CFE1B9]/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                    
                    <div className="aspect-video w-full bg-zinc-100 relative overflow-hidden">
                        {item.imageUrl ? (
                            <img 
                                src={item.imageUrl} 
                                alt={item.artworkTitle}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-[#F4F7F0]">
                                <ImageIcon size={32} className="mb-2 opacity-50" />
                                <span className="text-xs font-medium">Image Data Missing</span>
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-black text-zinc-900 line-clamp-1">
                                {item.artworkTitle}
                            </h3>
                            <span className="text-[#718355] font-black whitespace-nowrap ml-4">
                                ${item.price}
                            </span>
                        </div>
                        
                        <div className="text-sm text-zinc-500 mb-6 flex-grow">
                            Acquired on {new Date(item.purchaseDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>

                        {/* Link to details */}
                        <Link href={`/artworks/${item.artworkId}`} className="mt-auto block">
                            <Button 
                                variant="flat" 
                                className="w-full bg-[#E9F5DB] text-[#718355] hover:bg-[#CFE1B9] font-bold rounded-xl"
                            >
                                View Masterpiece <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollectionGallery;