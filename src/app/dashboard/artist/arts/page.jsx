import { getArtistArtworks } from '@/lib/api/artworks';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ArtworksTable from './ArtworksTable';

const ArtistArtsPage = async () => {
    // 1. Fetch the real user session
    const user = await getUserSession();

    // 2. Security Check: Redirect to login if no session exists
    if (!user) {
        redirect('/login');
    }

    // 3. Role Check: Ensure only artists can access this page
    if (user.role !== 'artist') {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-red-50 rounded-3xl border border-red-200 mt-6">
                <h3 className="text-2xl font-bold text-red-800">Access Denied</h3>
                <p className="text-red-600 mt-2 max-w-md">
                    Only registered artists can view and manage artwork portfolios.
                </p>
            </div>
        );
    }

    // 4. Extract the real artist ID from the session and fetch their specific artworks
    const artistId = user.id; 
    const artworks = await getArtistArtworks(artistId); 

    return (
        <div className="p-2 sm:p-6 w-full space-y-4">
            <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-[#718355]">Manage All Artworks</h2>
                <p className="text-sm text-[#97A97C]">View, update, and manage your current portfolio.</p>
            </div>
            
            {/* Pass the dynamically fetched artworks to your client table */}
            <ArtworksTable artworks={artworks} />
            
        </div>
    );
};

export default ArtistArtsPage;