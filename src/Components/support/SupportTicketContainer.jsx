"use client";
import React, { useState } from "react";
import SupportTicketForm from "./SupportTicketForm";
import { Chip } from "@heroui/react";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SupportTicketContainer({ user, initialTickets = [] }) {
  const router = useRouter();

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return { bg: "bg-green-50 border-green-200 text-green-700", icon: <CheckCircle2 size={14} /> };
      case "open":
      case "pending":
        return { bg: "bg-yellow-50 border-yellow-200 text-yellow-700", icon: <Clock size={14} /> };
      default:
        return { bg: "bg-gray-50 border-gray-200 text-gray-700", icon: <AlertCircle size={14} /> };
    }
  };

  return (
    <div className="mx-auto max-w-5xl pb-12 space-y-8">
     
      <SupportTicketForm user={user} onTicketCreated={() => router.refresh()} />

    
      <div className="rounded-3xl border border-[#CFE1B9]/50 bg-white p-6 md:p-8 shadow-sm">
        <h4 className="text-lg font-bold text-zinc-800 mb-4">Your Open Communications</h4>
        
        {initialTickets.length === 0 ? (
          <p className="text-sm text-gray-400 italic py-4">You have no active support records on history logs.</p>
        ) : (
          <div className="divide-y divide-[#CFE1B9]/20">
            {initialTickets.map((ticket) => {
              const style = getStatusStyle(ticket.status);
              return (
                <div key={ticket._id || ticket.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-zinc-800 text-sm">{ticket.title}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {ticket.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 pr-4">{ticket.description}</p>
                    <span className="text-[10px] text-gray-400 block">
                      Opened: {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="shrink-0">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${style.bg}`}>
                      {style.icon}
                      <span className="capitalize">{ticket.status}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}