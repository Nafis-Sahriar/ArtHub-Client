
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const getArtistArtworks = async (artistId) => {
    try {
        const res = await fetch(`${baseURL}/api/artworks?artistId=${artistId}`);
        if (!res.ok) throw new Error("Failed to fetch artworks");
        return await res.json();
    } catch (error) {
        console.error("Error fetching artist artworks:", error);
        throw error;
    }
}

export const getArtworkById = async (id) => {
    try {
        
        const res = await fetch(`${baseURL}/api/artworks/${id}`, {
            cache: 'no-store'
        });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch artwork details`);
        }
        
        return await res.json();
    } catch (error) {
        console.error("Error fetching artwork by ID:", error);
        return null; 
    }
}


export const getAllAvailableArtworks = async (queryString = "") => {
    try {
        const url = queryString 
            ? `${baseURL}/api/artworks?${queryString}` 
            : `${baseURL}/api/artworks`;
            
        const res = await fetch(url, {
            cache: 'no-store' 
        });
        
        if (!res.ok) throw new Error("Failed to fetch public artworks");
        
        // This will return the array from your backend
        return await res.json();
    } catch (error) {
        console.error("Error fetching available artworks:", error);
        return []; // Fallback to an empty array so the app doesn't crash
    }
}