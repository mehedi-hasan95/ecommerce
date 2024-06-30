"use client";
import Link from "next/link";
import { AdminMenuItem } from "./admin-menu-item";
import menus from "./admin-menu-list.json";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const AdminMenus = () => {
  const pathName = usePathname();
  const isActive = pathName === "/admin";
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <Link
        href={"/admin"}
        className={cn(
          " hover:bg-slate-300 pl-6 transition-all font-[500] flex items-center",
          isActive &&
            "bg-sky-300/20 text-sky-700 hover:bg-sky-300/20 hover:text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">Admin</div>
        <div
          className={cn(
            "ml-auto h-full border-2 border-sky-700 opacity-0 transition-all",
            isActive && "opacity-100"
          )}
        />
      </Link>
      {menus.map((menu) => (
        <AdminMenuItem key={menu.id} href={menu.url} label={menu.name} />
      ))}
    </div>
  );
};
