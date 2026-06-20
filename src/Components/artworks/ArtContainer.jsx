"use client"; // <-- This MUST be line 1!
import React, { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkFilters from "./ArtworkFilters";
import { useRouter } from "next/navigation";

export default function ArtContainer({ artworks = [], filters = {} }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(filters.category || "all");
  const [selectedSort, setSelectedSort] = useState(filters.sort || "newest");

  const router = useRouter();

  // URL Sync
  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) sp.set('search', searchQuery);
    if (selectedCategory && selectedCategory !== 'all') sp.set('category', selectedCategory);
    if (selectedSort && selectedSort !== 'newest') sp.set('sort', selectedSort);

    const path = `?${sp.toString()}`;
    
    // Add a small delay so it doesn't slam the server on every keystroke
    const timeoutId = setTimeout(() => {
        router.push(path, { scroll: false });
    }, 400);

    return () => clearTimeout(timeoutId);

  }, [router, searchQuery, selectedCategory, selectedSort]);

  return (
    <>
      <ArtworkFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-[#718355] font-semibold">
        Showing {artworks.length} artwork{artworks.length !== 1 && "s"}
      </div>

      {artworks.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {artworks.map((art) => (
            <ArtworkCard
              key={art._id || art.id}
              artwork={art}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-[#CFE1B9]/50 rounded-3xl shadow-sm max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">No artworks match your search criteria.</p>
        </div>
      )}
    </>
  );
}