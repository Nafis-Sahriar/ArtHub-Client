import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home } from 'lucide-react';
import { Button } from '@heroui/react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#CFE1B9]/50 text-center overflow-hidden">
         
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#E9F5DB] rounded-full blur-3xl opacity-60"></div>

                <div className="relative z-10">
                   
                    <div className="mx-auto w-20 h-20 bg-red-50 flex items-center justify-center rounded-2xl mb-6 border border-red-100/50 shadow-sm">
                        <ShieldAlert className="size-10 text-red-500" strokeWidth={1.5} />
                    </div>

                    
                    <h1 className="text-3xl font-black text-zinc-900 mb-3 tracking-tight">
                        Access Denied
                    </h1>
                    <p className="text-zinc-500 mb-8 leading-relaxed text-sm sm:text-base">
                        Oops! It looks like you don not have the proper permissions to view this area. If you believe this is a mistake, please reach out to our support team.
                    </p>

                  
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/" className="w-full sm:w-auto">
                            <Button 
                                className="w-full bg-[#718355] hover:bg-[#5A6B42] text-white font-bold py-6 px-8 rounded-xl shadow-md shadow-[#718355]/20 transition-all"
                            >
                                <Home size={18} className="mr-2" />
                                Return Home
                            </Button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default UnauthorizedPage;