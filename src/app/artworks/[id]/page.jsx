import React from 'react';
import Link from 'next/link';
import { Chip, Button } from '@heroui/react';
import { ArrowLeft, Edit2, ShoppingCart, ShieldAlert } from 'lucide-react';
import { getArtworkById } from '@/lib/api/artworks';
import { getUserSession } from '@/lib/core/session'; // Adjust path if needed

const PublicArtworkDetails = async ({ params }) => {
   
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // here i have used promise.all to fetch both artwork.
    const [artwork, session] = await Promise.all([
        getArtworkById(id),
        getUserSession()
    ]);

    // jodi artwok na thake. tahole ekta error show korte hobe.
    if (!artwork) {
        return (
            <div className="min-h-screen bg-[#F4F7F0] flex flex-col items-center justify-center p-6">
                <ShieldAlert size={64} className="text-[#97A97C] mb-4" />
                <h2 className="text-3xl font-bold text-[#11140E]">Artwork Not Found</h2>
                <p className="text-gray-500 mt-2 text-center max-w-md">
                    This masterpiece might have been removed or the URL is incorrect.
                </p>
                <Link href="/artworks" className="mt-8">
                    <Button className="bg-[#718355] text-white rounded-xl font-semibold">
                        Return to Gallery
                    </Button>
                </Link>
            </div>
        );
    }

   // art er owner jodi nije jodi details page e jay, tahole purchase option asha uchit na. tai ami ekhane check korlam j 
   // user session er id ta artwork er artistId er shathe mile kina. jodi mile tahole ami ekta flag set kore dichi.
    const isOwningArtist = session?.id === artwork.artistId;

    return (
        <div className="min-h-screen bg-[#F4F7F0] pt-10 pb-24">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Top Navigation */}
                <Link 
                    href="/artworks"
                    className="inline-flex items-center gap-2 text-[#97A97C] hover:text-[#718355] transition-colors font-medium"
                >
                    <ArrowLeft size={18} /> Back to Gallery
                </Link>

                {/* Main Content Card */}
                <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#CFE1B9]/50 flex flex-col lg:flex-row gap-12">
                    
                    {/* Left Side: Large High-Res Image */}
                    <div className="w-full lg:w-1/2">
                        <div className="rounded-2xl overflow-hidden border-4 border-[#F4F7F0] shadow-md bg-gray-50 aspect-auto">
                            <img 
                                src={artwork.imageUrl} 
                                alt={artwork.title} 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Side: Artwork Info & Persona Controls */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-6 border-b border-[#CFE1B9]/30 pb-6">
                            <div className="flex justify-between items-start mb-4">
                                <Chip className="bg-[#E9F5DB] text-[#718355] font-semibold capitalize border border-[#CFE1B9]/50">
                                    {artwork.category}
                                </Chip>
                                <Chip variant="flat" color={artwork.status === 'available' ? 'success' : 'secondary'} className="capitalize font-bold">
                                    {artwork.status}
                                </Chip>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-black text-[#11140E] leading-tight mb-2">
                                {artwork.title}
                            </h1>
                            <p className="text-lg text-gray-500 font-medium">
                                Created by <span className="text-[#718355] hover:underline cursor-pointer">{artwork.artistName || "Unknown Artist"}</span>
                            </p>
                        </div>

                        <div className="mb-8">
                            <p className="text-4xl font-black text-[#718355] mb-2">
                                ${artwork.price}
                            </p>
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Dimensions: <span className="text-gray-800">{artwork.dimensions}</span>
                            </p>
                        </div>

                        <div className="mb-10 flex-grow">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">The Story</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                                {artwork.description}
                            </p>
                        </div>

                        {/* PERSONA RENDER BLOCK */}
                        <div className="pt-6 border-t border-[#CFE1B9]/30">
                            {isOwningArtist ? (
                                // Render for Owning Artist
                                <div className="flex flex-col gap-3">
                                    <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium mb-2 text-center">
                                        This is your artwork. You cannot purchase it.
                                    </div>
                                    <Link href={`/dashboard/artist/arts/${artwork._id}/edit`} className="w-full">
                                        <Button className="w-full bg-[#E9F5DB] text-[#718355] hover:bg-[#CFE1B9] py-8 text-lg font-bold rounded-2xl shadow-sm transition-all">
                                            <Edit2 size={20} className="mr-2" /> Edit Artwork Details
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                // normal people er jonno render. Ekhan theke stripe e jabe. 
                                
                         <>    
                                <Link href={`/artworks/${artwork._id}/buy`} className="w-full">
                                            <Button 
                                                isDisabled={artwork.status !== 'available'}
                                                className={`w-full py-8 text-lg font-bold rounded-2xl shadow-xl transition-all ${artwork.status === 'available' ? 'bg-[#718355] text-white hover:bg-[#5A6B42] hover:shadow-[#718355]/30' : 'bg-gray-200 text-gray-500'}`}
                                            >
                                                <ShoppingCart size={22} className="mr-2" /> 
                                                {artwork.status === 'available' ? 'Buy Now' : 'Artwork Sold'}
                                            </Button>



                                            
                                        </Link>

                               {/* <form action='/api/payment' method='POST'>
                                    <input type='hidden' name="price" value={artwork?.price} ></input>
                                    <input type='hidden' name="title" value={artwork?.title} ></input>
                                    <input type='hidden' name="productId" value={artwork?._id} ></input>

                                     <Button 
                                     type="submit"
                                    isDisabled={artwork.status !== 'available'}
                                    className={`w-full py-8 text-lg font-bold rounded-2xl shadow-xl transition-all ${artwork.status === 'available' ? 'bg-[#718355] text-white hover:bg-[#5A6B42] hover:shadow-[#718355]/30' : 'bg-gray-200 text-gray-500'}`}
                                >
                                    <ShoppingCart size={22} className="mr-2" /> 
                                    {artwork.status === 'available' ? 'Buy Now' : 'Artwork Sold'}
                                    </Button>


                               </form> */}



                         </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicArtworkDetails;