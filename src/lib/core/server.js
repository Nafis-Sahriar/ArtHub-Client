const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseURL}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: data ? JSON.stringify(data) : undefined
    });

    return res.json();
}
