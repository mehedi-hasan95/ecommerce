"use client";

import { RadioGroup } from "@/components/ui/radio-group";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Products } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";
import queryString from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import debounce from "debounce";
import { ItemNotFound } from "@/components/common/error/item-not-found";

interface Props {
  data: Products[];
  price: any;
  category: string;
}

export const CategoryClient = ({ data, price, category }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const SORT_OPTIONS = [
    { name: "None", value: "none" },
    { name: "Price: Low to High", value: "asc" },
    { name: "Price: High to Low", value: "desc" },
  ] as const;

  const DEFAULT_CUSTOM_PRICE = [price._min.price, price._max.price] as [
    number,
    number
  ];
  const PRICE_FILTERS = {
    id: "price",
    name: "Price",
    options: [
      { value: [price._min.price, price._max.price], label: "Any price" },
      {
        value: [0, 20],
        label: "Under 20$",
      },
      {
        value: [0, 40],
        label: "Under 40$",
      },
    ],
  } as const;

  const [filter, setFilter] = useState({
    sort: "none",
    categories: [] as string[],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
  });

  const handleSortChange = (sort: string) => {
    setFilter((prev) => ({ ...prev, sort }));
    updateUrl({ ...filter, sort });
  };

  const handlePriceChange = (isCustom: boolean, range: [number, number]) => {
    setFilter((prev) => ({
      ...prev,
      price: {
        isCustom,
        range,
      },
    }));
    debouncedUpdateUrl({
      ...filter,
      price: { isCustom, range },
    });
  };

  const updateUrl = (updatedFilter: {
    sort: string;
    categories: string[];
    price: { isCustom: boolean; range: [number, number] };
  }) => {
    const queryParams: { [key: string]: string | string[] } = {};

    if (updatedFilter.sort !== "none") {
      queryParams.sort = updatedFilter.sort;
    }

    if (updatedFilter.categories.length > 0) {
      queryParams.categories = updatedFilter.categories.join(",");
    }

    const { isCustom, range } = updatedFilter.price;
    if (
      !isCustom ||
      range[0] !== DEFAULT_CUSTOM_PRICE[0] ||
      range[1] !== DEFAULT_CUSTOM_PRICE[1]
    ) {
      queryParams.price = range.join(",");
    }

    const newUrl = queryString.stringifyUrl(
      {
        url: pathName,
        query: queryParams,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(newUrl);
  };

  const debouncedUpdateUrl = useCallback(debounce(updateUrl, 500), [filter]);

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-1 border-r pr-2 shadow-sm">
        {/* Price  */}
        <Accordion type="multiple" className="w-full" defaultValue={["price"]}>
          <AccordionItem value="price">
            <AccordionTrigger className="bg-themeOne px-3">
              Price
            </AccordionTrigger>
            <AccordionContent className="pt-6 animate-none">
              <RadioGroup defaultValue="comfortable">
                <ul className="space-y-4">
                  {PRICE_FILTERS.options.map((item, idx) => (
                    <li key={idx}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={`price-${idx}`}
                          id={`price-${idx}`}
                          onChange={() => {
                            handlePriceChange(false, [...item.value]);
                          }}
                          checked={
                            !filter.price.isCustom &&
                            filter.price.range[0] === item.value[0] &&
                            filter.price.range[1] === item.value[1]
                          }
                        />
                        <Label htmlFor={`price-${idx}`}>{item.label}</Label>
                      </div>
                    </li>
                  ))}
                  <li className="flex justify-center flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`price-${PRICE_FILTERS.options.length}`}
                        onChange={() => {
                          handlePriceChange(true, DEFAULT_CUSTOM_PRICE);
                        }}
                        checked={filter.price.isCustom}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`price-${PRICE_FILTERS.options.length}`}
                        className="ml-3 text-sm text-gray-600 font-semibold"
                      >
                        Custom
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <p className="font-medium">Price</p>
                      <div>
                        {filter.price.isCustom
                          ? minPrice.toFixed(0)
                          : filter.price.range[0].toFixed(0)}{" "}
                        € -{" "}
                        {filter.price.isCustom
                          ? maxPrice.toFixed(0)
                          : filter.price.range[1].toFixed(0)}{" "}
                        €
                      </div>
                    </div>

                    <Slider
                      className={cn({
                        "opacity-50": !filter.price.isCustom,
                      })}
                      disabled={!filter.price.isCustom}
                      onValueChange={(range) => {
                        const [newMin, newMax] = range;

                        setFilter((prev) => ({
                          ...prev,
                          price: {
                            isCustom: true,
                            range: [newMin, newMax],
                          },
                        }));
                        debouncedUpdateUrl({
                          ...filter,
                          price: { isCustom: true, range: [newMin, newMax] },
                        });
                      }}
                      value={
                        filter.price.isCustom
                          ? filter.price.range
                          : DEFAULT_CUSTOM_PRICE
                      }
                      min={DEFAULT_CUSTOM_PRICE[0]}
                      defaultValue={DEFAULT_CUSTOM_PRICE}
                      max={DEFAULT_CUSTOM_PRICE[1]}
                      step={5}
                    />
                  </li>
                </ul>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-3">
        <div className="flex justify-between items-center gap-x-10 py-5">
          <div className="text-custom_gray text-2xl font-bold">
            {category} Collection
          </div>
          <div className="flex gap-x-7">
            <p className="text-sm">{data.length} Products Found</p>
            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex justify-center text-sm text-gray-700 hover:text-gray-900">
                Default Sorting{" "}
                <ChevronDown className="-mr-1 ml-1 size-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
        <Separator className="mb-2" />
        {data.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((item) => (
              <SingleProduct key={item.id} data={item as any} />
            ))}
          </div>
        ) : (
          <ItemNotFound title="Product" />
        )}
      </div>
    </div>
  );
};
