const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async(path, data)=>{
    const res = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // I will handle errors in the future, for now I just want to see the response


    return res.json();
}
