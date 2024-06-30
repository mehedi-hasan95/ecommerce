"use client";

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
import { InputForm } from "@/components/custom/input-form";
import { UpdateButton } from "@/components/loader/loader-icon";
import { Input } from "@/components/ui/input";
import { BrandSchema } from "@/schemas/schema";
import { Brand } from "@prisma/client";
import { BrandAction, UpdateBrandAction } from "@/actions/admin/brand-aciton";

interface Props {
  initialData: Brand | null;
}
export const BrandForm = ({ initialData }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const title = initialData ? "Update Brand" : "Create Brand";
  const action = initialData ? "Update" : "Create";
  const afterActin = initialData ? "Updating" : "Creating";
  // 1. Define your form.
  const form = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      name: initialData?.name || "",
      img: initialData?.img || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof BrandSchema>) {
    startTransition(() => {
      initialData
        ? UpdateBrandAction(values, initialData.id).then((data) => {
            if (data.success) {
              toast(data.success, {
                action: {
                  label: "Success",
                  onClick: () => console.log("Success"),
                },
              });
              router.push("/admin/admin-brand");
            } else {
              toast.error(data.error, {
                action: {
                  label: "error",
                  onClick: () => console.log("error"),
                },
              });
            }
          })
        : BrandAction(values).then((data) => {
            if (data.success) {
              toast(data.success, {
                action: {
                  label: "Success",
                  onClick: () => console.log("Success"),
                },
              });
              router.push("/admin/admin-brand");
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
            label="Brand Name"
            placeholder="e.g. ECO"
          />
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Image</FormLabel>
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
