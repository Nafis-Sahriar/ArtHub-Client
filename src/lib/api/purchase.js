//in this file, I will fetch the purchase data.

import { serverFetch } from "../core/server";

export const getPurchasesByBuyer = async(buyerId)=>{
    return serverFetch(`/api/purchases?buyerId=${buyerId}`);
}