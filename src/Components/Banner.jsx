'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import Image from 'next/image';

const Banner = () => {
  // 1. The Data Array with your actual image paths
  const slides = [
    {
      id: 1,
      title: "Discover & Buy Original Art",
      description: "Explore a curated collection of breathtaking paintings, digital art, and sculptures from independent artists worldwide.",
      imageUrl: "/banner1.jpg" 
    },
    {
      id: 2,
      title: "Support Emerging Artists",
      description: "Connect directly with creators and bring unique, meaningful masterpieces into your home.",
      imageUrl: "/banner2.jpg"
    },
    {
      id: 3,
      title: "Secure & Seamless Buying",
      description: "Join our premium tiers for exclusive access and enjoy a safe, guaranteed purchasing experience.",
      imageUrl: "/banner3.jpg"
    }
  ];


  const [currentSlide, setCurrentSlide] = useState(0);



  
  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-125 md:h-150 overflow-hidden bg-black">
      
      
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="min-w-full h-full relative flex items-center justify-center"
          >
      
            <Image
              src={slide.imageUrl} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover" 
              fill
            />
            
          
            <div className="absolute inset-0 bg-black/50"></div>
            
          
            <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center gap-6">
             
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl font-medium text-[#E9F5DB] drop-shadow-md max-w-2xl">
                {slide.description}
              </p>
              <Link href="/browse">
                <Button size="lg" className="mt-4 rounded-xl bg-[#718355] px-8 py-6 text-lg font-semibold text-white border-none shadow-lg transition-all hover:bg-[#87986A] hover:-translate-y-1">
                  Browse Artworks
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Left/Right Arrow Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/60 hover:scale-110"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/60 hover:scale-110"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Bottom Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-10 bg-[#CFE1B9]" : "w-3 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
    </div>
  );
};

export default Banner;