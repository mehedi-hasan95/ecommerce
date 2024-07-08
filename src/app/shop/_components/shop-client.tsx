"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Category, Products } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import queryString from "query-string";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  data: Products[];
  categories: Category[];
}
export const ShopClient = ({ data, categories }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const SORT_OPTIONS = [
    { name: "None", value: "none" },
    { name: "Price: Low to High", value: "asc" },
    { name: "Price: High to Low", value: "desc" },
  ] as const;
  const [filter, setFilter] = useState({ sort: "none" });
  const handleSortChange = (sort: string) => {
    setFilter((prev) => ({ ...prev, sort }));

    const queryParams = sort === "none" ? {} : { sort };
    const newUrl = queryString.stringifyUrl(
      {
        url: pathName,
        query: queryParams,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(newUrl);
  };
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
                  onClick={() => handleSortChange(item.value)}
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
        <div className="col-span-1">
          <Accordion type="multiple" className="animate-none">
            <AccordionItem value="categories">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                Categories
              </AccordionTrigger>
              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {categories.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={item.id}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <label
                        htmlFor={item.id}
                        className="ml-3 text-sm text-gray-600 cursor-pointer"
                      >
                        {item.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
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
