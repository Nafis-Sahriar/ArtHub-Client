import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';

import { UserCircle } from 'lucide-react';
import ArtistProfileForm from './ProfileForm';

const ArtistProfilePage = async () => {
    const user = await getUserSession();
    if (!user) {
        redirect('/login');
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4 border-b border-[#CFE1B9]/30 pb-6">
                <div className="w-12 h-12 bg-[#E9F5DB] rounded-2xl flex items-center justify-center text-[#718355] shadow-sm">
                    <UserCircle size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900">Artist Profile</h1>
                    <p className="text-zinc-500 mt-1">Manage your public artist identity and profile image.</p>
                </div>
            </div>

            <ArtistProfileForm user={user} />
        </div>
    );
};

export default ArtistProfilePage;