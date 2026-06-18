'use server'

import { serverMutation } from "../core/server";
import { revalidatePath } from 'next/cache';





export const createArtwork = async (artworkData) => {
    try {
  
        const data = await serverMutation('/api/artworks', artworkData);
        return data;
    } 
    catch (error) 
    {
        console.error("Error creating artwork:", error);
        throw error;
    }
}



export const updateArtwork = async (id, updatedData) => {
    try {
        const data = await serverMutation(`/api/artworks/${id}`, updatedData, 'PATCH');
        
       
        revalidatePath('/dashboard/artist/arts');
        revalidatePath(`/dashboard/artist/arts/${id}`);
        
        return data;
    } 
    catch (error) 
    {
        console.error("Error updating artwork:", error);
        throw error;
    }
}

export const deleteArtwork = async (id) => {
    try {
      
        const data = await serverMutation(`/api/artworks/${id}`, null, 'DELETE');
        
      
        revalidatePath('/dashboard/artist/arts'); 
        
        return data;
    } catch (error) {
        console.error("Error deleting artwork:", error);
        throw error;
    }
}
