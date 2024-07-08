"use client";
import { SingleProduct } from "@/app/_home-components/single-product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  AddToCart,
  AddToWishList,
  ProductImage,
  Products,
} from "@prisma/client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  data: Products[];
}
export const ShopClient = ({ data }: Props) => {
  console.log(data);
  const SORT_OPTIONS = [
    { name: "None", value: "none" },
    { name: "Price: Low to High", value: "asc" },
    { name: "Price: High to Low", value: "dsc" },
  ] as const;
  const [filter, setFilter] = useState({ sort: "none" });
  return (
    <div>
      <div className="flex justify-between items-center gap-x-10">
        <h2 className="text-3xl font-bold">Page title</h2>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort{" "}
              <ChevronDown className="-mr-1 ml-1 size-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SORT_OPTIONS.map((item) => (
                <button
                  className={cn("text-left w-full block px-4 py-2 text-sm", {
                    "text-gray-900 bg-gray-100": item.value === filter.sort,
                    "text-gray-500": item.value !== filter.sort,
                  })}
                  key={item.value}
                  onClick={() => {
                    setFilter((prev) => ({ ...prev, sort: item.value }));
                  }}
                >
                  {item.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="my-5" />
      {/* Products  */}
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1">Mehedi</div>
        <div className="col-span-3">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((item) => (
              <SingleProduct key={item.id} data={item as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
