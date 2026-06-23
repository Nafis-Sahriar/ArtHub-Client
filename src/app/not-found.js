import React from 'react';
import Link from 'next/link';
import { ImageOff, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F7F0] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-sm border border-[#CFE1B9]/50 flex flex-col items-center">
    
        <div className="w-24 h-24 bg-[#E9F5DB] rounded-full flex items-center justify-center mb-6">
          <ImageOff size={48} className="text-[#718355]" />
        </div>
        
        <h1 className="text-6xl font-black text-[#11140E] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-[#4A5D23] mb-4">You lost in our gallery!</h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          We searched the entire gallery, but the page you are looking for seems to have been moved, deleted, or never existed in the first place.
        </p>
        
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link href="/artworks" className="w-full">
            <button className="w-full bg-[#718355] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#5A6B42] transition-colors shadow-md">
              Browse Artworks
            </button>
          </Link>
          <Link href="/" className="w-full">
            <button className="w-full bg-transparent border-2 border-[#CFE1B9] text-[#718355] py-3 px-6 rounded-xl font-bold hover:bg-[#E9F5DB] transition-colors flex items-center justify-center gap-2">
              <ArrowLeft size={18} /> Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}