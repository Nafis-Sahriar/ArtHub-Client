//in this file, I will fetch the purchase data.

import { headers } from "next/headers";
import { auth } from "../auth";
import { protectedServerFetch, serverFetch } from "../core/server";

export const getPurchasesByBuyer = async(buyerId)=>{

       const token = await auth.api.getToken({
            headers: await headers()
         })
    
         console.log("Token for fetching artist Buyer:", token.token);

    return protectedServerFetch(`/api/purchases?buyerId=${buyerId}`);
}

// used protectedServerFetch for user. passing JWT Session token.