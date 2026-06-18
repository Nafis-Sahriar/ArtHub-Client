import React from 'react';
import PostArtForm from './PostArtForm';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { HelpCircle } from 'lucide-react';

const NewArtPage = async () => {
    // 1. Fetch the real user session
    const user = await getUserSession();

    // 2. Security Check: Are they logged in?
    if (!user) {
        redirect('/login');
    }

    // 3. Role Check: Are they an artist?
    if (user.role !== 'artist') {
        return (
            <div className="w-full rounded-3xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">
                <HelpCircle className="text-red-500 mb-4 mx-auto" size={56} />
                <h3 className="text-2xl font-bold text-red-800 mb-3">
                    Access Denied
                </h3>
                <p className="text-red-700 max-w-md mx-auto">
                    Only registered artists have permission to post artworks to the marketplace.
                </p>
            </div>
        );
    }

    // 4. Map the BetterAuth user to the format your form expects
    const artistData = {
        ...user,
        _id: user.id, // BetterAuth uses 'id', but your MongoDB payload uses '_id'
        status: user.status || "approved", // Fallback if you haven't added status to your auth schema yet
    };

    return (
        <div className="w-full">
            <PostArtForm artist={artistData} />
        </div>
    );
};

export default NewArtPage;