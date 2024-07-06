"use client";
import { DataTable } from "@/components/custom/data-table";
import { ProductsProps, ProductsColums } from "./products-columns";
import { useTransition } from "react";
import { toast } from "sonner";
import { BulkDeleteProductAction } from "@/actions/seller/product-action";

interface Props {
  data: ProductsProps[];
}
export const ProductsClient = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const deleteData = (ids: string[]) => {
    startTransition(() => {
      BulkDeleteProductAction(ids).then((data) => {
        if (data.success) {
          console.log("fuck");
          toast(data.success);
        } else {
          toast(data.error);
        }
      });
    });
  };
  return (
    <div>
      <DataTable
        columns={ProductsColums}
        data={data}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteData(ids);
        }}
        searchKey="title"
      />
    </div>
  );
};
