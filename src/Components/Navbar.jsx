'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import { Bars, Xmark, ArrowRightFromSquare } from '@gravity-ui/icons';
import { Button, Avatar, Dropdown, Label } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); 

  const { data: session, isPending, refetch } = authClient.useSession();

  const userData = session?.user;
  const user = userData ? {
    name: userData.name,
    email: userData.email,
    imageUrl: userData.image,
    role: userData.role || 'buyer'
  } : null;

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      refetch(); 
      router.push('/');
    } catch (error) {
      console.error("Sign Out Error:", error);
      toast.error("Failed to log out.");
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Browse Artworks', href: '/artworks' },
    { label: 'Plans and Pricing', href: '/plans' },
    { label: 'Contact', href: '/contact' },
  ];

  const dashboardLinks = {
    buyer: '/dashboard/buyer',
    artist: '/dashboard/artist',
    admin: '/dashboard/admin'
  };

  return (
    // REVERTED to sticky top-0 and standard py-4
    <nav className="sticky top-0 z-[100] w-full py-4 transition-all duration-300 select-none bg-white/80 backdrop-blur-md">
      <div className="mx-auto w-[92%] max-w-7xl relative">
        
        <div className="flex h-16 items-center justify-between rounded-[2rem] border border-[#CFE1B9]/80 bg-[#F4F7F0]/90 px-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#97A97C]/50 hover:bg-[#F4F7F0]/95">
          
          <Link href="/" className="flex items-center">
            <h2 className="text-2xl font-black tracking-tight text-[#29440e]">
              ArtHub
            </h2>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-1.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#fdfdfd] text-[#4A5D23] shadow-2xs border border-[#CFE1B9]/50' // Clean Olive Pill
                      : 'text-[#718355] hover:bg-[#E9F5DB]/40 hover:text-[#11140E]' 
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {user && (
               <Link
                 href={dashboardLinks[user.role] || '/dashboard/user'}
                 className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    pathname.startsWith('/dashboard') 
                      ? 'bg-[#E9F5DB] text-[#4A5D23] shadow-2xs border border-[#CFE1B9]/50' 
                      : 'text-[#718355] hover:bg-[#E9F5DB]/40 hover:text-[#11140E]'
                 }`}
               >
                 Dashboard
               </Link>
            )}
          </div>

          <div className="hidden items-center gap-4 lg:flex min-w-[140px] justify-end">
            {isPending ? (
              <div className="h-8 w-24 bg-gray-200/60 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full cursor-pointer outline-none transition-transform hover:scale-105">
                    <Avatar className="ring-2 ring-[#97A97C] shadow-xs">
                      {user.imageUrl && (
                        <Avatar.Image referrerPolicy='no-referrer' alt={user.name || "User"} src={user.imageUrl} />
                      )}
                      <Avatar.Fallback className="bg-[#CFE1B9] text-[#4A5D23] font-bold" delayMs={600}>
                        {getInitials(user.name)}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>
                  
                  <Dropdown.Popover className="border border-[#CFE1B9] bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-1">
                    <div className="px-4 pt-4 pb-3 border-b border-[#CFE1B9]/40">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          {user.imageUrl && <Avatar.Image alt={user.name} src={user.imageUrl} />}
                          <Avatar.Fallback className="bg-[#CFE1B9] text-[#4A5D23] text-xs font-bold">
                            {getInitials(user.name)}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-bold text-[#11140E]">{user.name}</p>
                          <p className="text-xs leading-none text-[#718355]">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Dropdown.Menu aria-label="Profile Actions" className="p-2">
                      <Dropdown.Item id="dashboard" textValue="Dashboard" href={dashboardLinks[user.role] || '/dashboard/user'}>
                        <Label className="text-[#4A5D23] font-semibold cursor-pointer w-full inline-block">Dashboard</Label>
                      </Dropdown.Item>
                      
                      <Dropdown.Item id="logout" textValue="Logout" variant="danger" onClick={handleSignOut} className="mt-1 hover:bg-red-50 rounded-xl">
                        <div className="flex w-full items-center justify-between gap-4">
                          <Label className="text-red-600 font-semibold cursor-pointer">Log Out</Label>
                          <ArrowRightFromSquare className="size-4 text-red-600" />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#718355] transition-colors hover:text-[#11140E]"
                >
                  Login
                </Link>
                <Link href="/register">
                  <Button className="rounded-full bg-[#718355] px-6 font-bold text-white shadow-md shadow-[#718355]/15 transition-all hover:bg-[#5A6B42] hover:scale-105">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-full p-2 h-10 w-10 text-[#718355] hover:bg-[#E9F5DB] hover:text-[#11140E] transition-colors lg:hidden"
            type="button"
          >
            {isMenuOpen ? <Xmark width={22} height={22} /> : <Bars width={22} height={22} />}
          </button>
        </div>

        {/* Mobile Menu - Positioned Absolutely relative to the wrapper */}
        {isMenuOpen && (
          <div className="absolute top-[80px] left-0 w-full rounded-[2rem] border border-[#CFE1B9] bg-[#F4F7F0]/98 p-6 shadow-xl backdrop-blur-xl lg:hidden origin-top animate-in slide-in-from-top-4 fade-in duration-200 z-50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#E9F5DB] text-[#4A5D23] border border-[#CFE1B9]/60 font-bold' 
                        : 'text-[#718355] hover:bg-white/60 hover:text-[#11140E]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {user && (
                <Link
                  href={dashboardLinks[user.role] || '/dashboard/user'}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                    pathname.startsWith('/dashboard') 
                      ? 'bg-[#E9F5DB] text-[#4A5D23] border border-[#CFE1B9]/60 font-bold' 
                      : 'text-[#718355] hover:bg-white/60 hover:text-[#11140E]'
                  }`}
                >
                  Dashboard
                </Link>
              )}

              <div className="mt-3 flex flex-col gap-4 border-t border-[#CFE1B9] pt-5">
                {isPending ? (
                  <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                ) : user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-2 bg-white/80 p-3 rounded-2xl border border-[#CFE1B9]/50">
                      <Avatar className="h-11 w-11 ring-2 ring-[#97A97C]">
                        {user.imageUrl && <Avatar.Image alt={user.name} src={user.imageUrl} />}
                        <Avatar.Fallback className="bg-[#CFE1B9] text-[#4A5D23] font-bold">
                          {getInitials(user.name)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-base font-bold text-[#11140E] truncate">{user.name}</span>
                        <span className="text-xs font-medium text-[#718355] truncate">{user.email}</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                      className="w-full rounded-2xl border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 py-6"
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                      <Button className="w-full rounded-2xl bg-white border border-[#CFE1B9] text-[#4A5D23] font-bold shadow-2xs hover:bg-gray-50 py-6">
                        Login
                      </Button>
                    </Link>

                    <Link href="/register" className="w-full">
                      <Button onClick={() => setIsMenuOpen(false)} className="w-full rounded-2xl bg-[#718355] font-bold text-white shadow-md hover:bg-[#5A6B42] py-6">
                        Get Started
                      </Button>
                    </Link>
                  </div>
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