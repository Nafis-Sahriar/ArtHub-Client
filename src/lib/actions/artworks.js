'use server'

import { serverMutation } from "../core/server";

// Import your new core utility (adjust the path if your file is named differently)


export const createArtwork = async (artworkData) => {
    try {
        // serverMutation expects (path, data). 
        // It already handles the POST method, headers, and JSON stringifying!
        const data = await serverMutation('/api/artworks', artworkData);
        return data;
    } 
    catch (error) 
    {
        console.error("Error creating artwork:", error);
        throw error;
    }
}