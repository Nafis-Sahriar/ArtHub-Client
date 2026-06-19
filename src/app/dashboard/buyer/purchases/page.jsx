import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import PurchaseTable from './PurchaseTable';
import { ReceiptText } from 'lucide-react'; 

const BuyerPurchasesPage = async () => {
   
    const session = await getUserSession();

    if (!session) {
        redirect('/login');
    }

    const user = session;

    
    const purchases = await serverFetch(`/api/purchases?buyerId=${user.id}`);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex items-center gap-4 border-b border-[#CFE1B9]/30 pb-6">
                <div className="w-12 h-12 bg-[#E9F5DB] rounded-2xl flex items-center justify-center text-[#718355] shadow-sm">
                    <ReceiptText size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900">Purchase History</h1>
                    <p className="text-zinc-500 mt-1">A complete financial record of your acquired masterpieces.</p>
                </div>
            </div>

           
            <PurchaseTable purchases={purchases} />
        </div>
    );
};

export default BuyerPurchasesPage;