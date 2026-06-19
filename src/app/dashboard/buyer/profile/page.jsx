import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import ProfileForm from './ProfileForm';
import { UserCircle } from 'lucide-react';



const BuyerProfilePage = async () => {
    // Fetch User Session
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
                    <h1 className="text-3xl font-extrabold text-zinc-900">Profile Settings</h1>
                    <p className="text-zinc-500 mt-1">Update your personal information and public display details.</p>
                </div>
            </div>

       
            <ProfileForm user={user} />
        </div>
    );
};

export default BuyerProfilePage;