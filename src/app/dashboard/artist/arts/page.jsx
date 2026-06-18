import { getArtistArtworks } from '@/lib/api/artworks';
import React from 'react';
import ArtworksTable from './ArtworksTable';


const ArtistArtsPage = async () => {

    const artistId = "artist_123"; // To do: Get from session later
    const artworks = await getArtistArtworks(artistId); 

    return (
        <div className="p-2 sm:p-6 w-full space-y-4">
            <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-[#718355]">Manage All Artworks</h2>
                <p className="text-sm text-[#97A97C]">View, update, and manage your current portfolio.</p>
            </div>
            
            <ArtworksTable artworks={artworks} />
        </div>
    );
};

export default ArtistArtsPage;