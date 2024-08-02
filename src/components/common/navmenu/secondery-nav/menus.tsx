"use client";
import { useUser } from "@clerk/nextjs";
import { MenuItem } from "./menu-item";
import menus from "./menu-list.json";
import { usePathname } from "next/navigation";
import { ModifyLink } from "@/components/custom/modify-link";

export const Menus = () => {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const isActive =
    pathname === "/dashboard" || pathname?.startsWith(`/dashboard/`);
  return (
    <div className="flex gap-y-3 md:gap-x-4 lg:gap-x-9">
      {menus.map((menu) => (
        <MenuItem key={menu.id} href={menu.url} label={menu.name} />
      ))}
      {isSignedIn && (
        <ModifyLink isActive={isActive} href="/dashboard" label="Dashboard" />
      )}
    </div>
  );
};
