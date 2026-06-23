'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { serverMutation } from '@/lib/core/server';
import { Save, CheckCircle2, AlertCircle, Mail, Image as ImageIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const ArtistProfileForm = ({ user }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        imageUrl: user?.image || user?.imageUrl || '',
    });

    const [status, setStatus] = useState({ loading: false, message: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, message: '', type: '' });

        try {
            await authClient.updateUser({
                image: formData.imageUrl,
                name: formData.name,
            })
            const result = await serverMutation(`/api/users/${user.id}`, formData, 'PATCH');
            
            if (result.success || result.modifiedCount > 0) {
                setStatus({ loading: false, message: 'Profile updated successfully!', type: 'success' });
                router.refresh(); 
            } else {
                setStatus({ loading: false, message: 'No changes were made.', type: 'info' });
            }
        } catch (error) {
            setStatus({ loading: false, message: 'Failed to update profile.', type: 'error' });
        }
    };

    return (
        <div className="space-y-8">
            {/* Overview Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 p-8 flex items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-zinc-100 border border-[#CFE1B9]/30 overflow-hidden">
                    <img src={user.image || user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-zinc-900">{user.name}</h3>
                    <p className="text-zinc-500 flex items-center gap-2 mt-1">
                        <Mail size={14} /> {user.email}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Display Name</label>
                        <input name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#718355] outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 flex items-center gap-2">
                            <ImageIcon size={16} /> Profile Image URL
                        </label>
                        <input name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#718355] outline-none" />
                    </div>

                    {status.message && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${status.type === 'success' ? 'bg-[#E9F5DB] text-[#718355]' : 'bg-red-50 text-red-600'}`}>
                            {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            {status.message}
                        </div>
                    )}

                    <Button type="submit" isLoading={status.loading} className="bg-[#718355] hover:bg-[#5A6B42] text-white font-bold py-6 px-8 rounded-xl">
                        <Save size={18} className="mr-2" /> Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ArtistProfileForm;