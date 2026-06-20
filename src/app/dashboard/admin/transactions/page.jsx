import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import TransactionHistoryTable from './TransactionHistoryTable';

const TransactionHistoryPage = async () => {
    
    const session = await getUserSession();
    if (!session || session.role !== 'admin') {
        redirect('/dashboard/unauthorized');
    }

   
    const [purchases, subscriptions] = await Promise.all([
        serverFetch('/api/purchases'),
        serverFetch('/api/subscriptions')
    ]);

   
    const getSubscriptionPrice = (planId) => {
        if (planId === 'buyer_premium') return 19.99;
        if (planId === 'buyer_pro') return 9.99;
        return 0; 
    };

    
    const formattedPurchases = (purchases || []).map(p => ({
        id: p._id || p.id,
        type: 'Purchase',
        email: p.buyerEmail,
        amount: p.price,
        date: p.purchaseDate,
        details: `Artwork: ${p.artworkTitle}`
    }));

    const formattedSubscriptions = (subscriptions || []).map(s => ({
        id: s._id || s.id,
        type: 'Subscription',
        email: s.email,
        amount: getSubscriptionPrice(s.planId),
        date: s.createdAt,
        details: `Plan: ${s.planId.replace('_', ' ').toUpperCase()}`
    }));

   
    const allTransactions = [...formattedPurchases, ...formattedSubscriptions];

    
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="p-2 sm:p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Platform Transactions</h1>
                <p className="text-lg text-zinc-500">
                    View a unified history of all artwork purchases and user subscriptions.
                </p>
            </div>

            
            <TransactionHistoryTable transactions={allTransactions} />
        </div>
    );
};

export default TransactionHistoryPage;