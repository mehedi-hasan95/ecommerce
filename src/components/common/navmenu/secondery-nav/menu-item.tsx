"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
}
export const MenuItem = ({ href, label }: Props) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "transition-all font-[500] flex items-center hover:text-green-700",
        isActive &&
          "text-green-700 hover:text-green-700 border-b-2 border-green-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-2">{label}</div>
    </Link>
  );
};
