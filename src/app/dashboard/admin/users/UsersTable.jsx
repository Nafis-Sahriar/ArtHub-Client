"use client";
import React, { useState } from 'react';
import { Button, Chip } from '@heroui/react';
import { serverMutation } from '@/lib/core/server';
import { Shield, Palette, ShoppingBag, UserCog, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UsersTable = ({ initialUsers = [], currentUser }) => {
    const router = useRouter();
    const [users, setUsers] = useState(initialUsers);
    const [loadingId, setLoadingId] = useState(null);

    
    const getRoleChip = (role) => {
        switch (role) {
            case 'admin':
                return (
                    <Chip className="bg-zinc-900 text-white font-semibold px-2">
                        <span className="flex items-center gap-1.5">
                            <Shield size={14} /> Admin
                        </span>
                    </Chip>
                );
            case 'artist':
                return (
                    <Chip className="bg-[#E9F5DB] text-[#718355] border border-[#CFE1B9] font-semibold px-2">
                        <span className="flex items-center gap-1.5">
                            <Palette size={14} /> Artist
                        </span>
                    </Chip>
                );
            default: // buyer / user
                return (
                    <Chip className="bg-gray-100 text-gray-600 border border-gray-200 font-semibold px-2">
                        <span className="flex items-center gap-1.5">
                            <ShoppingBag size={14} /> Buyer
                        </span>
                    </Chip>
                );
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        setLoadingId(userId);

        try {
            const result = await serverMutation(`/api/users/${userId}`, { role: newRole }, 'PATCH');
            
            if (result) {
                setUsers(users.map(user => {
                  
                    const currentId = user._id || user.id;
                    return currentId === userId ? { ...user, role: newRole } : user;
                }));
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to update user role:", error);
            alert("Failed to update role. Please try again.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#CFE1B9]/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F4F7F0] border-b border-[#CFE1B9]/50">
                            <th className="py-4 px-6 font-bold text-zinc-700">User Info</th>
                            <th className="py-4 px-6 font-bold text-zinc-700">Current Role</th>
                            <th className="py-4 px-6 font-bold text-zinc-700 text-right">Manage Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CFE1B9]/30">
                        {users.map((user, index) => {
                            const userId = user._id || user.id;
                            const currentSessionId = currentUser?._id || currentUser?.id;
                            
                            const isCurrentUser = userId === currentSessionId;
                            const isLoading = loadingId === userId;

                            return (
                                <tr key={userId || index} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                                {user.image || user.imageUrl ? (
                                                    <img src={user.image || user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-[#E9F5DB] flex items-center justify-center text-[#718355] font-bold">
                                                        {user.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-zinc-900 flex items-center gap-2">
                                                    {user.name} 
                                                    {isCurrentUser && <span className="text-xs font-semibold text-[#718355] bg-[#E9F5DB] px-2 py-0.5 rounded-full">You</span>}
                                                </p>
                                                <p className="text-sm text-zinc-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6">
                                        {getRoleChip(user.role || 'buyer')}
                                    </td>

                                    <td className="py-4 px-6 text-right">
                                        {isCurrentUser ? (
                                            <span className="text-sm text-zinc-400 italic">Cannot change own role</span>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                {isLoading ? (
                                                    <Button isDisabled className="bg-gray-100 text-gray-400 font-semibold rounded-xl" size="sm">
                                                        <Loader2 size={16} className="animate-spin mr-2" /> Updating...
                                                    </Button>
                                                ) : (
                                                    <>
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => handleRoleChange(userId, 'buyer')}
                                                            isDisabled={user.role === 'buyer' || user.role === 'user' || !user.role}
                                                            className="bg-gray-100 hover:bg-gray-200 text-zinc-600 font-semibold rounded-xl"
                                                        >
                                                            Make Buyer
                                                        </Button>
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => handleRoleChange(userId, 'artist')}
                                                            isDisabled={user.role === 'artist'}
                                                            className="bg-[#E9F5DB] hover:bg-[#CFE1B9] text-[#718355] font-semibold rounded-xl"
                                                        >
                                                            Make Artist
                                                        </Button>
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => handleRoleChange(userId, 'admin')}
                                                            isDisabled={user.role === 'admin'}
                                                            className="bg-zinc-800 hover:bg-zinc-900 text-white font-semibold rounded-xl"
                                                        >
                                                            Make Admin
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="p-8 text-center text-zinc-500">
                        <UserCog size={48} className="mx-auto mb-3 opacity-20" />
                        <p>No users found on the platform.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersTable;