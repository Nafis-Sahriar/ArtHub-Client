'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full border-t border-[#CFE1B9] bg-[#E9F5DB] pt-14 pb-6">
            <div className="mx-auto w-[90%] max-w-7xl">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <Link href="/">
                            <h2 className="text-4xl font-bold tracking-tight text-[#718355]">
                                ArtHub
                            </h2>
                        </Link>

                        <p className="text-sm font-semibold uppercase tracking-widest text-[#97A97C]">
                            Discover • Collect • Inspire
                        </p>

                        <p className="max-w-md text-sm leading-relaxed text-[#87986A]">
                            ArtHub connects talented artists with passionate collectors,
                            creating a trusted space where creativity meets opportunity.
                            Explore unique artworks, support emerging creators, and bring
                            inspiration into your life.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-[#718355]">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/artworks"
                                className="text-sm font-medium text-[#87986A] transition-colors hover:text-[#718355]"
                            >
                                Browse Artworks
                            </Link>

                            <Link
                                href="/artists"
                                className="text-sm font-medium text-[#87986A] transition-colors hover:text-[#718355]"
                            >
                                Featured Artists
                            </Link>

                            <Link
                                href="/sell"
                                className="text-sm font-medium text-[#87986A] transition-colors hover:text-[#718355]"
                            >
                                Become an Artist
                            </Link>

                            <Link
                                href="/about"
                                className="text-sm font-medium text-[#87986A] transition-colors hover:text-[#718355]"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/contact"
                                className="text-sm font-medium text-[#87986A] transition-colors hover:text-[#718355]"
                            >
                                Contact
                            </Link>

                            <Link
                                href="/privacy-policy"
                                className="text-sm font-medium text-[#87986A] transition-colors hover:text-[#718355]"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-[#718355]">
                            Follow Our Journey
                        </h3>

                        <p className="text-sm leading-relaxed text-[#87986A]">
                            Stay connected with new artist showcases, featured collections,
                            and community highlights.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B5C99A] bg-white/70 text-[#718355] transition-all duration-300 hover:-translate-y-1 hover:border-[#718355] hover:shadow-md"
                            >
                                <FaFacebookF size={18} />
                            </Link>

                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B5C99A] bg-white/70 text-[#718355] transition-all duration-300 hover:-translate-y-1 hover:border-[#718355] hover:shadow-md"
                            >
                                <FaInstagram size={18} />
                            </Link>

                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B5C99A] bg-white/70 text-[#718355] transition-all duration-300 hover:-translate-y-1 hover:border-[#718355] hover:shadow-md"
                            >
                                <FaTwitter size={18} />
                            </Link>

                            <Link
                                href="https://pinterest.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Pinterest"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B5C99A] bg-white/70 text-[#718355] transition-all duration-300 hover:-translate-y-1 hover:border-[#718355] hover:shadow-md"
                            >
                                <FaPinterestP size={18} />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="my-8 h-px w-full bg-[#CFE1B9]" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                    <p className="text-sm text-[#87986A]">
                        © {new Date().getFullYear()} ArtHub. All rights reserved.
                    </p>

                    <p className="text-sm text-[#87986A]">
                        Crafted for artists and collectors worldwide.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;