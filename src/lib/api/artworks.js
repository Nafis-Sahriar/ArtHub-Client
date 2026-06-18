
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const getArtistArtworks = async(artistId, status="available") => {

    console.log("Fetching artworks for artistId:", artistId, "with status:", status);
    try{
        const res = await fetch(`${baseURL}/api/artworks?artistId=${artistId}&status=${status}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log("Fetched artworks data:", data);
        return data;
    }
    catch (error)
    {
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


export const getAllAvailableArtworks = async () => {
    try {
        const res = await fetch(`${baseURL}/api/artworks?status=available`, {
            cache: 'no-store' 
        });
        if (!res.ok) throw new Error("Failed to fetch public artworks");
        return await res.json();
    } catch (error) {
        console.error("Error fetching available artworks:", error);
        return [];
    }
}