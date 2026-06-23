import AdminSupportDesk from "@/Components/support/AdminSupportDesk";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserSession } from '@/lib/core/session'; 

const getAuthToken = async () => {
    const authData = await auth.api.getToken({
        headers: await headers()
    });
    return authData?.token; 
}

export default async function AdminSupportPage() {
  
    const user = await getUserSession();

    if (!user || user.role !== "admin") 
    {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
                <h2 className="text-2xl font-black text-red-500 mb-2">Access Restricted</h2>
                <p className="text-gray-500 font-medium">You must be an administrator to view the Support Queue.</p>
            </div>
        );
    }

    
    let tickets = [];
    
    try {
        const token = await getAuthToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support/admin/all`, {
            cache: 'no-store', 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (res.ok) {
            tickets = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch admin tickets:", error);
    }

    return (
        <div className="w-full max-w-6xl mx-auto pt-6 px-4">
            <h1 className="text-3xl font-black text-zinc-900 mb-6">Admin Support Desk</h1>
            <AdminSupportDesk tickets={tickets} />
        </div>
    );
}