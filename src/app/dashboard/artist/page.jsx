import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import StatsCards from '@/Components/dashboard/StatsCard';
import ArtistGallery from './ArtistGallery';
import { Palette, ShoppingBag, DollarSign, Package } from 'lucide-react'; // Swapped Eye for Package

const ArtistHomePage = async () => {
    
    const user = await getUserSession();
    if (!user) {
        redirect('/login');
    }

    
    const [artworks, sales] = await Promise.all([
        serverFetch(`/api/artworks?artistId=${user.id}`),
        serverFetch(`/api/purchases?artistId=${user.id}`)
    ]);

    
    const totalEarnings = sales.reduce((acc, sale) => acc + (Number(sale.price) || 0), 0);
    
    const availableArtworks = artworks.filter(art => art.status === 'available').length;

    
    const artistStats = [
        { title: "Total Artworks", value: artworks.length, icon: Palette },
        { title: "Total Sales", value: sales.length, icon: ShoppingBag },
        { title: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, icon: DollarSign },
        { title: "Live Inventory", value: availableArtworks, icon: Package }, 
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            
            <div>
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || "Artist"}!
                </h1>
                <p className="text-lg text-zinc-500">
                    Manage your portfolio, track your sales, and view your current collection here.
                </p>
            </div>

          
            <div>
                <StatsCards stats={artistStats} /> 
            </div>

       
            <div className="pt-8 border-t border-[#CFE1B9]/30">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">All Artworks</h2>
                <ArtistGallery artworks={artworks} />
            </div>
        </div>
    );
};

export default ArtistHomePage;