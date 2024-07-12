"use client";
import { DataTable } from "@/components/custom/data-table";
import { BrandProps, BlogColums } from "./blog-columns";
import { useTransition } from "react";
import { toast } from "sonner";
import { bulkDeleteBlogAction } from "@/actions/seller/blog-action";

interface Props {
  data: BrandProps[];
}
export const BlogClient = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const deleteData = (ids: string[]) => {
    startTransition(() => {
      bulkDeleteBlogAction(ids).then((data) => {
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
        columns={BlogColums}
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
