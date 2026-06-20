"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, PackageSearch } from 'lucide-react';
import DeleteArtworkModal from './DeleteArtworkModal';

const ArtworksTable = ({ initialArtworks = [] }) => {
    const router = useRouter();
    const [artworks, setArtworks] = useState(initialArtworks);

  
    const handleDeleteSuccess = (deletedId) => 
    {
        
        setArtworks(prev => prev.filter(art => (art._id || art.id) !== deletedId));
        router.refresh();
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F4F7F0] border-b border-[#CFE1B9]/50">
                            <th className="py-4 px-6 font-bold text-zinc-700">Artwork</th>
                            <th className="py-4 px-6 font-bold text-zinc-700">Artist Name</th>
                            <th className="py-4 px-6 font-bold text-zinc-700">Status & Price</th>
                            <th className="py-4 px-6 font-bold text-zinc-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CFE1B9]/30">
                        {artworks.map((artwork, index) => {
                            const artworkId = artwork._id || artwork.id;

                            return (
                                <tr key={artworkId || index} className="hover:bg-zinc-50/50 transition-colors">
                                   
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                                {artwork.imageUrl ? (
                                                    <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-zinc-900">{artwork.title}</p>
                                                <p className="text-xs text-zinc-500 uppercase tracking-wider">{artwork.category || 'Art'}</p>
                                            </div>
                                        </div>
                                    </td>

                                
                                    <td className="py-4 px-6">
                                        <p className="font-medium text-zinc-700">{artwork.artistName || 'Unknown Artist'}</p>
                                    </td>

                                   
                                    <td className="py-4 px-6">
                                        <p className="font-bold text-[#718355]">${artwork.price}</p>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block capitalize ${
                                            artwork.status === 'available' ? 'bg-[#E9F5DB] text-[#718355]' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {artwork.status || 'Unknown'}
                                        </span>
                                    </td>

                               
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end">
                                            <DeleteArtworkModal 
                                                artwork={artwork} 
                                                onDeleteSuccess={handleDeleteSuccess} 
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Empty State */}
                {artworks.length === 0 && (
                    <div className="p-12 text-center text-zinc-500">
                        <PackageSearch size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">No artworks found.</p>
                        <p className="text-sm">There are currently no artworks listed on the platform.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworksTable;