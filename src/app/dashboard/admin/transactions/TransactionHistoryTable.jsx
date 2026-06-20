"use client";
import React from 'react';
import { Chip } from '@heroui/react';
import { Receipt, Repeat, ArrowDownUp } from 'lucide-react';

const TransactionHistoryTable = ({ transactions = [] }) => {
    
    
    const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F4F7F0] border-b border-[#CFE1B9]/50">
                            <th className="py-4 px-6 font-bold text-zinc-700">Transaction ID</th>
                            <th className="py-4 px-6 font-bold text-zinc-700">Type & Details</th>
                            <th className="py-4 px-6 font-bold text-zinc-700">User Email</th>
                            <th className="py-4 px-6 font-bold text-zinc-700">Date</th>
                            <th className="py-4 px-6 font-bold text-zinc-700 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CFE1B9]/30">
                        {transactions.map((transaction, index) => (
                            <tr key={transaction.id || index} className="hover:bg-zinc-50/50 transition-colors">
                                
                             
                                <td className="py-4 px-6">
                                    <span className="font-mono text-xs text-zinc-500 bg-gray-100 px-2 py-1 rounded-md">
                                        {transaction.id?.substring(0, 12)}...
                                    </span>
                                </td>

                                
                                <td className="py-4 px-6">
                                    <div className="flex flex-col gap-1 items-start">
                                        {transaction.type === 'Purchase' ? (
                                            <Chip size="sm" className="bg-[#E9F5DB] text-[#718355] border border-[#CFE1B9] font-bold px-2">
                                                <span className="flex items-center gap-1.5">
                                                    <Receipt size={12} /> Purchase
                                                </span>
                                            </Chip>
                                        ) : (
                                            <Chip size="sm" className="bg-blue-50 text-blue-600 border border-blue-200 font-bold px-2">
                                                <span className="flex items-center gap-1.5">
                                                    <Repeat size={12} /> Subscription
                                                </span>
                                            </Chip>
                                        )}
                                        <span className="text-xs text-zinc-500 font-medium mt-1">{transaction.details}</span>
                                    </div>
                                </td>

                            
                                <td className="py-4 px-6">
                                    <p className="font-medium text-zinc-700">{transaction.email}</p>
                                </td>

                            
                                <td className="py-4 px-6">
                                    <p className="text-sm text-zinc-600">{formatDate(transaction.date)}</p>
                                </td>

                               
                                <td className="py-4 px-6 text-right">
                                    <p className="font-extrabold text-zinc-900 text-lg">
                                        ${Number(transaction.amount).toFixed(2)}
                                    </p>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

                {transactions.length === 0 && (
                    <div className="p-12 text-center text-zinc-500">
                        <ArrowDownUp size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">No transactions found.</p>
                        <p className="text-sm">There is no financial history recorded yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistoryTable;