import React from 'react';

export default function Loading() {
   
    const skeletonCards = Array(4).fill(0);

    return (
        <div className="min-h-screen bg-[#F4F7F0] pt-10 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
               
                <div className="mb-10 text-center md:text-left animate-pulse">
                    <div className="h-12 w-3/4 md:w-96 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 w-full md:w-2/3 bg-gray-200 rounded-lg"></div>
                </div>

               
                <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-[24px] border border-[#CFE1B9]/50 shadow-sm mb-10 animate-pulse">
                    <div className="h-12 bg-gray-100 rounded-xl w-full md:w-1/2"></div>
                    <div className="h-12 bg-gray-100 rounded-xl w-full md:w-1/4"></div>
                    <div className="h-12 bg-gray-100 rounded-xl w-full md:w-1/4"></div>
                </div>

               
                <div className="mb-6 animate-pulse">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>

            
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {skeletonCards.map((_, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-[24px] overflow-hidden border border-[#CFE1B9]/50 shadow-sm animate-pulse"
                        >
                         
                            <div className="w-full h-48 bg-gray-200"></div>
                            
                      
                            <div className="p-5">
                          
                                <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                              
                                <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-4"></div>
                           
                                <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-6"></div>
                                
                               
                                <div className="flex justify-between gap-3">
                                    <div className="h-10 bg-gray-100 rounded-xl w-1/2"></div>
                                    <div className="h-10 bg-gray-200 rounded-xl w-1/2"></div>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>

             
                <div className="flex justify-between items-center animate-pulse mt-8">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="flex gap-2">
                        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                        <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                        <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}