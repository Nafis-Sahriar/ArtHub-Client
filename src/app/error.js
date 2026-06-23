"use client"; 
import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  

  useEffect(() => {
    console.error("ArtHub Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F4F7F0] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-sm border border-[#CFE1B9]/50 flex flex-col items-center border-t-8 border-t-red-400">
        
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={40} className="text-red-400" />
        </div>
        
        <h1 className="text-3xl font-black text-[#11140E] mb-3">Oops!</h1>
        <h2 className="text-lg font-bold text-[#718355] mb-4">A brushstroke went wrong.</h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
          Something unexpected happened on our end. Don&apos;t worry, our digital curators have been notified.
        </p>
        
        <div className="flex flex-col gap-3 w-full">
         
          <button 
            onClick={() => reset()}
            className="w-full bg-[#718355] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#5A6B42] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <RefreshCcw size={18} /> Try Again
          </button>
          
          <Link href="/" className="w-full">
            <button className="w-full bg-transparent text-gray-500 hover:text-[#11140E] py-3 px-6 rounded-xl font-semibold transition-colors underline-offset-4 hover:underline">
              Return to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}