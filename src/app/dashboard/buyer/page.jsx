import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import StatsCards from '@/Components/dashboard/StatsCard'; 
import CollectionGallery from './CollectionGallery';
import { Palette, CreditCard, Bookmark, Crown } from 'lucide-react'; 

const BuyerDashboardHomePage = async () => 
    {
    const user = await getUserSession();

    if (!user) {
        redirect('/login');
    } 

    const currentUserId = user?.id || user?._id;

    const [collection, wishlistRes] = await Promise.all([
        serverFetch(`/api/purchases?buyerId=${currentUserId}`),
        serverFetch(`/api/wishlist/count/${currentUserId}`)
    ]);
    
    const wishlistCount = wishlistRes?.count || 0;
    const totalInvested = collection.reduce((acc, purchase) => acc + (Number(purchase.price) || 0), 0);
    
    const crownJewel = collection.length > 0 
        ? Math.max(...collection.map(item => Number(item.price) || 0)) 
        : 0;

    const buyerStats = [
        { title: "Artworks Collected", value: collection.length, icon: Palette },
        { title: "Total Invested", value: `$${totalInvested.toLocaleString()}`, icon: CreditCard },
        { title: "Saved to Wishlist", value: wishlistCount, icon: Bookmark }, 
        { title: "Highest Valued Piece", value: `$${crownJewel.toLocaleString()}`, icon: Crown }, 
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || "Collector"}!
                </h1>
                <p className="text-lg text-zinc-500">
                    This is your personal gallery. View your collected masterpieces, track your purchase history, and manage your billing.
                </p>
            </div>

            <div>
                <StatsCards stats={buyerStats} /> 
            </div>

            <div className="pt-8 border-t border-[#CFE1B9]/30">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900">Your Masterpieces</h2>
                        <p className="text-sm text-zinc-500 mt-1">Artworks you have successfully purchased.</p>
                    </div>
                </div>
                
                <CollectionGallery collection={collection} />
            </div>
        </div>
    );
};

export default BuyerDashboardHomePage;