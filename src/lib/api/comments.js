'use server';

import { headers } from "next/headers";
import { auth } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const getAuthToken = async () => {
    const authData = await auth.api.getToken({
        headers: await headers()
    });
    return authData?.token; 
}

export const getCommentsByArtworkId = async (artworkId) => {
    const token = await getAuthToken();
    try {
        const res = await fetch(`${baseURL}/api/comments/${artworkId}`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed to fetch comments");
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const postComment = async (commentData) => {
    const token = await getAuthToken();
    try {
        const res = await fetch(`${baseURL}/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(commentData)
        });
        if (!res.ok) throw new Error("Failed to post comment");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Add to your existing src/lib/api/comments.js file

export const updateComment = async (commentId, updatedText, userId) => {
    const token = await getAuthToken();
    try {
        const res = await fetch(`${baseURL}/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ comment: updatedText, userId })
        });
        if (!res.ok) throw new Error("Failed to update comment");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteComment = async (commentId, userId) => {
    const token = await getAuthToken();
    try {
        const res = await fetch(`${baseURL}/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });
        if (!res.ok) throw new Error("Failed to delete comment");
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};