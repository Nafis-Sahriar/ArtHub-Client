import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import { TrendingUp, DollarSign, Package } from 'lucide-react';

const SalesHistoryPage = async () => {

    const session = await getUserSession();
    if (!session) redirect('/login');

    const user = session;

    
    const sales = await serverFetch(`/api/purchases?artistId=${user.id}`);

  
    const totalRevenue = sales.reduce((acc, sale) => acc + (sale.price || 0), 0);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
          
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#CFE1B9]/30 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900">Sales History</h1>
                    <p className="text-zinc-500 mt-1">Track your earnings and collector activity.</p>
                </div>
                
                <div className="flex gap-4">
                    <div className="bg-[#E9F5DB] p-4 rounded-2xl border border-[#CFE1B9]/50 flex items-center gap-3">
                        <div className="bg-[#718355] p-2 rounded-xl text-white">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#718355] uppercase">Total Revenue</p>
                            <p className="text-2xl font-black text-zinc-900">${totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-[#F4F7F0] text-[#718355] text-sm uppercase tracking-wider font-bold">
                                <th className="p-5">Artwork</th>
                                <th className="p-5">Buyer</th>
                                <th className="p-5">Date</th>
                                <th className="p-5 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#CFE1B9]/30">
                            {sales.length > 0 ? (
                                sales.map((sale) => (
                                    <tr key={sale._id} className="hover:bg-[#F9FBF6] transition-colors">
                                        <td className="p-5 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#CFE1B9]/30">
                                                <img src={sale.imageUrl} alt={sale.artworkTitle} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-bold text-zinc-900">{sale.artworkTitle}</span>
                                        </td>
                                        <td className="p-5 font-medium text-zinc-700">{sale.buyerName}</td>
                                        <td className="p-5 text-zinc-500">
                                            {new Date(sale.purchaseDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-5 text-right font-black text-[#718355]">${sale.price}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-zinc-500">
                                        No sales recorded yet. Keep creating!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesHistoryPage;