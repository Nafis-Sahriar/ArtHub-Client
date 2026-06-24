"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAuthToken = async () => {
    const authData = await auth.api.getToken({
        headers: await headers()
    });
    return authData?.token; 
}


export const protectedServerFetch = async (path) => {
    const token = await getAuthToken();
    
    const res = await fetch(`${baseURL}${path}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    return res.json();
}

export const serverFetch = async (path) => {
    const token = await getAuthToken();
    
    const res = await fetch(`${baseURL}${path}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
}

export const serverMutation = async (path, data, method = 'POST') => {
    const token = await getAuthToken();
    
    const res = await fetch(`${baseURL}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data ? JSON.stringify(data) : undefined
    });

    return res.json();
}