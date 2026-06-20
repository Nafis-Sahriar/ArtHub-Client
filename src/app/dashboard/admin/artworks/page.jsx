import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import ArtworksTable from './ArtworksTable';

const ManageArtworksPage = async () => {
   
    const session = await getUserSession();
    if (!session || session.role !== 'admin') {
        redirect('/dashboard/unauthorized');
    }

    
    const artworks = await serverFetch('/api/artworks');

    return (
        <div className="p-2 sm:p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Manage Artworks</h1>
                <p className="text-lg text-zinc-500">
                    Monitor and moderate all artworks currently listed on the marketplace.
                </p>
            </div>

         
            <ArtworksTable initialArtworks={artworks} />
        </div>
    );
};

export default ManageArtworksPage;