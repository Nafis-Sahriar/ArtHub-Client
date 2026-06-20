"use client";
import React from 'react';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { PackageSearch } from 'lucide-react';

const COLORS = ['#718355', '#97A97C', '#4A5D23', '#CFE1B9', '#B5C99A', '#E9F5DB'];


const RevenueTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#CFE1B9] text-sm">
                <p className="font-black text-zinc-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-2">
                    {data.name}
                </p>
                <div className="space-y-1">
                    <p className="text-[#718355] font-bold">
                        Revenue: <span className="text-zinc-900">${data.value.toFixed(2)}</span>
                    </p>
                    <p className="text-zinc-500 font-medium">
                        Items Sold: <span className="text-zinc-900">{data.itemsSold}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};


const InventoryTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#CFE1B9] text-sm">
                <p className="font-black text-zinc-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-2">
                    {data.name}
                </p>
                <p className="text-[#718355] font-bold">
                    Total Listings: <span className="text-zinc-900">{data.value}</span>
                </p>
            </div>
        );
    }
    return null;
};

const AnalyticsCharts = ({ pieChartData = [], barChartData = [] }) => 
{
    
    
    const totalInventory = barChartData.reduce((sum, item) => sum + (item.value || 0), 0);
    
    if (pieChartData.length === 0 && barChartData.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#CFE1B9]/50 flex flex-col items-center justify-center min-h-[400px]">
                <PackageSearch size={48} className="text-zinc-300 mb-4" />
                <h3 className="text-xl font-bold text-zinc-700">No Data Yet</h3>
                <p className="text-zinc-500 text-sm mt-2">Charts will generate once data is available.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CFE1B9]/50">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-zinc-900">Revenue by Category</h2>
                    <p className="text-sm text-zinc-500">Distribution of all-time sales across artwork styles.</p>
                </div>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="99%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<RevenueTooltip />} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

         
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CFE1B9]/50 flex flex-col">
               
                <div className="mb-6 flex justify-between items-start gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-zinc-900">Platform Inventory</h2>
                        <p className="text-sm text-zinc-500">Total number of artworks listed per category.</p>
                    </div>
                   
                    <div className="bg-[#E9F5DB] text-[#718355] px-4 py-2 rounded-2xl border border-[#CFE1B9] text-center shrink-0 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Total Arts</p>
                        <p className="text-2xl font-black leading-none">{totalInventory}</p>
                    </div>
                </div>
                
                <div className="w-full h-[350px] flex-grow">
                    <ResponsiveContainer width="99%" height="100%">
                        <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CFE1B9" opacity={0.5} />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#718355', fontSize: 12, fontWeight: 600 }} 
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#97A97C', fontSize: 12 }} 
                            />
                            <Tooltip content={<InventoryTooltip />} cursor={{ fill: '#E9F5DB', opacity: 0.4 }} />
                            <Bar dataKey="value" fill="#718355" radius={[6, 6, 0, 0]}>
                                {barChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default AnalyticsCharts;