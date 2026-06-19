"use client";
import React, { useState } from 'react';
// Hero UI Components
import { Form, Button, TextField, Label, Input, Description, FieldError } from "@heroui/react";
// Icons
import { ArrowRight, Handset, MapPin, PersonFill, Envelope } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { createPurchase } from '@/lib/actions/purchase';
import { useRouter } from 'next/navigation';

const BuynowForm = ({ user, artwork }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        
        const submissionData = {
            artworkId: artwork?._id,
            artworkTitle: artwork?.title,
            price: artwork?.price,
            buyerId: user?.id,
            buyerName: user?.name,
            buyerEmail: user?.email,
            artistId: artwork?.artistId,
            artistName: artwork?.artistName,
            artistEmail: artwork?.artistEmail,
            ...formData
        };

        try {
            const loadingToast = toast.loading("Recording your purchase...");
            
            // This hits your /api/purchases endpoint via your Server Action
            const res = await createPurchase(submissionData);
            
            toast.dismiss(loadingToast);

            if (res.success) {
                toast.success("Purchase recorded successfully!");
                // Optionally redirect to a 'success' page or dashboard
                router.push('/dashboard/buyer/purchases'); 
            } else {
                throw new Error("Failed to record purchase");
            }
        } catch (error) {
            console.error("Purchase Error:", error);
            toast.error("Something went wrong with the purchase.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    Shipping Details
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    Purchasing: <span className="font-semibold text-[#718355]">{artwork?.title}</span>
                </p>
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                
                {/* 1. Name (Read Only) */}
                <TextField isReadOnly name="name" value={user?.name} className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2 mb-1.5">
                        <PersonFill className="w-4 h-4 text-zinc-400" /> Full Name
                    </Label>
                    <Input className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm cursor-not-allowed" />
                </TextField>

                {/* 2. Email (Read Only) */}
                <TextField isReadOnly name="email" value={user?.email} className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2 mb-1.5">
                        <Envelope className="w-4 h-4 text-zinc-400" /> Email Address
                    </Label>
                    <Input className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm cursor-not-allowed" />
                </TextField>

                {/* 3. Phone (Editable) */}
                <TextField isRequired name="phone" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2 mb-1.5">
                        <Handset className="w-4 h-4 text-zinc-400" /> Phone Number
                    </Label>
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#718355] transition"
                    />
                    <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                {/* 4. Address (Editable) */}
                <TextField isRequired name="address" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2 mb-1.5">
                        <MapPin className="w-4 h-4 text-zinc-400" /> Shipping Address
                    </Label>
                    <textarea
                        name="address"
                        rows={3}
                        placeholder="123 Art Street, Gallery District, City..."
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#718355] transition resize-none"
                    />
                    <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                {/* Action Button */}
                <Button
                    type="submit"
                    className="w-full py-4 text-base font-bold text-white bg-[#718355] hover:bg-[#5A6B42] rounded-xl shadow-lg shadow-[#718355]/20 transition flex items-center justify-center gap-2"
                >
                    Proceed to Payment (${artwork?.price})
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </Form>
        </div>
    );
};

export default BuynowForm;