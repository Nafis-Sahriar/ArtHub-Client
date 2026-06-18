import { getUserSession } from '@/lib/core/session';
import { getArtworkById } from '@/lib/api/artworks'; // Import your existing fetcher
import { redirect } from 'next/navigation';
import React from 'react';
import BuynowForm from './BuynowForm';

const BuyPage = async ({params}) => {
    const resolvedParams = await params;
    const id = resolvedParams.id;

   
    const [user, artwork] = await Promise.all([
        getUserSession(),
        getArtworkById(id)
    ]);

    
    if (!user) {
        redirect(`/login?redirect=/artworks/${id}/buy`);
    }

    
    if (!artwork) {
        return (
            <div className="p-10 text-center text-red-600 font-bold">
                Artwork not found.
            </div>
        );
    }

  
    if (artwork.status !== 'available') {
        return (
            <div className="p-10 text-center text-gray-600 font-bold">
                Sorry, this artwork has already been sold!
            </div>
        );
    }


    if (user.id === artwork.artistId) { 
        return (
            <div className="max-w-2xl mx-auto mt-10 w-full rounded-3xl border border-yellow-200 bg-yellow-50 p-10 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-yellow-800 mb-3">Wait a minute!</h3>
                <p className="text-yellow-700">
                    You cannot purchase your own masterpiece.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-6">
          
            <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4">Secure Checkout</h1>
            <p className="mb-8">Purchasing: <strong>{artwork.title}</strong></p>
            </div>
            
            {/* Here is where your form will go! */}
            <BuynowForm user={user} artwork={artwork} />
        </div>
    );
};

export default BuyPage;