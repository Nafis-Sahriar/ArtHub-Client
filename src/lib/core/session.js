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