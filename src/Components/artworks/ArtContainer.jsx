"use client"; 
import React, { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import ArtworkFilters from "./ArtworkFilters";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

export default function ArtContainer({ artworks=[],filters={},total=0}) 
{

  // amar ekta search query state lagbe. Then Category, set sleected category, sort, last e paginaiton.

  const [searchQuery, setSearchQuery] = useState(filters.search ||"");
  const [selectedCategory, setSelectedCategory] = useState(filters.category ||"all");
  
  const [selectedSort, setSelectedSort] = useState(filters.sort ||"newest");
  const [page, setPage] = useState(filters.page || 1);
  
  const [minPrice, setMinPrice] = useState(filters.minPrice||"");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice||"");

  const router = useRouter();


  const itemsPerPage = 8;
  const totalItems = total;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [...Array(totalPages).keys()].map(i => i + 1);
    return pages;
  };

  
  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) 
    {
        sp.set('search', searchQuery);
    }

    if (selectedCategory && selectedCategory !== 'all') {
      sp.set('category', selectedCategory);
    }

    if (selectedSort && selectedSort !== 'newest') 
    {
        sp.set('sort', selectedSort);
    }
    if (page)
    { 
      sp.set('page',page);
    }
    if (itemsPerPage) 
    {
      sp.set('perPage', itemsPerPage);
    }
    
    if (minPrice) 
    {
      sp.set('minPrice', minPrice);
    }
    if (maxPrice) 
    {
      sp.set('maxPrice', maxPrice);
    }

    const path = `?${sp.toString()}`;
    
    const timeoutId = setTimeout(() => 
    {
        router.push(path, { scroll: false });
    }, 400);

    return()=> clearTimeout(timeoutId);

  }, [router, searchQuery, selectedCategory, selectedSort, page, itemsPerPage, minPrice, maxPrice]);

  return (
    <>
      <ArtworkFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-[#CFE1B9] font-semibold">

        Showing {artworks.length} artwork{artworks.length !== 1 && "s"} on this page

      </div>
      
      {artworks.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-10">

            {artworks.map((art) => (
              <ArtworkCard

                key={art._id || art.id}

                artwork={art}
              />
            ))}
          </div>

          <Pagination className="w-full">
            
            <Pagination.Summary className="text-gray-400 text-sm">
              Page {page} of {totalPages || 1} ({totalItems} total masterpieces)
            </Pagination.Summary>
            
            <Pagination.Content>

              <Pagination.Item>
                <Pagination.Previous className="text-white hover:text-[#CFE1B9]" isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                  <Pagination.PreviousIcon />

                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis className="text-white" />
                  </Pagination.Item>
                ):
                (
                  <Pagination.Item key={p}>

                    <Pagination.Link 

                      className={p === page?"bg-[#718355] text-white font-bold border-none" : "text-white hover:text-[#CFE1B9]"}

                      isActive={p === page} 

                      onPress={() => setPage(p)}
                    >{p}
                    </Pagination.Link>


                  </Pagination.Item>
                ),
              )}
              
              <Pagination.Item>
                <Pagination.Next 
                className="text-white hover:text-[#CFE1B9]" isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>

                  <span>Next</span>

                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-20 bg-white/5 backdrop-blur-md border border-[#CFE1B9]/20 rounded-3xl shadow-sm max-w-7xl mx-auto">


          <p className="text-gray-400 text-lg">
            No artworks match your search criteria.
          </p>
        </div>
      )}
    </>
  );
}