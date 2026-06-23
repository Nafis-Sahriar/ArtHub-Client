import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUserSession } from '@/lib/core/session';
import { getPlanById } from '@/lib/api/plans';
import { getPurchasesByBuyer } from '@/lib/api/purchase';
import { CreditCard, Crown, ShieldCheck, Zap } from 'lucide-react';

const BuyerBillingPage = async () => {
  
    const session = await getUserSession();
    if (!session) {
        redirect('/login');
    }
    const user = session;

   
    const [plan, purchases] = await Promise.all([
        getPlanById(user?.plan || 'buyer_free'),
        getPurchasesByBuyer(user.id)
    ]);

    const purchaseCount = purchases.length;
    const isPremium = plan.isUnlimited; 
    
   
    const usagePercentage = isPremium 
        ? 100 
        : Math.min((purchaseCount / plan.maxPurchasesPerMonth) * 100, 100);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
      
            <div className="flex items-center gap-4 border-b border-[#CFE1B9]/30 pb-6">
                <div className="w-12 h-12 bg-[#E9F5DB] rounded-2xl flex items-center justify-center text-[#718355] shadow-sm">
                    <CreditCard size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900">Subscription & Billing</h1>
                    <p className="text-zinc-500 mt-1">Manage your collector tier, view your quotas, and upgrade your access.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
                <div className={`relative overflow-hidden rounded-3xl border p-8 shadow-sm ${
                    isPremium 
                        ? 'bg-linear-to-br from-[#718355] to-[#4A5D23] border-[#718355] text-white' 
                        : 'bg-white border-[#CFE1B9]/50 text-zinc-900'
                }`}>
                    
                    <Crown className={`absolute -bottom-6 -right-6 w-48 h-48 opacity-5 ${isPremium ? 'text-white' : 'text-[#718355]'}`} />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            {isPremium ? <Crown className="text-yellow-400" size={24}/> : <ShieldCheck className="text-[#718355]" size={24}/>}
                            <h2 className="text-sm font-bold uppercase tracking-wider opacity-80">Current Plan</h2>
                        </div>
                        
                        <h3 className="text-4xl font-black mb-4">
                            {plan.name || 'Free Tier'}
                        </h3>
                        
                        <ul className={`space-y-3 mb-8 ${isPremium ? 'text-zinc-200' : 'text-zinc-500'}`}>
                            <li className="flex items-center gap-2">
                                <Zap size={16} className={isPremium ? "text-yellow-400" : "text-[#718355]"} />
                                {isPremium ? 'Unlimited masterpiece acquisitions' : `Limit of ${plan.maxPurchasesPerMonth} purchases per month`}
                            </li>
                            <li className="flex items-center gap-2">
                                <Zap size={16} className={isPremium ? "text-yellow-400" : "text-[#718355]"} />
                                Priority customer support
                            </li>
                        </ul>

                       
                        {!isPremium ? (
                            <Link href="/plans" className="inline-block w-full text-center bg-[#718355] hover:bg-[#5A6B42] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-[#718355]/20">
                                Upgrade Plan
                            </Link>
                        ) : (
                            <button disabled className="w-full bg-white/20 text-white font-bold py-4 rounded-xl cursor-not-allowed border border-white/10 backdrop-blur-sm">
                                Highest Tier Active
                            </button>
                        )}
                    </div>
                </div>

             
                <div className="bg-white rounded-3xl border border-[#CFE1B9]/50 p-8 shadow-sm flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-zinc-900 mb-6">Monthly Acquisition Quota</h3>
                    
                    <div className="mb-4 flex justify-between items-end">
                        <div>
                            <span className="text-4xl font-black text-[#718355]">{purchaseCount}</span>
                            <span className="text-lg text-zinc-400 font-medium ml-1">
                                / {isPremium ? '∞' : plan.maxPurchasesPerMonth} artworks
                            </span>
                        </div>
                        <span className="text-sm font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                            {isPremium ? 'Unlimited' : `${100 - Math.round(usagePercentage)}% Remaining`}
                        </span>
                    </div>

                
                    <div className="w-full h-4 bg-[#F4F7F0] rounded-full overflow-hidden border border-[#CFE1B9]/30 relative">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                                isPremium 
                                    ? 'bg-linear-to-r from-yellow-400 to-[#718355]' 
                                    : usagePercentage >= 100 
                                        ? 'bg-red-500' 
                                        : 'bg-[#718355]'
                            }`}
                            style={{ width: `${usagePercentage}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-zinc-500 mt-6 leading-relaxed">
                        {isPremium 
                            ? "You have no restrictions. Feel free to collect as many masterpieces as you desire."
                            : "Your quota resets at the beginning of each billing cycle. Upgrade to Premium to remove all limits."
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BuyerBillingPage;