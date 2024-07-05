"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardMenu = () => {
  const pathName = usePathname();
  const isActive = pathName === "/dashboard";
  return (
    <Link
      href={"/dashboard"}
      className={cn(
        " hover:bg-slate-300 pl-6 transition-all font-[500] flex items-center",
        isActive &&
          "bg-sky-300/20 text-sky-700 hover:bg-sky-300/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">Dashboard</div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};
