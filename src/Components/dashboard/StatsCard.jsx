import React from "react";
import { 
  Palette, 
  ShoppingBag, 
  DollarSign, 
  Eye, 
  CreditCard, 
  Bookmark, 
  Users 
} from "lucide-react";

// Hardcoded initial data for the Artist role
const artistStats = [
  {
    id: 1,
    title: "Total Artworks",
    value: 24,
    icon: Palette,
  },
  {
    id: 2,
    title: "Total Sales",
    value: 15,
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: "Total Earnings",
    value: "$4,250",
    icon: DollarSign,
  },
  {
    id: 4,
    title: "Profile Views",
    value: "1,284",
    icon: Eye,
  },
];

// Hardcoded initial data for the Buyer (Collector) role
const buyerStats = [
  {
    id: 1,
    title: "Artworks Collected",
    value: 5,
    icon: Palette,
  },
  {
    id: 2,
    title: "Total Invested",
    value: "$1,250",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Saved to Wishlist",
    value: 12,
    icon: Bookmark,
  },
  {
    id: 4,
    title: "Artists Followed",
    value: 8,
    icon: Users,
  },
];

// FIXED: Now accepting the full 'user' object as a prop
const StatsCards = ({ user }) => {
  // Safely extract the role, falling back to 'buyer' if it's somehow missing
  const role = user?.role || "buyer";

  // Determine which array to use based on the extracted role
  const stats = role === "artist" ? artistStats : buyerStats;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-[#CFE1B9]/50 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#97A97C]/50 hover:shadow-md sm:p-6"
          >
            {/* Icon Wrapper */}
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F5DB] sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Icon className="h-5 w-5 text-[#718355] sm:h-7 sm:w-7" />
            </div>

            {/* Title */}
            <p className="text-xs font-medium text-[#97A97C] sm:text-sm">
              {stat.title}
            </p>

            {/* Value */}
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#718355] sm:mt-2 sm:text-4xl">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;