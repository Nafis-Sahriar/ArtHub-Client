import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import UsersTable from './UsersTable';

const ManageUsersPage = async () => {
    
    const session = await getUserSession();
    if (!session || session.role !== 'admin') {
        redirect('/dashboard/unauthorized');
    }

    
    const users = await serverFetch('/api/users');

    return (
        <div className="p-2 sm:p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Manage Users</h1>
                <p className="text-lg text-zinc-500">
                    View all registered users and manage their platform roles.
                </p>
            </div>

            <UsersTable initialUsers={users} currentUser={session} />
        </div>
    );
};

export default ManageUsersPage;