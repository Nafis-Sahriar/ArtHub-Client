import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import { serverFetch } from '@/lib/core/server';
import StatsCards from './StatsCards'; 
import AnalyticsCharts from './AnalyticsCharts';

const AdminDashboardHomePage = async () => {
    
    const session = await getUserSession();
    if (!session || session.role !== 'admin') {
        redirect('/dashboard/unauthorized');
    }

   
    const [userStats, categorySales, subStats, artworksStats] = await Promise.all([
        serverFetch('/api/admin/stats/users'),
        serverFetch('/api/admin/stats/category-sales'),
        serverFetch('/api/admin/stats/subscriptions'),
        serverFetch('/api/admin/stats/artworks') 
    ]);

  
    const totalArtworksSold = (categorySales || []).reduce((sum, item) => sum + item.itemsSold, 0);
    const totalPurchaseRevenue = (categorySales || []).reduce((sum, item) => sum + item.value, 0);
    const totalRevenue = totalPurchaseRevenue + (subStats?.totalSubscriptionRevenue || 0);

    return (
        <div className="p-2 sm:p-6 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Analytics Overview</h1>
                <p className="text-lg text-zinc-500">
                    High-level metrics and performance data for the ArtHub platform.
                </p>
            </div>

            <StatsCards 
                totalUsers={userStats?.totalUsers || 0} 
                totalArtists={userStats?.totalArtists || 0} 
                totalArtworksSold={totalArtworksSold} 
                totalRevenue={totalRevenue} 
            />

         
            <AnalyticsCharts 
                pieChartData={categorySales || []} 
                barChartData={artworksStats || []} 
            />
        </div>
    );
};

export default AdminDashboardHomePage;