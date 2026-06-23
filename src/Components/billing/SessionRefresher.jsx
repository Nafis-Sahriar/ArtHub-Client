"use client";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SessionRefresher({ planId }) {
    const router = useRouter();

    useEffect(() => {
        const syncSessionCookie = async () => {
            try {
                
                await authClient.updateUser({
                    plan: planId
                });
                
                router.refresh(); 
            } catch (error) {
                console.error("Failed to sync session cookie:", error);
            }
        };

        if (planId) {
            syncSessionCookie();
        }
    }, [planId, router]);

    return null; 
}