'use client';
import React from 'react';
import { Check, Star, Briefcase, Person } from '@gravity-ui/icons';

import { authClient } from '@/lib/auth-client';

const PricingPage = () => {
    
    const { data: session, isPending } = authClient.useSession();
    
   const userData = session?.user;
    const user = userData ? {
        name: userData.name,
        email: userData.email,
        imageUrl: userData.image,
        role: userData.role || 'buyer',
        plan: userData.plan || 'buyer_free' 
    } : null;

    const plans = [
        {
            name: 'Free',
            id: 'buyer_free',
            price: '$0',
            period: '/forever',
            description: 'The foundation for your artistic journey.',
            icon: <Person className="w-6 h-6 text-[#718355]" />,
            features: ['3 paintings allowance', 'Public gallery access', 'Standard support'],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Premium', 
            id: 'buyer_premium',
            price: '$19.99',
            period: '/month',
            description: 'Uncapped potential for elite creators.',
            icon: <Star className="w-6 h-6 text-[#718355]" />,
            features: ['Unlimited paintings', 'Priority support', 'Advanced analytics', 'Custom branding'],
            cta: 'Go Premium',
            popular: true 
        },
        {
            name: 'Pro',
            id: 'buyer_pro',
            price: '$9.99',
            period: '/month',
            description: 'Expanded allocation for growing portfolios.',
            icon: <Briefcase className="w-6 h-6 text-[#718355]" />,
            features: ['9 paintings allowance', 'Full tracking', 'Performance metrics', 'Email support'],
            cta: 'Upgrade to Pro',
            popular: false
        }
    ];

    return (
        <div className="w-full min-h-screen bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
               
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-[#718355] tracking-tight">Subscription Tier Overview</h1>
                    <p className="text-[#97A97C] mt-4">Select the plan that best fits your artistic growth.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-24">
                    {plans.map((plan, idx) => {
                        
                        const isCurrentPlan = user?.plan === plan.id;

                        return (
                            <div
                                key={idx}
                                className={`relative border rounded-3xl p-8 flex flex-col min-h-[500px] transition-all duration-300 ${
                                    plan.popular
                                        ? 'border-[#718355] bg-[#F9FBF6] shadow-2xl scale-105 z-10'
                                        : 'border-[#CFE1B9] bg-white hover:shadow-lg'
                                }`}
                            >
                                {plan.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold text-white bg-[#718355] rounded-full uppercase tracking-wider shadow-md">
                                        Recommended
                                    </span>
                                )}

                                <div className="flex-grow">
                                    <div className="mb-4 bg-[#E9F5DB] w-fit p-3 rounded-xl">{plan.icon}</div>
                                    <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                                    
                              
                                    {isPending ? (
                                        <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-lg my-6"></div>
                                    ) : !user ? (
                                        <div className="text-sm italic text-gray-500 my-6 flex items-center min-h-[48px]">
                                            Log in to view pricing
                                        </div>
                                    ) : (
                                        <div className="text-5xl font-black my-6 text-[#718355]">
                                            {plan.price} 
                                            <span className="text-lg text-gray-400 font-normal ml-1">{plan.period}</span>
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((f, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-700">
                                                <Check className="w-4 h-4 text-[#718355]" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                
                                {isPending ? (
                                    <div className="w-full py-6 bg-gray-200 animate-pulse rounded-xl"></div>
                                ) : !user ? (
                                    <button disabled className="w-full py-4 rounded-xl font-bold bg-gray-100 text-gray-400 cursor-not-allowed border border-[#CFE1B9]">
                                        Log in to Subscribe
                                    </button>
                                ) : isCurrentPlan ? (
                                    <button disabled className="w-full py-4 rounded-xl font-bold bg-[#E9F5DB] text-[#718355] cursor-not-allowed border border-[#CFE1B9]">
                                        Current Plan
                                    </button>
                                ) : (
                                    <form action="/api/checkout_sessions" method="POST">
                                        <input type="hidden" name="plan_Id" value={plan.id} />
                                        <section>
                                            <button type="submit" role="link" 
                                            className={`w-full py-4 rounded-xl font-bold transition ${
                                         plan.popular 
                                                    ? 'bg-[#718355] text-white hover:bg-[#87986A]' 
                                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                                            }`}>
                                                Checkout
                                            </button>
                                        </section>
                                    </form>
                                )}

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;