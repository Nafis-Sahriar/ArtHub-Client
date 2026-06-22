import React from 'react';
import { getAllAvailableArtworks } from '@/lib/api/artworks';
import ArtContainer from '@/components/artworks/ArtContainer'; 

export const metadata = {
    title: 'Explore Artworks | ArtHub',
};

export const dynamic = 'force-dynamic'; 

export default async function BrowseArtworksPage({ searchParams }) {
    
    const rawFilters = await searchParams;
    
    const plainFilters = {
        search: rawFilters?.search || "",
        category: rawFilters?.category || "all",
        sort: rawFilters?.sort || "newest",
        page: rawFilters?.page || 1,
        perPage: rawFilters?.perPage || 3 
    };
    
    const querySearch = new URLSearchParams({ 
        ...plainFilters, 
        status: 'available' 
    });
    const queryString = querySearch.toString();

    const response = await getAllAvailableArtworks(queryString);
    
    const validArtworks = response?.results || (Array.isArray(response) ? response : []);
    
    // <-- CHANGED: Added "|| 0" as a final safety net for the pagination math
    const totalCount = response?.total || validArtworks.length || 0;

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

                <ArtContainer filters={plainFilters} artworks={validArtworks} total={totalCount} />
            </div>
        </div>
    );
}