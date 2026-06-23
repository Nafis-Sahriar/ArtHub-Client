import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, FileText, Mail, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const policyClauses = [
        {
            icon: Database,
            title: "1. Information We Collect",
            content: "When you interact with ArtHub as a collector or creator, we collect identifiers including your full legal name, email address, physical delivery address, and profile avatars. We also collect automated platform analytics such as your IP address, browser type, and engagement metrics with specific artworks."
        },
        {
            icon: Lock,
            title: "2. Payment & Financial Data",
            content: "All monetary transactions on ArtHub are securely tokenized and processed through our certified third-party partner, Stripe. ArtHub never directly stores or intercepts your credit card numbers or banking passwords. We only retain encrypted payment confirmation tokens, billing addresses, and artist payout routing IDs."
        },
        {
            icon: FileText,
            title: "3. How We Use Your Data",
            content: "Your data is strictly utilized to power the core ArtHub experience: facilitating secure artwork transactions, generating shipping manifests for creators, sending order status notifications, protecting the platform against fraudulent accounts, and routing payouts."
        },
        {
            icon: Eye,
            title: "4. Third-Party Data Sharing",
            content: "We do not sell, rent, or trade your personal information to data brokers. Information is only shared with essential infrastructure partners: payment gateways (Stripe), secure cloud image hosting, and international shipping carriers to get your canvas safely to your door."
        },
        {
            icon: Shield,
            title: "5. Your Privacy Rights",
            content: "Depending on your jurisdiction, you hold the right to request a full export of the personal data ArtHub holds on you, request corrections to inaccurate profile info, or exercise your right to be forgotten by initiating a complete, permanent account deletion."
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#11140E] text-white pt-28 pb-24 selection:bg-[#CFE1B9] selection:text-[#11140E]">
            
            
            <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#718355]/15 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#CFE1B9]/10 blur-[150px] pointer-events-none" />

            <div className="relative z-10 mx-auto w-[90%] max-w-4xl">
                
                
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#97A97C] hover:text-[#CFE1B9] transition-colors text-sm font-semibold">
                        <ArrowLeft size={16} />
                        <span>Return to Gallery</span>
                    </Link>
                </div>

          
                <div className="text-center md:text-left mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#718355]/20 border border-[#718355]/30 text-[#CFE1B9] mb-4 text-xs font-bold uppercase tracking-widest">
                        Legal & Compliance
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
                        Privacy <span className="bg-gradient-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-transparent">Policy</span>
                    </h1>

                    <p className="text-gray-400 text-sm sm:text-base font-medium">
                        Effective Date: June 2026 • Honoring the trust of our creators and collectors.
                    </p>
                </div>

                
                <div className="space-y-6">
                    {policyClauses.map((clause, index) => {
                        const Icon = clause.icon;

                        return (
                            <div 
                                key={index} 
                                className="rounded-[2rem] border border-[#CFE1B9]/10 bg-white/5 p-8 sm:p-10 backdrop-blur-md transition-all duration-300 hover:border-[#CFE1B9]/25 hover:bg-white/10"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#718355]/20 border border-[#718355]/40 flex items-center justify-center text-[#CFE1B9] shrink-0">
                                        <Icon size={22} />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                        {clause.title}
                                    </h2>
                                </div>

                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base pl-0 sm:pl-16">
                                    {clause.content}
                                </p>
                            </div>
                        );
                    })}
                </div>

                
                <div className="mt-12 rounded-[2rem] border border-[#CFE1B9]/20 bg-[#718355]/10 p-8 text-center">
                    <Mail className="mx-auto mb-3 text-[#CFE1B9]" size={28} />
                    <h3 className="text-lg font-bold text-white mb-1">Questions regarding your personal data?</h3>
                    <p className="text-sm text-gray-400 mb-4">Our Data Protection Officer is available to assist you with data exports or deletions.</p>
                    <a href="mailto:privacy@arthub.com" className="font-bold text-[#CFE1B9] hover:underline text-sm tracking-wide">
                        privacy@arthub.com
                    </a>
                </div>

            </div>
        </div>
    );
}