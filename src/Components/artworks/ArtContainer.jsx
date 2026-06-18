"use client";
import React from 'react';
import { TextField, Input, Select, ListBox } from '@heroui/react';
import { Search } from 'lucide-react';
import ArtworkCard from './ArtworkCard'; 

const ArtContainer = ({ initialArtworks }) => {
    return (
        <div className="w-full flex flex-col gap-8">
            
           
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#CFE1B9]/50 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-10">
                
                
                <TextField aria-label="Search artworks" className="w-full md:w-1/3">
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 text-[#97A97C] pointer-events-none z-10" size={18} />
                        <Input 
                            placeholder="Search artworks or artists..." 
                            className="w-full rounded-xl border-[#CFE1B9] pl-10"
                        />
                    </div>
                </TextField>
                
                <div className="w-full md:w-auto flex gap-4">
                    <Select placeholder="All Mediums" className="w-full md:w-48 rounded-xl border-[#CFE1B9]" aria-label="Filter by medium">
                        <Select.Trigger>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="oil" textValue="Oil Painting">Oil Painting</ListBox.Item>
                                <ListBox.Item id="watercolor" textValue="Watercolor">Watercolor</ListBox.Item>
                                <ListBox.Item id="digital" textValue="Digital Art">Digital Art</ListBox.Item>
                                <ListBox.Item id="sculpture" textValue="Sculpture">Sculpture</ListBox.Item>
                                <ListBox.Item id="acrylic" textValue="Acrylic">Acrylic</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <Select placeholder="Sort By" className="w-full md:w-40 rounded-xl border-[#CFE1B9]" aria-label="Sort artworks">
                        <Select.Trigger>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="newest" textValue="Newest First">Newest First</ListBox.Item>
                                <ListBox.Item id="price_low" textValue="Price: Low to High">Price: Low to High</ListBox.Item>
                                <ListBox.Item id="price_high" textValue="Price: High to Low">Price: High to Low</ListBox.Item>
                            </ListBox>
                        </Select.Popover> 
                        
                    </Select>
                </div>
            </div>

           
            {initialArtworks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {initialArtworks.map((art) => (
                        <ArtworkCard key={art._id} artwork={art} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <h3 className="text-xl font-bold text-gray-500 mb-2">No artworks found</h3>
                    <p className="text-gray-400">Check back later for new masterpieces.</p>
                </div>
            )}
        </div>
    );
};

export default ArtContainer;