"use client"; 
import React from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function ArtworkFilters({ 
  searchQuery, setSearchQuery, 
  selectedCategory, setSelectedCategory,
  selectedSort, setSelectedSort 
}) {
  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-[24px] border border-[#CFE1B9]/50 shadow-sm max-w-7xl mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        
     
        <div className="md:col-span-6">
          <TextField 
            value={searchQuery} 
            onChange={(value) => setSearchQuery(value)}
            className="w-full"
          >
            <span className="text-sm font-medium text-[#718355] block mb-2">Search Artworks</span>
            <InputGroup className="bg-[#F4F7F0] border-[#CFE1B9] focus-within:border-[#97A97C] rounded-xl transition-all">
              <InputGroup.Prefix className="pl-3 text-[#97A97C]">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input 
                placeholder="Title, artist, or keywords..." 
                className="bg-transparent text-zinc-900 placeholder-[#97A97C] text-sm py-2.5 px-3 outline-none w-full"
              />
            </InputGroup>
          </TextField>
        </div>

      
        <div className="md:col-span-3">
          <span className="text-sm font-medium text-[#718355] block mb-2">Medium</span>
          <Select 
            selectedKey={selectedCategory} 
            onSelectionChange={(key) => setSelectedCategory(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-[#F4F7F0] text-zinc-900 border border-[#CFE1B9] rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
              <Select.Value>{selectedCategory === "all" ? "All Mediums" : selectedCategory}</Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-[#97A97C]" />
              </Select.Indicator>
            </Select.Trigger>
            
            <Select.Popover className="bg-white border border-[#CFE1B9] rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1">
                <ListBox.Item id="all" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize"><span>All Mediums</span></ListBox.Item>
                <ListBox.Item id="oil" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize"><span>Oil Painting</span></ListBox.Item>
                <ListBox.Item id="watercolor" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize"><span>Watercolor</span></ListBox.Item>
                <ListBox.Item id="digital" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize"><span>Digital Art</span></ListBox.Item>
                <ListBox.Item id="sculpture" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize"><span>Sculpture</span></ListBox.Item>
                <ListBox.Item id="acrylic" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize"><span>Acrylic</span></ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

       
        <div className="md:col-span-3">
          <span className="text-sm font-medium text-[#718355] block mb-2">Sort By</span>
          <Select 
            selectedKey={selectedSort} 
            onSelectionChange={(key) => setSelectedSort(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-[#F4F7F0] text-zinc-900 border border-[#CFE1B9] rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
              <Select.Value>
                {selectedSort === "newest" ? "Newest First" : selectedSort === "price_low" ? "Price: Low to High" : "Price: High to Low"}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-[#97A97C]" />
              </Select.Indicator>
            </Select.Trigger>
            
            <Select.Popover className="bg-white border border-[#CFE1B9] rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1">
                <ListBox.Item id="newest" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer"><span>Newest First</span></ListBox.Item>
                <ListBox.Item id="price_low" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer"><span>Price: Low to High</span></ListBox.Item>
                <ListBox.Item id="price_high" className="text-zinc-700 hover:bg-[#E9F5DB] hover:text-[#4A5D23] rounded-lg px-3 py-2 text-sm cursor-pointer"><span>Price: High to Low</span></ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

      </div>
    </div>
  );
}