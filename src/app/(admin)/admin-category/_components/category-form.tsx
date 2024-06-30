"use client";

import { CategorySchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUpload } from "@/lib/file-upload";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CategoryAction,
  UpdateCategoryAction,
} from "@/actions/admin/category-aciton";
import { Category } from "@prisma/client";
import { InputForm } from "@/components/custom/input-form";
import { UpdateButton } from "@/components/loader/loader-icon";
import { Input } from "@/components/ui/input";

interface Props {
  initialData: Category | null;
}
export const CategoryForm = ({ initialData }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const title = initialData ? "Update Category" : "Create Category";
  const action = initialData ? "Update" : "Create";
  const afterActin = initialData ? "Updating" : "Creating";
  // 1. Define your form.
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: initialData?.name || "",
      img: initialData?.img || "",
      color: initialData?.color || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CategorySchema>) {
    startTransition(() => {
      initialData
        ? UpdateCategoryAction(values, initialData.id).then((data) => {
            if (data.success) {
              toast(data.success, {
                action: {
                  label: "Success",
                  onClick: () => console.log("Success"),
                },
              });
              router.push("/admin-category");
            } else {
              toast.error(data.error, {
                action: {
                  label: "error",
                  onClick: () => console.log("error"),
                },
              });
            }
          })
        : CategoryAction(values).then((data) => {
            if (data.success) {
              toast(data.success, {
                action: {
                  label: "Success",
                  onClick: () => console.log("Success"),
                },
              });
              router.push("/admin-category");
            } else {
              toast.error(data.error, {
                action: {
                  label: "error",
                  onClick: () => console.log("error"),
                },
              });
            }
          });
    });
  }
  return (
    <div className="pb-5">
      <h2 className="text-2xl font-bold py-4">{title}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputForm
            form={form}
            name="name"
            disabled={isPending}
            label="Category Name"
            placeholder="e.g. Fish"
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <div className="flex gap-x-2 items-center">
                    <Input placeholder="e.g. #ededed" {...field} />
                    <div
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: field.value }}
                    />
                  </div>
                </FormControl>

                <FormDescription>Input your hex code.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <FileUpload
                    disabled={isPending}
                    endpoint="productImage"
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isPending ? (
            <UpdateButton>{afterActin}</UpdateButton>
          ) : (
            <Button type="submit">{action}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
