'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import Image from 'next/image';

const Banner = () => {
  
  const slides = [
    {
      id: 1,
      eyebrow: "Curated Marketplace",
      title: "Discover & Buy Original Art",
      description: "Explore a curated collection of breathtaking paintings, digital art, and sculptures from independent artists worldwide.",
      imageUrl: "/banner1.jpg"
    },
    {
      id: 2,
      eyebrow: "Independent Creators",
      title: "Support Emerging Artists",
      description: "Connect directly with creators and bring unique, meaningful masterpieces into your home.",
      imageUrl: "/banner2.jpg"
    },
    {
      id: 3,
      eyebrow: "Premium Membership",
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
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
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

            
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/15"></div>

            <div className="relative z-10 text-center px-6 sm:px-10 max-w-3xl flex flex-col items-center gap-5 md:gap-6">

             
              <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.35em] text-[#CFE1B9]">
                {slide.eyebrow}
              </span>

            
              <div className="h-px w-16 bg-linear-to-r from-transparent via-[#CFE1B9]/70 to-transparent"></div>

              <h1 className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white drop-shadow-md">
                {slide.title}
              </h1>

              <p className="font-sans text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-[#E9F5DB]/90 drop-shadow-sm max-w-xl">
                {slide.description}
              </p>

              <div className="mt-2 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Link href="/artworks">
                  <Button className="group rounded-full bg-[#718355] px-9 py-6 text-sm sm:text-base font-semibold uppercase tracking-widest text-white border-none shadow-lg shadow-black/40 transition-all duration-300 hover:bg-[#87986A] hover:-translate-y-0.5 hover:shadow-xl">
                    <span className="flex items-center gap-2">
                      Browse Artworks
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                      </svg>
                    </span>
                  </Button>
                </Link>

            
                <div className="hidden sm:flex items-center gap-4">
                  <div className="w-px h-8 bg-white/25"></div>
                  <span className="font-serif italic text-sm text-white/70 tracking-wide">
                    0{index + 1} <span className="text-white/40 mx-1">—</span> 0{slides.length}
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>


      <button
        onClick={prevSlide}
        className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[2px] rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-12 bg-[#CFE1B9]" : "w-7 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Banner;