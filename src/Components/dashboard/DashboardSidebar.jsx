"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutSideContentLeft, 
    House, 
    Person, 
    FileText, 
    CreditCard, 
    Briefcase,
    Gear
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Users, LayoutDashboard, PlusCircle, History } from "lucide-react";

export const DashboardSidebar = () => {
   
    const session = {
        user: {
            name: "Nafis Sahriar Redwan",
            role: "artist", 
        }
    };

    const pathname = usePathname();

    const buyerNavLinks = [
        { icon: House, href: "/dashboard/user", label: "My Purchases" },
        { icon: Person, href: "/dashboard/user/profile", label: "Profile Settings" },
    ];

    const artistNavLinks = [
        { icon: LayoutDashboard, href: "/dashboard/artist", label: "Manage Artworks" },
        { icon: PlusCircle, href: "/dashboard/artist/add", label: "Add Artwork" },
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

    const navItems = navLinksMap[session?.user?.role || 'buyer'];


    const navContent = (
        <div className="flex h-full flex-col justify-between">
            <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
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
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#718355] transition-colors hover:bg-red-50 hover:text-red-600"
                >
                    <House className="size-5" />
                    Back to Marketplace
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop View: Sticky Sidebar */}
            <aside className="hidden w-64 shrink-0 flex-col rounded-3xl border border-[#CFE1B9]/50 bg-white/60 p-5 backdrop-blur-xl lg:flex sticky top-24 h-[calc(100vh-8rem)]">
                <div className="mb-4 px-2 border-b border-[#CFE1B9]/50 pb-4">
                    <h2 className="text-xl font-bold tracking-tight text-[#718355]">
                        {session.user.role === 'buyer' ? 'Collector' : session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1)} Dashboard
                    </h2>
                    <p className="text-xs text-[#97A97C] font-medium mt-1">Welcome, {session.user.name.split(' ')[0]}</p>
                </div>
                {navContent}
            </aside>

            {/* Mobile View: Full-width inline toggle button */}
            <div className="lg:hidden w-full block">
                <Drawer>
                    <Button 
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
                                <Drawer.CloseTrigger className="text-[#718355] bg-[#E9F5DB] hover:bg-[#CFE1B9]" />
                                <Drawer.Header className="border-b border-[#CFE1B9]/50 pb-4 mt-4">
                                    <h2 className="text-2xl font-bold tracking-tight text-[#718355] capitalize">
                                        {session.user.role} Dashboard
                                    </h2>
                                </Drawer.Header>
                                <Drawer.Body className="px-4">
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
};