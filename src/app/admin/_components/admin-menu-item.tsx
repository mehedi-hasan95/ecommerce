"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
}
export const AdminMenuItem = ({ href, label }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        " hover:bg-slate-300 pl-6 transition-all font-[500] flex items-center",
        isActive &&
          "bg-sky-300/20 text-sky-700 hover:bg-sky-300/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">{label}</div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};
