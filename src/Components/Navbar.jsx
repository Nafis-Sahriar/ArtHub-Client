'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Bars, Xmark } from '@gravity-ui/icons';
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

const Navbar = () => {
  // Mock authentication state for frontend development
  // Change this to 'true' to see the logged-in state and profile avatar!
  const isLoggedIn = false; 
  const userRole = 'user'; // Options: 'user', 'artist', 'admin'

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Standard public links based on ArtHub requirements
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Artworks', href: '/browse' },
  ];

  const dashboardLinks = {
    user: '/dashboard/user',
    artist: '/dashboard/artist',
    admin: '/dashboard/admin'
  };

  return (
    <nav className="sticky top-0 z-50 w-full py-4 transition-all duration-300">
      <div className="mx-auto w-[90%]">
        {/* Main Glass Header Wrapper - Light Earthy Greens */}
        <div className="flex h-16 items-center justify-between rounded-2xl border border-[#CFE1B9]/50 bg-[#E9F5DB]/80 px-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[#97A97C]/50">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#718355]">
              ArtHub
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-end gap-10 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#718355] transition-colors duration-200 hover:text-[#97A97C]"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Conditional Dashboard Link if logged in */}
            {isLoggedIn && (
               <Link
                 href={dashboardLinks[userRole]}
                 className="text-sm font-medium text-[#718355] transition-colors duration-200 hover:text-[#97A97C]"
               >
                 Dashboard
               </Link>
            )}
          </div>

          {/* Desktop Actions Section */}
          <div className="hidden items-center gap-5 pl-10 lg:flex min-w-40 justify-end">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar 
                      isBordered 
                      as="button" 
                      className="transition-transform border-[#97A97C] text-[#718355] bg-[#CFE1B9]" 
                      name="User" 
                      size="sm" 
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat" className="text-[#718355]">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">user@arthub.com</p>
                    </DropdownItem>
                    <DropdownItem key="dashboard" href={dashboardLinks[userRole]}>
                      My Dashboard
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#718355] transition-colors hover:text-[#97A97C]"
                >
                  Login
                </Link>

                <Link href="/register">
                  <Button className="rounded-xl bg-[#718355] px-5 font-semibold text-white shadow-md shadow-[#718355]/20 transition-all duration-300 hover:bg-[#87986A]">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center rounded-xl p-1.5 text-[#718355] transition-colors hover:bg-[#CFE1B9]/50 lg:hidden"
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <Xmark width={22} height={22} /> : <Bars width={22} height={22} />}
          </button>
        </div>

        {/* Mobile Flyout Menu Overlay Card */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-[#CFE1B9]/50 bg-[#E9F5DB]/95 p-5 shadow-lg backdrop-blur-2xl lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-[#718355] transition-colors hover:text-[#97A97C]"
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn && (
                <Link
                  href={dashboardLinks[userRole]}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-[#718355] transition-colors hover:text-[#97A97C]"
                >
                  Dashboard
                </Link>
              )}

              <div className="mt-2 flex flex-col gap-3 border-t border-[#CFE1B9] pt-4">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 w-full px-2">
                      <Avatar className="h-10 w-10 border border-[#97A97C] bg-[#CFE1B9] text-[#718355] font-medium" name="User" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-[#718355] truncate">Art Enthusiast</span>
                        <span className="text-xs text-[#97A97C] truncate">user@arthub.com</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 text-center text-base font-medium text-[#718355] hover:text-[#97A97C]"
                    >
                      Login
                    </Link>

                    <Button
                      as={Link}
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full rounded-xl bg-[#718355] font-semibold text-white shadow-md shadow-[#718355]/20 hover:bg-[#87986A]"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;