import React from 'react';
import CommunityFeed from '@/Components/community/CommunityFeed';
import { getUserSession } from '@/lib/core/session';

export const metadata = {
    title: 'Community Lounge | ArtHub',
};

export default async function CommunityPage() {

    const user = await getUserSession();
    let initialPosts = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/posts`, {
            cache: 'no-store' 
        });
        if (res.ok) {
            initialPosts = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch initial posts:", error);
    }

    return (
        <div className="w-full">
            <CommunityFeed user={user} initialPosts={initialPosts} />
        </div>
    );
}