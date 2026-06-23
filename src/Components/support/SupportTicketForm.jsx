"use client";
import React, { useState } from "react";
import { Form, TextField, Input, Label, FieldError, TextArea, Select, ListBox, Button } from "@heroui/react";
import { LifeBuoy, FileText, Tag, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SupportTicketForm({ user, onTicketCreated }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

     const {data:tokenData} = await authClient.token();
     const token = tokenData?.token;

     console.log("Token in SupportTicketForm.jsx: ", token);
    

    const loadingToast = toast.loading("Submitting support ticket...");
    try {
      const formData = new FormData(e.target);
      const ticketData = Object.fromEntries(formData.entries());

      
      const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        title: ticketData.title,
        description: ticketData.description,
        category: ticketData.category,
        status: "pending",
        createdAt: new Date().toISOString(),
      };


    
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/support`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      toast.dismiss(loadingToast);

      if (res.ok && result.success) {
        toast.success("Support ticket opened successfully!");
        e.target.reset();
        if (onTicketCreated) onTicketCreated(); 
      } else {
        throw new Error(result.message || "Failed to submit ticket.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-[#CFE1B9]/50 bg-white p-6 md:p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-[#CFE1B9]/30 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F5DB]">
          <LifeBuoy size={20} className="text-[#718355]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#718355]">Open Support Ticket</h3>
          <p className="text-xs text-gray-500">Our operational team will review your case within 24 hours.</p>
        </div>
      </div>

      <Form className="space-y-5" onSubmit={handleSubmit}>
        {/* Row 1: Prefilled Metadata Info (Read-Only fields for UX confidence) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 bg-[#F4F7F0] p-4 rounded-2xl border border-[#CFE1B9]/30">
          <div>
            <span className="text-xs font-bold text-[#718355] block mb-0.5 uppercase tracking-wider">User Account</span>
            <p className="text-sm font-semibold text-zinc-800 line-clamp-1">{user.name}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-[#718355] block mb-0.5 uppercase tracking-wider">Contact Email</span>
            <p className="text-sm font-semibold text-zinc-800 line-clamp-1">{user.email}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-[#718355] block mb-0.5 uppercase tracking-wider">Platform Privilege</span>
            <p className="text-xs inline-block bg-[#718355] text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-widest mt-0.5">
              {user.role}
            </p>
          </div>
        </div>

        {/* Row 2: Ticket Category Dropdown */}
        <Select name="category" placeholder="Select Issue Destination" isRequired defaultValue={[]}>
          <Label className="text-sm font-semibold text-gray-700">Issue Context</Label>
          <Select.Trigger className="rounded-xl border-[#CFE1B9] text-zinc-800 bg-transparent">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="system" textValue="System Bug">System & Platform Bug</ListBox.Item>
              <ListBox.Item id="buyer" textValue="Marketplace Dispute">Buyer / Order Issue</ListBox.Item>
              <ListBox.Item id="billing" textValue="Billing">Billing & Payout Processing</ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>

        {/* Row 3: Ticket Title */}
        <TextField name="title" isRequired>
          <Label className="text-sm font-semibold text-gray-700">Issue Title</Label>
          <Input placeholder="Brief summary of the issue..." className="rounded-xl border-[#CFE1B9] text-zinc-900" />
          <FieldError />
        </TextField>

        {/* Row 4: Issue Description */}
        <TextField name="description" isRequired>
          <Label className="text-sm font-semibold text-gray-700">Detailed Description</Label>
          <TextArea
            className="rounded-xl border-[#CFE1B9] text-zinc-900"
            placeholder="Please detail what went wrong, including steps to reproduce or transaction codes..."
            rows={5}
          />
          <FieldError />
        </TextField>

        {/* Action Controls */}
        <div className="pt-2">
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full md:w-auto rounded-xl bg-[#718355] px-8 py-5 text-sm font-semibold text-white hover:bg-[#87986A] transition-colors shadow-md shadow-[#718355]/10"
          >
            {isSubmitting ? <Loader2 className="animate-spin size-4" /> : "Submit Support Request"}
          </Button>
        </div>
      </Form>
    </div>
  );
}