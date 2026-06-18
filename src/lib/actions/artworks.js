'use server'

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";


export const createArtwork = async(artworkData) => {
    try{
        const res = await fetch(`${baseURL}/api/artworks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artworkData)
        });
        const data = await res.json();
        return data;
    } 
    catch (error) 
    {
        console.error("Error creating artwork:", error);
        throw error;
    }
}