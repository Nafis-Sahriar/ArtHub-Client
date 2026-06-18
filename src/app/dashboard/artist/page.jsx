'use client';
import StatsCards from '@/Components/dashboard/StatsCard';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const ArtistHomePage = () => {


    const {data:session, isPending} = useSession();

    if(isPending) {
        return <div>Loading...</div>;
    }
    const user = session?.user;
    console.log("User session data:", user);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "Artist"}!</h1>
            <p className="text-lg text-gray-600">
                This is your artist dashboard where you can manage your artworks, view sales history, and update your profile.
            </p>
            <div className="mt-6">
                <StatsCards user={user} />
            </div>
            
        </div>
    );
};

export default ArtistHomePage;