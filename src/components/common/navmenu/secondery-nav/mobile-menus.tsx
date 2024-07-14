"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import menus from "./menu-list.json";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, ChevronDown, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { MenuItem } from "./menu-item";
import { ModifyLink } from "@/components/custom/modify-link";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const MobileMenus = () => {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  //   const isActive =
  //     (pathname === "/" && href === "/") ||
  //     pathname === href ||
  //     pathname?.startsWith(`${href}/`);
  //   const isActive =
  //     pathname === "/dashboard" || pathname?.startsWith(`/dashboard/`);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignLeft className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
          {menus.map((item) => (
            <Link href={`${item.url}`} key={item.id}>
              <SheetClose asChild className="">
                <SheetDescription
                  className={cn(
                    "transition-all font-[500] flex items-center hover:text-green-700 py-1",
                    ((pathname === "/" && item.url === "/") ||
                      pathname === item.url ||
                      pathname?.startsWith(`${item.url}/`)) &&
                      "text-green-700 hover:text-green-700 border-b-2 border-green-700"
                  )}
                >
                  {item.name}
                </SheetDescription>
              </SheetClose>
            </Link>
          ))}
          <Link href={"/special-offer"}>
            <SheetClose asChild className="">
              <SheetDescription
                className={cn(
                  "transition-all font-[500] flex items-center hover:text-green-700 py-1",
                  (pathname === "/special-offer" ||
                    pathname?.startsWith(`/special-offer/`)) &&
                    "text-green-700 hover:text-green-700 border-b-2 border-green-700"
                )}
              >
                Special Offer
              </SheetDescription>
            </SheetClose>
          </Link>
          {isSignedIn && (
            <Link href={"/dashboard"}>
              <SheetClose asChild className="">
                <SheetDescription
                  className={cn(
                    "transition-all font-[500] flex items-center hover:text-green-700 py-1",
                    (pathname === "/dashboard" ||
                      pathname?.startsWith(`/dashboard/`)) &&
                      "text-green-700 hover:text-green-700 border-b-2 border-green-700"
                  )}
                >
                  Dashboard
                </SheetDescription>
              </SheetClose>
            </Link>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
