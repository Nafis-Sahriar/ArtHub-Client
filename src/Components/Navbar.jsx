'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Bars, Xmark, ArrowRightFromSquare, Gear } from '@gravity-ui/icons';
import { Button, Avatar, Dropdown, Label } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

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
    } catch (error) {
      console.error("Sign Out Error:", error);
      toast.error("Failed to log out.");
    }
  };


  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Artworks', href: '/artworks' },
    { label: 'Plans and Pricing', href: '/plans' },
  ];


  const dashboardLinks = {
    buyer: '/dashboard/user',
    artist: '/dashboard/artist',
    admin: '/dashboard/admin'
  };

  return (
    <nav className="sticky top-0 z-50 w-full py-4 transition-all duration-300">
      <div className="mx-auto w-[90%]">
        
        <div className="flex h-16 items-center justify-between rounded-2xl border border-[#CFE1B9]/50 bg-[#E9F5DB]/80 px-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[#97A97C]/50">
          
      
          <Link href="/" className="flex items-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#718355]">
              ArtHub
            </h2>
          </Link>

     
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
            
          
            {user && (
               <Link
                 href={dashboardLinks[user.role] || '/dashboard/user'}
                 className="text-sm font-medium text-[#718355] transition-colors duration-200 hover:text-[#97A97C]"
               >
                 Dashboard
               </Link>
            )}
          </div>

         
          <div className="hidden items-center gap-5 pl-10 lg:flex min-w-40 justify-end">
            {isPending ? (
              <span className="text-sm font-medium text-[#718355] animate-pulse">
                Loading...
              </span>
            ) : user ? (
              <div className="flex items-center gap-4">
                
            
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full cursor-pointer outline-none transition-transform hover:scale-105">
                 
                    <Avatar className="ring-2 ring-[#97A97C] ring-offset-2 ring-offset-[#E9F5DB]">
                      {user.imageUrl && (
                        <Avatar.Image alt={user.name || "User"} src={user.imageUrl} />
                      )}
                      <Avatar.Fallback className="bg-[#CFE1B9] text-[#718355] font-medium" delayMs={600}>
                        {getInitials(user.name)}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>
                  
                  <Dropdown.Popover className="border border-[#CFE1B9]/50 bg-[#F4F7F0] shadow-lg rounded-xl">
                    <div className="px-4 pt-4 pb-2 border-b border-[#CFE1B9]/50">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          {user.imageUrl && (
                            <Avatar.Image alt={user.name || "User"} src={user.imageUrl} />
                          )}
                          <Avatar.Fallback className="bg-[#CFE1B9] text-[#718355] text-xs font-medium" delayMs={600}>
                            {getInitials(user.name)}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-semibold text-[#718355]">{user.name}</p>
                          <p className="text-xs leading-none text-[#97A97C]">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Dropdown.Menu aria-label="Profile Actions" className="p-2">
                      <Dropdown.Item id="dashboard" textValue="Dashboard" href={dashboardLinks[user.role] || '/dashboard/user'}>
                        <Label className="text-[#718355] cursor-pointer w-full inline-block">Dashboard</Label>
                      </Dropdown.Item>
                      
                      <Dropdown.Item id="settings" textValue="Settings">
                        <div className="flex w-full items-center justify-between gap-4">
                          <Label className="text-[#718355] cursor-pointer">Settings</Label>
                          <Gear className="size-4 text-[#97A97C]" />
                        </div>
                      </Dropdown.Item>
                      
                      <Dropdown.Item id="logout" textValue="Logout" variant="danger" onClick={handleSignOut}>
                        <div className="flex w-full items-center justify-between gap-4">
                          <Label className="text-red-500 cursor-pointer">Log Out</Label>
                          <ArrowRightFromSquare className="size-4 text-red-500" />
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


          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center rounded-xl p-1.5 text-[#718355] transition-colors hover:bg-[#CFE1B9]/50 lg:hidden"
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <Xmark width={22} height={22} /> : <Bars width={22} height={22} />}
          </button>
        </div>

       
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

              {user && (
                <Link
                  href={dashboardLinks[user.role] || '/dashboard/user'}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-[#718355] transition-colors hover:text-[#97A97C]"
                >
                  Dashboard
                </Link>
              )}

              <div className="mt-2 flex flex-col gap-3 border-t border-[#CFE1B9] pt-4">
                {isPending ? (
                  <span className="text-center text-sm font-medium text-[#718355] animate-pulse py-2">
                    Loading...
                  </span>
                ) : user ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 w-full px-2">
                      
                   
                      <Avatar className="h-10 w-10 ring-2 ring-[#97A97C]">
                        {user.imageUrl && (
                          <Avatar.Image alt={user.name || "User"} src={user.imageUrl} />
                        )}
                        <Avatar.Fallback className="bg-[#CFE1B9] text-[#718355] font-medium" delayMs={600}>
                          {getInitials(user.name)}
                        </Avatar.Fallback>
                      </Avatar>

                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-[#718355] truncate">{user.name}</span>
                        <span className="text-xs text-[#97A97C] truncate">{user.email}</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
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

                    <Link href="/register">
                      <Button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full rounded-xl bg-[#718355] font-semibold text-white shadow-md shadow-[#718355]/20 hover:bg-[#87986A]"
                    >
                      Get Started
                    </Button>
                    </Link>
                  
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