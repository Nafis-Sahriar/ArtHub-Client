import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { ArrowRight, Image as ImageIcon, Pencil } from 'lucide-react';

const ArtistGallery = ({ artworks }) => {

    if (!artworks || artworks.length === 0) {
        return (
            <div className="w-full rounded-3xl border border-dashed border-[#CFE1B9] bg-[#F9FBF6] p-12 text-center shadow-sm">
                <ImageIcon className="mx-auto text-[#97A97C] mb-4 w-12 h-12 opacity-50" />
                <h3 className="text-xl font-bold text-zinc-900 mb-2">No Artworks Yet</h3>
                <p className="text-zinc-500 mb-6">Start your portfolio by adding your first masterpiece.</p>
                <Link href="/dashboard/artist/arts/new">
                    <Button className="bg-[#718355] text-white font-bold rounded-xl px-8 hover:bg-[#5A6B42]">
                        Add Artwork
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {artworks.map((art) => (
                <div key={art._id} className="group bg-white border border-[#CFE1B9]/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
                    <div className="aspect-video w-full bg-zinc-100 relative overflow-hidden">
                        <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            art.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {art.status}
                        </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-black text-zinc-900 mb-2">{art.title}</h3>
                        <p className="text-[#718355] font-bold text-lg mb-6">${art.price}</p>
                        
                        <Link href={`/dashboard/artist/arts/${art._id}`} className="mt-auto">
                            <Button variant="flat" className="w-full bg-[#E9F5DB] text-[#718355] hover:bg-[#CFE1B9] font-bold rounded-xl">
                                Manage <Pencil size={16} className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArtistGallery;