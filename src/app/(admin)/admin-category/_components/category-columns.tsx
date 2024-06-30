"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryProps = {
  id: string;
  name: string;
  color: string | null;
  img: string;
};

export const columns: ColumnDef<CategoryProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Color
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color ? row.original.color : "No BG"}
        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: row.original.color || "#000" }}
        />
      </div>
    ),
  },
  {
    accessorKey: "img",
    header: "Img",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Image src={row.original.img} alt="" height={40} width={40} />
      </div>
    ),
  },
];
