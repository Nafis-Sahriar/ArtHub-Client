"use client";
import React from 'react';
import { Button } from "@heroui/react";
import { ShoppingCart } from 'lucide-react';

const BuynowForm = ({ artwork }) => {
    return (
        <div className="w-full">
            <form action='/api/payment' method='POST' className="w-full">
                
                <input type='hidden' name="price" value={artwork?.price} />
                <input type='hidden' name="title" value={artwork?.title} />
                <input type='hidden' name="productId" value={artwork?._id} />
                <input type='hidden' name="imageUrl" value={artwork?.imageUrl} />
                <input type='hidden' name="artistId" value={artwork?.artistId} />


                <Button 
                    type="submit"
                    isDisabled={artwork?.status !== 'available'}
                    className={`w-full py-8 text-lg font-bold rounded-2xl shadow-xl transition-all ${
                        artwork?.status === 'available' 
                            ? 'bg-[#718355] text-white hover:bg-[#5A6B42] hover:shadow-[#718355]/30' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <ShoppingCart size={22} className="mr-2" /> 
                    {artwork?.status === 'available' ? 'Proceed to Payment' : 'Artwork Sold'}
                </Button>
            </form>
        </div>
    );
};

export default BuynowForm;