import React from "react";

const StatsCards = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index} 
            className="rounded-2xl border border-[#CFE1B9]/50 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#97A97C]/50 hover:shadow-md sm:p-6"
          >
           
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F5DB] sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Icon className="h-5 w-5 text-[#718355] sm:h-7 sm:w-7" />
            </div>

      
            <p className="text-xs font-medium text-[#97A97C] sm:text-sm">
              {stat.title}
            </p>

          
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