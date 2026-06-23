import React from 'react';
import { Chip, Button } from '@heroui/react';
import { ArrowLeft, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { getArtworkById } from '@/lib/api/artworks';
import DeleteArtistArtworkModal from '../../DeleteArtistArtworkModal';
// Import your new modal! Adjust the path as needed.


const ArtworkDetailsPage = async ({ params }) => {
    const { id } = await params; 
    const artwork = await getArtworkById(id);

    if (!artwork) {
        return (
            <div className="p-6 text-center mt-10">
                <h2 className="text-2xl font-bold text-red-600">Artwork Not Found</h2>
                <Link href="/dashboard/artist/arts" className="text-[#718355] hover:underline mt-4 inline-block">
                    Return to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="p-2 sm:p-6 w-full max-w-5xl mx-auto space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Link 
                    href="/dashboard/artist/arts"
                    className="flex items-center gap-2 text-[#97A97C] hover:text-[#718355] transition-colors font-medium"
                >
                    <ArrowLeft size={18} /> Back to Portfolio
                </Link>
                
                <div className="flex gap-3">
                    {artwork.status === 'sold' ? (
                        <Button 
                            isDisabled
                            className="bg-red-50 text-red-500 font-semibold rounded-xl cursor-not-allowed opacity-80"
                        >
                            Cannot edit or delete sold artwork
                        </Button>
                    ) : (
                        <>
                            <Link href={`/dashboard/artist/arts/${id}/edit`}>
                                <Button className="bg-[#E9F5DB] text-[#718355] hover:bg-[#CFE1B9] font-semibold rounded-xl transition-colors">
                                    <Edit2 size={16} /> Edit Details
                                </Button>
                            </Link>

                            {/* NEW: The Delete Modal */}
                            <DeleteArtistArtworkModal 
                                artwork={artwork} 
                                redirectOnSuccess="/dashboard/artist/arts" 
                            />
                        </>
                    )}
                </div>
            </div>

            {/* ... Rest of your details page UI stays exactly the same ... */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-[#CFE1B9]/50 flex flex-col md:flex-row gap-10">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <div className="rounded-2xl overflow-hidden border-4 border-[#F4F7F0] shadow-md bg-gray-100">
                        <img 
                            src={artwork.imageUrl} 
                            alt={artwork.title} 
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="mb-4">
                        <Chip className="bg-[#E9F5DB] text-[#718355] font-semibold mb-3 capitalize border border-[#CFE1B9]/50">
                            {artwork.category}
                        </Chip>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#11140E] mb-2">
                            {artwork.title}
                        </h1>
                        <p className="text-2xl font-bold text-[#718355]">
                            ${artwork.price}
                        </p>
                    </div>

                    <div className="py-6 border-y border-[#CFE1B9]/30 my-2 space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Dimensions</h3>
                            <p className="text-lg font-medium text-gray-800">{artwork.dimensions}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</h3>
                            <p className={`text-lg font-medium capitalize ${artwork.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                                {artwork.status}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">The Story</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {artwork.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetailsPage;