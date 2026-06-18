import { auth } from "../auth";
import { headers } from "next/headers"; // Import Next.js headers

export const getUserSession = async () => {
    try {
        // Pass the headers so BetterAuth can read the session cookie
        const session = await auth.api.getSession({
            headers: await headers() // Note: await is required here in newer Next.js versions
        });
        
        return session?.user || null; // Return the user object or null if no session
    }
    catch(error) 
    {
        console.error("Error fetching user session:", error);
        return null; // Return null instead of throwing, so your page doesn't crash if logged out
    }
}