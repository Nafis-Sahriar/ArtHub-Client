import { DashboardSidebar } from '@/Components/dashboard/DashboardSidebar';
import React from 'react';

const DashBoardLayout = ({ children }) => {
    return (
       
        <div className="flex flex-col lg:flex-row min-h-screen w-[90%] mx-auto mt-6 gap-6">
             <DashboardSidebar />
             
           
             <div className="flex-1 rounded-3xl border border-[#CFE1B9]/50 bg-[#F4F7F0]/50 p-6 shadow-sm">
                {children}
             </div>
        </div>
    );
};

export default DashBoardLayout;