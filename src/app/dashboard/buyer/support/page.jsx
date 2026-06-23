import React from 'react';
import SupportTicketContainer from '@/Components/support/SupportTicketContainer';
import { getUserSession } from '@/lib/core/session';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata = {
    title: 'Support Center | ArtHub',
};

const getAuthToken = async () => {
    const authData = await auth.api.getToken({
        headers: await headers()
    });
    return authData?.token; 
}

export default async function SupportTicketPage() {
    const user = await getUserSession();

    if (!user) {
        return <div className="p-8 text-center text-red-500 font-bold">Please log in to access support.</div>;
    }

 
    const token = await getAuthToken();
    let initialTickets = [];

    

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support/${user.email}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (res.ok) {
            initialTickets = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch tickets:", error);
    }

    return (
        <div className="w-full max-w-5xl mx-auto pt-6">
            <div className="mb-8 px-2 md:px-0">
                <h1 className="text-3xl md:text-4xl font-black text-[#11140E] mb-2">
                  ArtHub -  Support Center
                </h1>
                <p className="text-gray-500 font-medium">
                    Submit requests and track your ongoing support communications.
                </p>
            </div>
            
            
            <SupportTicketContainer 
                user={user} 
                initialTickets={initialTickets} 
           
            />
        </div>
    );
}