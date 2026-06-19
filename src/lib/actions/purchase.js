'use server'
import { serverMutation } from "../core/server";

export const createPurchase = async(purchaseData) => {
    try {
        console.log("Sending purchase data to server:", purchaseData);
        return await serverMutation('/api/purchases', purchaseData);
        
    } 
    catch(error) 
    {
        console.error("Error creating purchase:", error);
        throw error;
    }
}