"use client";
import { DataTable } from "@/components/custom/data-table";
import { CategoryProps, columns } from "./category-columns";
import { useTransition } from "react";
import { BulkDeleteCategoryAction } from "@/actions/admin/category-aciton";
import { toast } from "sonner";

interface Props {
  data: CategoryProps[];
}
export const CategoryClient = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const deleteData = (ids: string[]) => {
    startTransition(() => {
      BulkDeleteCategoryAction(ids).then((data) => {
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
        columns={columns}
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
