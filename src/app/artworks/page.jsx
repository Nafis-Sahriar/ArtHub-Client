import React from 'react';
import { getAllAvailableArtworks } from '@/lib/api/artworks';
import ArtContainer from '@/components/artworks/ArtContainer'; // We will build this next

export const metadata = {
    title: 'Explore Artworks | ArtHub',
    description: 'Browse and purchase original masterpieces from talented artists worldwide.',
};

const BrowseArtworksPage = async () => {
    // ekhane ami sobgulo artwork fetch korlam.
    const artworks = await getAllAvailableArtworks();

    return (
        <div className="min-h-screen bg-[#F4F7F0] pt-10 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#11140E] mb-4">
                        Explore Masterpieces
                    </h1>
                    <p className="text-lg text-[#718355] max-w-2xl">
                        Discover original oil paintings, digital art, and sculptures from verified artists.
                    </p>
                </div>

             
                <ArtContainer initialArtworks={artworks} />
            </div>
        </div>
    );
};

export default BrowseArtworksPage;