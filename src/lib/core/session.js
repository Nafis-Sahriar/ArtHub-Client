import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers"; 

export const getUserSession = async () => {
    try {
        
        const session = await auth.api.getSession({
            headers: await headers() 
        });
        
        return session?.user || null; 
    }
    catch(error) 
    {
        console.error("Error fetching user session:", error);
        return null; 
    }
}


export const requireRole = async(role)=>{
    const user = await getUserSession();

    if ( user.role !== role) {
        redirect('/unauthorized');
    }
}