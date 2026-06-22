
"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

   const token = await auth.api.getToken({
        headers: await headers()
     })

     // got token for overall server actions.
     // now I need to build a protected server fetch function.

export const protectedServerFetch = async(path)=>
{
  
    const res = await fetch(`${baseURL}${path}`, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    });
    return res.json();
}


    


export const serverFetch= async(path)=>{

    const res = await fetch(`${baseURL}${path}`,{
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    });
    return res.json();
}

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
