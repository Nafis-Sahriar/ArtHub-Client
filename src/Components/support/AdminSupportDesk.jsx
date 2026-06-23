"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { CheckCircle2, Clock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AdminSupportDesk({ tickets = [] }) {

    const router = useRouter();
    const [processingId, setProcessingId] = useState(null);

    const handleMarkResolved = async (ticketId) => {

        setProcessingId(ticketId);

        const loadingToast = toast.loading("Updating ticket status...");
        
        const {data:tokenData} = await authClient.token();
        const token = tokenData?.token;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support/${ticketId}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "resolved" })
            });

            const result = await res.json();
            toast.dismiss(loadingToast);

            if (res.ok && result.success) {
                toast.success("Ticket marked as resolved!");
                router.refresh(); 
            } else {
                throw new Error(result.message || "Failed to update ticket.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred.");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="w-full rounded-3xl border border-[#CFE1B9]/50 bg-white p-6 md:p-8 shadow-sm">
            <div className="mb-6 border-b border-[#CFE1B9]/30 pb-4">
                <h3 className="text-xl font-bold text-[#718355]">Platform Support Queue</h3>
                <p className="text-sm text-gray-500">Manage and resolve user issues.</p>
            </div>

            {tickets.length === 0 ? (
                <div className="text-center py-10 text-gray-400">No support tickets in the queue.</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {tickets.map((ticket) => {
                        const isPending = ticket.status === "pending";
                        
                        return (
                            <div 
                                key={ticket._id} 
                                className={`p-5 rounded-2xl border transition-all ${
                                    isPending 
                                        ? "bg-white border-[#CFE1B9] shadow-sm" 
                                        : "bg-gray-50 border-gray-200 opacity-70"
                                }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    
                               
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest ${
                                                isPending ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                                            }`}>
                                                {isPending ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                                                {ticket.status}
                                            </span>
                                            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                                {ticket.category}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {new Date(ticket.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-lg font-bold text-zinc-900">{ticket.title}</h4>
                                            <p className="text-sm text-zinc-600 mt-1 whitespace-pre-wrap">{ticket.description}</p>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 pt-2 border-t border-gray-100">
                                            <span className="flex items-center gap-1.5"><User size={14} /> {ticket.name} ({ticket.role})</span>
                                            <span className="flex items-center gap-1.5"><Mail size={14} /> {ticket.email}</span>
                                        </div>
                                    </div>

                              
                                    <div className="shrink-0 flex items-center md:pt-4">
                                        {isPending ? (
                                            <Button
                                                color="success"
                                                variant="flat"
                                                isLoading={processingId === ticket._id}
                                                onPress={() => handleMarkResolved(ticket._id)}
                                                className="w-full md:w-auto font-bold bg-[#E9F5DB] text-[#4A5D23] hover:bg-[#CFE1B9]"
                                            >
                                                Mark as Resolved
                                            </Button>
                                        ) : (
                                            <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                                <CheckCircle2 size={16} /> Resolved
                                            </span>
                                        )}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}