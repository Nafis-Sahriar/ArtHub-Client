import React from 'react';
import { getUserSession } from '@/lib/core/session'; 
import WishlistGrid from '@/Components/dashboard/WishlistGrid';
import { getAuthToken } from '@/lib/core/server';

export const metadata = {
    title: 'My Wishlist | ArtHub',
};


export default async function WishlistPage() {
  
    const user = await getUserSession();
    
    const token= await getAuthToken(); // Fetch the token using the new function

    if (!user) return null; 

    const currentUserId = user.id || user._id;
    let wishlistItems = [];
  
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/user/${currentUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store' 
        });

        if (res.ok) 
        {
            wishlistItems = await res.json();
        } 
        else 
        {
            console.error("Failed to fetch wishlist data");
        }
    } 
    catch (error) 
    {
        console.error("Server error fetching wishlist:", error);
    }

  
    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
         
            <header className="border-b border-[#CFE1B9]/40 pb-6">
                <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
                    My Wishlist
                </h1>
                <p className="text-zinc-500 mt-1.5 text-sm md:text-base">
                    The masterpieces I&apos;ve saved. Ready to make them yours?
                </p>
            </header>

            
            <WishlistGrid wishlistItems={wishlistItems} user={user} />
        </div>
    );
}