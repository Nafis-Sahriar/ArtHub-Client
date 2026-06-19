'use client';
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { serverMutation } from '@/lib/core/server'; 
import { Save, CheckCircle2, AlertCircle, Mail, Crown, Fingerprint, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


const ProfileForm = ({ user }) => {
    // 1. Initialize form state with only the allowed editable fields
    // Accommodating both 'image' and 'imageUrl' depending on how your auth provider stores it

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
          
            const result = await serverMutation(`/api/users/${user.id}`, formData, 'PATCH');
            
            if (result.success || result.modifiedCount > 0) {
                setStatus({ loading: false, message: 'Profile updated successfully! Changes may take a moment to reflect globally.', type: 'success' });
                router.refresh(); 
            } else {
                setStatus({ loading: false, message: 'No changes were made.', type: 'info' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ loading: false, message: 'Failed to update profile. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="space-y-8">
            
          
            <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 overflow-hidden">
                <div className="bg-[#F4F7F0] px-8 py-4 border-b border-[#CFE1B9]/50">
                    <h2 className="text-sm font-bold text-[#718355] uppercase tracking-wider">Account Overview</h2>
                </div>
                <div className="p-8 flex flex-col md:flex-row items-start gap-8">
                    
               
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-3xl border-4 border-[#F4F7F0] shadow-md overflow-hidden bg-zinc-100 flex items-center justify-center">
                            {(user?.image || user?.imageUrl) ? (
                                <img 
                                    src={user.image || user.imageUrl} 
                                    alt={user.name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-4xl font-black text-zinc-300">
                                    {user?.name?.charAt(0) || 'U'}
                                </span>
                            )}
                        </div>
                    </div>

               
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Full Name</p>
                            <p className="text-lg font-bold text-zinc-900">{user?.name || 'Not Provided'}</p>
                        </div>
                        
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Mail size={14}/> Email Address
                            </p>
                            <p className="text-lg font-bold text-zinc-900">{user?.email}</p>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Fingerprint size={14}/> Account Role
                            </p>
                            <span className="inline-block px-3 py-1 bg-[#E9F5DB] text-[#718355] font-bold text-sm rounded-lg capitalize mt-1">
                                {user?.role || 'User'}
                            </span>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Crown size={14}/> Current Plan
                            </p>
                            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 font-bold text-sm rounded-lg capitalize mt-1">
                                {(user?.plan && user.plan.replace('buyer_', '')) || 'Free'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 p-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Update Details</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                 
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Display Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name} 
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#718355] focus:ring-2 focus:ring-[#E9F5DB] transition-all outline-none text-zinc-900"
                        />
                    </div>

                  
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 flex items-center gap-2">
                            <ImageIcon size={16} className="text-zinc-400"/> Profile Image URL
                        </label>
                        <input 
                            type="url" 
                            name="imageUrl"
                            value={formData.imageUrl} 
                            onChange={handleChange}
                            placeholder="https://example.com/your-image.jpg"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#718355] focus:ring-2 focus:ring-[#E9F5DB] transition-all outline-none text-zinc-900"
                        />
                        <p className="text-xs text-zinc-400 mt-2">
                            Provide a direct link to an image (e.g., from ImgBB) to update your avatar.
                        </p>
                    </div>

                    
                    {status.message && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${
                            status.type === 'success' ? 'bg-[#E9F5DB] text-[#718355]' : 
                            status.type === 'error' ? 'bg-red-50 text-red-600' : 
                            'bg-zinc-100 text-zinc-600'
                        }`}>
                            {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            {status.message}
                        </div>
                    )}

                    
                    <div className="pt-4 border-t border-[#CFE1B9]/30">
                        <Button 
                            type="submit" 
                            isLoading={status.loading}
                            className="w-full sm:w-auto bg-[#718355] hover:bg-[#5A6B42] text-white font-bold py-6 px-8 rounded-xl transition-colors shadow-lg shadow-[#718355]/20"
                        >
                            {status.loading ? 'Saving Changes...' : (
                                <><Save size={18} className="mr-2" /> Update Profile</>
                            )}
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ProfileForm;