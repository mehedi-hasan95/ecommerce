"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { BrandCell } from "./brand-cell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BrandProps = {
  id: string;
  name: string;
  img: string;
  createdAt: string;
};

export const BrandColums: ColumnDef<BrandProps>[] = [
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
    accessorKey: "img",
    header: "Img",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Image src={row.original.img} alt="" height={40} width={40} />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          CreatedAt
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Action",
    cell: ({ row }) => <BrandCell data={row.original} />,
  },
];
