import { getUserSession } from '@/lib/core/session';
import { getArtworkById } from '@/lib/api/artworks';
import { redirect } from 'next/navigation';
import React from 'react';
import BuynowForm from './BuynowForm';
import { getPurchasesByBuyer } from '@/lib/api/purchase';

const BuyPage = async ({ params }) => 
{
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const [user, artwork] = await Promise.all([
        getUserSession(),
        getArtworkById(id)
    ]);

    if (!user) 
    {
        redirect(`/login?redirect=/artworks/${id}/buy`);
    }

    if (!artwork) 
    {
        return <div className="p-10 text-center text-red-600 font-bold">Artwork not found.</div>;
    }

    if (artwork.status !== 'available')
    {
         return <div className="p-10 text-center text-gray-600 font-bold">Sorry, this artwork has already been sold!</div>;
    }

    const purchases = await getPurchasesByBuyer(user.id);

    const plan = { 
        name: "free", 
        maxPurchasesPerMonth: 3 
    };

    const purchaseCount = purchases.length;
    const isAtLimit = purchaseCount >= plan.maxPurchasesPerMonth;

    if (user.id === artwork.artistId) 
    {
        return (
            <div className="max-w-2xl mx-auto mt-10 w-full rounded-3xl border border-yellow-200 bg-yellow-50 p-10 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-yellow-800 mb-3">Wait!</h3>
                <p className="text-yellow-700">You cannot purchase your own masterpiece. How did you come here? There is no option to do so. Hah.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            {/* Simple Quota Header */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-10 flex justify-between items-center">
                <span className="text-zinc-600 font-medium">Monthly usage</span>
                <div className="text-xl font-black text-zinc-900">
                    {purchaseCount} <span className="text-zinc-400 font-medium">/ {plan.maxPurchasesPerMonth}</span>
                </div>
            </div>
          
            {!isAtLimit ? (
                <div className="animate-in fade-in duration-500">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-zinc-900 mb-4">Secure Checkout</h1>
                        <p className="text-zinc-500">Purchasing: <strong className="text-zinc-900">{artwork.title}</strong></p>
                    </div>
                    <BuynowForm user={user} artwork={artwork} />
                </div>
            ) : (
                <div className="max-w-xl mx-auto mt-10 rounded-3xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">
                    <h3 className="text-2xl font-bold text-red-800 mb-2">Purchase Limit Reached</h3>
                    <p className="text-red-700 mb-6">
                        You&apos;ve reached your monthly limit of {plan.maxPurchasesPerMonth} artworks.
                    </p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition">
                        View Premium Plans
                    </button>
                </div>
            )}
        </div>
    );
};

export default BuyPage;