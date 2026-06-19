'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { ExternalLink, Receipt } from 'lucide-react';

const PurchaseTable = ({ purchases }) => {

   
    if (!purchases || purchases.length === 0) {
        return (
            <div className="w-full rounded-3xl border border-dashed border-[#CFE1B9] bg-[#F9FBF6] p-12 text-center shadow-sm">
                <Receipt className="mx-auto text-[#97A97C] mb-4 w-12 h-12 opacity-50" />
                <h3 className="text-xl font-bold text-zinc-900 mb-2">No Transactions Found</h3>
                <p className="text-zinc-500">Your purchase history will appear here once you acquire an artwork.</p>
            </div>
        );
    }

    
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-[#F4F7F0] text-[#718355] text-sm uppercase tracking-wider font-bold border-b border-[#CFE1B9]/50">
                            <th className="p-5 font-semibold">Artwork</th>
                            <th className="p-5 font-semibold">Transaction ID</th>
                            <th className="p-5 font-semibold">Date</th>
                            <th className="p-5 font-semibold text-right">Amount</th>
                            <th className="p-5 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CFE1B9]/30">
                        {purchases.map((txn) => (
                            <tr key={txn._id} className="hover:bg-[#F9FBF6] transition-colors duration-200">
                                
                               
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 border border-[#CFE1B9]/30">
                                            {txn.imageUrl ? (
                                                <img 
                                                    src={txn.imageUrl} 
                                                    alt={txn.artworkTitle} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#E9F5DB]"></div>
                                            )}
                                        </div>
                                        <span className="font-bold text-zinc-900 line-clamp-1">{txn.artworkTitle}</span>
                                    </div>
                                </td>

                        
                                <td className="p-5">
                                    <span className="text-xs font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-md">
                                        {txn.sessionId ? `${txn.sessionId.substring(0, 18)}...` : 'N/A'}
                                    </span>
                                </td>

                              
                                <td className="p-5 text-zinc-600 font-medium whitespace-nowrap">
                                    {new Date(txn.purchaseDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>

                            
                                <td className="p-5 text-right font-black text-[#718355]">
                                    ${txn.price}
                                </td>

                           
                                <td className="p-5 text-center">
                                    <Link href={`/artworks/${txn.artworkId}`}>
                                        <Button size="sm" className="bg-[#E9F5DB] text-[#718355] hover:bg-[#CFE1B9] font-bold rounded-lg transition-colors">
                                            View <ExternalLink size={14} className="ml-1" />
                                        </Button>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PurchaseTable;