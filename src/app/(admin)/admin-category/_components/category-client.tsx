"use client";
import { DataTable } from "@/components/custom/data-table";
import { CategoryProps, columns } from "./category-columns";

interface Props {
  data: CategoryProps[];
}
export const CategoryClient = ({ data }: Props) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          //   deleteTransactions.mutate({ ids });
        }}
        searchKey="name"
      />
    </div>
  );
};
