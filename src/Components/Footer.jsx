'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Footer = () => {

const [email, setEmail] = useState('');

const handleSignUp = () => {
    if (!email.trim()) {
        return toast.error('Please enter your email address.');
    }

    toast.success(
        'Signed up successfully. You will receive an email shortly.'
    );

    setEmail('');
};

    return (
        <footer className="relative overflow-hidden w-full border-t border-[#CFE1B9]/10 bg-[#11140E] pt-16 pb-8 z-10">

            <div className="absolute left-1/2 bottom-0 h-75 w-200 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#718355]/15 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto w-[90%] max-w-7xl">

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <Link href="/">
                            <h2 className="text-4xl font-black tracking-tight bg-linear-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-transparent w-max">
                                ArtHub
                            </h2>
                        </Link>

                        <p className="text-sm font-bold uppercase tracking-widest text-[#CFE1B9]">
                            Discover • Collect • Inspire
                        </p>

                        <p className="max-w-md text-sm leading-relaxed text-gray-400">
                            ArtHub connects talented artists with passionate collectors,
                            creating a trusted space where creativity meets opportunity.
                            Explore unique artworks, support emerging creators, and bring
                            inspiration into your life.
                        </p>
                    </div>

                    {/* Explore Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-white">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/artworks"
                                className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-[#CFE1B9]"
                            >
                                Browse Artworks
                            </Link>

                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-[#CFE1B9]"
                            >
                                Featured Artists
                            </Link>

                            <Link
                                href="/about"
                                className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-[#CFE1B9]"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/contact"
                                className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-[#CFE1B9]"
                            >
                                Contact
                            </Link>

                            <Link
                                href="/privacy-policy"
                                className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-[#CFE1B9]"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-white">
                            Follow Our Journey
                        </h3>

                        <p className="text-sm leading-relaxed text-gray-400">
                            Stay connected with new artist showcases, featured collections,
                            and community highlights.
                        </p>

                        <div className="flex items-center gap-4 pt-2">

                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CFE1B9]/20 bg-white/5 text-[#CFE1B9] transition-all duration-300 hover:-translate-y-1 hover:bg-[#CFE1B9] hover:text-[#11140E] hover:shadow-[0_0_15px_rgba(207,225,185,0.3)]"
                            >
                                <FaFacebookF size={18} />
                            </Link>

                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CFE1B9]/20 bg-white/5 text-[#CFE1B9] transition-all duration-300 hover:-translate-y-1 hover:bg-[#CFE1B9] hover:text-[#11140E] hover:shadow-[0_0_15px_rgba(207,225,185,0.3)]"
                            >
                                <FaInstagram size={18} />
                            </Link>

                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CFE1B9]/20 bg-white/5 text-[#CFE1B9] transition-all duration-300 hover:-translate-y-1 hover:bg-[#CFE1B9] hover:text-[#11140E] hover:shadow-[0_0_15px_rgba(207,225,185,0.3)]"
                            >
                                <FaTwitter size={18} />
                            </Link>

                            <Link
                                href="https://pinterest.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Pinterest"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CFE1B9]/20 bg-white/5 text-[#CFE1B9] transition-all duration-300 hover:-translate-y-1 hover:bg-[#CFE1B9] hover:text-[#11140E] hover:shadow-[0_0_15px_rgba(207,225,185,0.3)]"
                            >
                                <FaPinterestP size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-white">
                            Sign Up Newsletter
                        </h3>

                        <p className="text-sm leading-relaxed text-gray-400">
                            Get updates about new artworks, featured artists, and exclusive
                            collections delivered directly to your inbox.
                        </p>

                        <div className="flex flex-col gap-3">
                           <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="h-11 w-full rounded-xl border border-[#CFE1B9]/20 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#CFE1B9] focus:ring-2 focus:ring-[#CFE1B9]/20"
                        />

                          <button
                            onClick={handleSignUp}
                            className="h-11 rounded-xl bg-[#CFE1B9] px-5 text-sm font-semibold text-[#11140E] transition-all duration-300 hover:bg-[#BFD6A2]"
                        >
                            Sign Up
                        </button>
                        </div>
                    </div>

                </div>

                <div className="my-8 h-px w-full bg-[#CFE1B9]/10" />

                <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} ArtHub. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Crafted for artists and collectors worldwide.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;