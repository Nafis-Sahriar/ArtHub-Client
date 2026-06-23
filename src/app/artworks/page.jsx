import React from 'react';
import { getAllAvailableArtworks } from '@/lib/api/artworks';
import ArtContainer from '@/Components/artworks/ArtContainer';

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
         
    });
    const queryString = querySearch.toString();

    const response = await getAllAvailableArtworks(queryString);
    
    const validArtworks = response?.results || (Array.isArray(response) ? response : []);
    const totalCount = response?.total || validArtworks.length || 0;

    return (

        <div className="relative min-h-screen overflow-hidden bg-[#11140E] text-white pt-20 pb-24 selection:bg-[#CFE1B9] selection:text-[#11140E]">
            
       
            <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#718355]/20 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#CFE1B9]/10 blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Explore <span className="bg-gradient-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-transparent">Masterpieces</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        Discover original oil paintings, digital art, and sculptures from verified artists.
                    </p>
                </div>

                <ArtContainer filters={plainFilters} artworks={validArtworks} total={totalCount} />
            </div>
        </div>
    );
}