"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutSideContentLeft, 
    House, 
    Person, 
    CreditCard, 
    Briefcase,
    HouseFill,
    PersonFill
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Users, LayoutDashboard, PlusCircle, History, CreditCardIcon } from "lucide-react";
import { FiFileText } from 'react-icons/fi';

export const DashboardSidebar = ({ session }) => {
    const pathname = usePathname();
    
    // 1. Add state to control the drawer's open/close status
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const buyerNavLinks = [
        { icon: HouseFill, href: "/dashboard/buyer", label: "My Collection" },
        { icon: FiFileText, href: "/dashboard/buyer/purchases", label: "Purchase History" },
        { icon: CreditCardIcon, href: "/dashboard/buyer/billing", label: "Subscription & Billing" },
        { icon: PersonFill, href: "/dashboard/buyer/profile", label: "Profile Settings" },
    ];

    const artistNavLinks = [
        { icon: LayoutDashboard, href: "/dashboard/artist", label: "Artist Home" },
        { icon: LayoutDashboard, href: "/dashboard/artist/arts", label: "My Artworks" },
        { icon: PlusCircle, href: "/dashboard/artist/arts/new", label: "Add Artwork" },
        { icon: History, href: "/dashboard/artist/sales", label: "Sales History" },
        { icon: Person, href: "/dashboard/artist/profile", label: "Profile Settings" },
    ];

    const adminNavLinks = [
        { icon: LayoutDashboard, href: "/dashboard/admin", label: "Analytics Overview" },
        { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
        { icon: Briefcase, href: "/dashboard/admin/artworks", label: "All Artworks" },
        { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
    ];

    const navLinksMap = {
        buyer: buyerNavLinks,
        artist: artistNavLinks,
        admin: adminNavLinks
    };

    const navItems = navLinksMap[session?.user?.role || session?.role || 'buyer'];

    // 2. Convert navContent to a function that accepts an onClose handler
    const renderNavContent = (onClose) => (
        <div className="flex h-full flex-col justify-between">
            <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose} // Instantly closes the drawer on click
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 
                                ${isActive 
                                    ? "bg-[#718355] text-white shadow-md shadow-[#718355]/20" 
                                    : "text-[#718355] hover:bg-[#CFE1B9]/40 hover:text-[#4A5D23]"
                                }`
                            }
                        >
                            <item.icon className={`size-5 ${isActive ? "text-white" : "text-[#97A97C]"}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="mb-6 border-t border-[#CFE1B9]/50 pt-4 mt-8">
                <Link
                    href="/"
                    onClick={onClose} // Instantly closes the drawer on click
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#718355] transition-colors hover:bg-red-50 hover:text-red-600"
                >
                    <House className="size-5" />
                    Back to Marketplace
                </Link>
            </div>
        </div>
    );

    const role = session?.user?.role || session?.role || 'buyer';
    const userName = session?.user?.name || session?.name || 'User';

    return (
        <>
            {/* Desktop View: Sticky Sidebar */}
            <aside className="hidden w-64 shrink-0 flex-col rounded-3xl border border-[#CFE1B9]/50 bg-white/60 p-5 backdrop-blur-xl lg:flex sticky top-24 h-[calc(100vh-8rem)]">
                <div className="mb-4 px-2 border-b border-[#CFE1B9]/50 pb-4">
                    <h2 className="text-xl font-bold tracking-tight text-[#718355] capitalize">
                        {role === 'buyer' ? 'Collector' : role} Dashboard
                    </h2>
                    <p className="text-xs text-[#97A97C] font-medium mt-1">Welcome, {userName.split(' ')[0]}</p>
                </div>
                {/* Desktop doesn't need to close anything on click */}
                {renderNavContent()}
            </aside>

            {/* Mobile View: Full-width inline toggle button */}
            <div className="lg:hidden w-full block">
                <Drawer 
                    isOpen={isDrawerOpen} 
                    open={isDrawerOpen} 
                    onOpenChange={setIsDrawerOpen}
                >
                    <Button 
                        onClick={() => setIsDrawerOpen(true)}
                        onPress={() => setIsDrawerOpen(true)}
                        className="w-full flex justify-between items-center bg-[#E9F5DB] border border-[#CFE1B9] text-[#718355] font-semibold rounded-2xl py-6 shadow-sm"
                    >
                        <span className="flex items-center gap-2">
                            <LayoutSideContentLeft className="size-5" />
                            Open Dashboard Menu
                        </span>
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="bg-[#F4F7F0]">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger onClick={() => setIsDrawerOpen(false)} className="text-[#718355] bg-[#E9F5DB] hover:bg-[#CFE1B9]" />
                                <Drawer.Header className="border-b border-[#CFE1B9]/50 pb-4 mt-4">
                                    <h2 className="text-2xl font-bold tracking-tight text-[#718355] capitalize">
                                        {role} Dashboard
                                    </h2>
                                </Drawer.Header>
                                <Drawer.Body className="px-4">
                                    {/* Pass the state-closing function to Mobile nav items */}
                                    {renderNavContent(() => setIsDrawerOpen(false))}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
};