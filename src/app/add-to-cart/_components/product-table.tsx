import { ItemNotFound } from "@/components/common/error/item-not-found";
import { Button } from "@/components/ui/button";
import { FormatPrice } from "@/lib/format-price";
import { AddToCart, Products } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface Props {
  data: (AddToCart & { product: { title: string; price: number } })[];
}
export const ProductTable = ({ data }: Props) => {
  if (!data.length) {
    return <ItemNotFound headding="No product in this cart" />;
  }
  return (
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr className="text-start">
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            Remove
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            Image
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            Product
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            Price
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            Quantity
          </th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            Total
          </th>
        </tr>
      </thead>
      {data.map((item) => (
        <tbody key={item.id}>
          <tr>
            <td className="border-b border-r border-l border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              <Button variant={"outline"}>
                <Trash2 className="size-5" />
              </Button>
            </td>
            <td className="border-b border-r border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              <Image
                src="https://utfs.io/f/a2926654-ae12-425a-a81b-b9a5ab61b3c6-pfwxj4.png"
                alt=""
                height={50}
                width={50}
              />
            </td>
            <td className="border-b border-r border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              {item.product.title}
            </td>
            <td className="border-b border-r border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              {FormatPrice(item.product.price)}
            </td>
            <td className="border-b border-r border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              -1+
            </td>
            <td className="border-b border-r border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              {FormatPrice(160)}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
