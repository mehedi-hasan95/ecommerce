"use client";
import { DataTable } from "@/components/custom/data-table";
import { BrandProps, BrandColums } from "./brand-columns";
import { useTransition } from "react";
import { toast } from "sonner";
import { BulkDeleteBrandAction } from "@/actions/admin/brand-aciton";

interface Props {
  data: BrandProps[];
}
export const BrandClient = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const deleteData = (ids: string[]) => {
    startTransition(() => {
      BulkDeleteBrandAction(ids).then((data) => {
        if (data.success) {
          toast(data.success);
        } else {
          data.error;
        }
      });
    });
  };
  return (
    <div>
      <DataTable
        columns={BrandColums}
        data={data}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteData(ids);
        }}
        searchKey="name"
      />
    </div>
  );
};
