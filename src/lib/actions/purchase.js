'use server'
import { serverMutation } from "../core/server";

export const createPurchase = async(purchaseData) => {
    try {
     
        return await serverMutation('/api/purchases', purchaseData);
    } 
    catch(error) 
    {
        console.error("Error creating purchase:", error);
        throw error;
    }
}