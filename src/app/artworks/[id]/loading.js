import React from 'react';

export default function LoadingDetails() {
    return (
        <div className="min-h-screen bg-[#F4F7F0] pt-10 pb-24">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                
                <div className="animate-pulse flex items-center gap-2">
                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
                </div>

            
                <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#CFE1B9]/50 flex flex-col lg:flex-row gap-12 animate-pulse">
                    
              
                    <div className="w-full lg:w-1/2">
                        <div className="rounded-2xl border-4 border-[#F4F7F0] shadow-md bg-gray-200 w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-auto lg:h-[500px]"></div>
                    </div>

              
                    <div className="w-full lg:w-1/2 flex flex-col">
                        
                      
                        <div className="mb-6 border-b border-[#CFE1B9]/30 pb-6">
                            <div className="flex justify-between items-start mb-4">
                              
                                <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
                           
                                <div className="h-7 w-24 bg-gray-200 rounded-full"></div>
                            </div>
                            
                          
                            <div className="h-12 w-3/4 bg-gray-200 rounded-xl mb-4"></div>
                     
                            <div className="h-6 w-1/2 bg-gray-200 rounded-lg"></div>
                        </div>

                     
                        <div className="mb-8">
                         
                            <div className="h-10 w-32 bg-gray-200 rounded-xl mb-4"></div>
                            
                            <div className="h-5 w-48 bg-gray-100 rounded-md"></div>
                        </div>

                    
                        <div className="mb-10 flex-grow">
                           
                            <div className="h-4 w-24 bg-gray-200 rounded-md mb-5"></div>
                           
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                                <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                                <div className="h-4 w-[90%] bg-gray-100 rounded-md"></div>
                                <div className="h-4 w-[95%] bg-gray-100 rounded-md"></div>
                                <div className="h-4 w-[80%] bg-gray-100 rounded-md"></div>
                            </div>
                        </div>

                        {/* Bottom Section (Button) */}
                        <div className="pt-6 border-t border-[#CFE1B9]/30 mt-auto">
                            <div className="h-16 w-full bg-gray-200 rounded-2xl"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}