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
import { ProductsSchema } from "@/schemas/schema";
import { InputForm } from "@/components/custom/input-form";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/custom/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultipleFileUpload } from "@/lib/multiple-file-upload";
import { useTransition } from "react";
import { CreateProductAction } from "@/actions/seller/product-action";
import { toast } from "sonner";
import { UpdateButton } from "@/components/loader/loader-icon";
import { useRouter } from "next/navigation";

interface Props {
  categories: { label: string; value: string }[];
  brands: { label: string; value: string }[];
}
export const ProductsForm = ({ categories, brands }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: {
      title: "",
      desc: "",
      basePrice: undefined,
      price: undefined,
      quantity: undefined,
      brandId: "",
      categoryId: "",
      offer: undefined,
      image: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProductsSchema>) {
    startTransition(() => {
      CreateProductAction(values).then((data) => {
        if (data.success) {
          toast.success(data.success, {
            action: {
              label: "Success",
              onClick: () => console.log("Success"),
            },
          });
          router.push("/dashboard/products");
        } else {
          toast.error(data.error, {
            action: {
              label: "Error",
              onClick: () => console.log("Error"),
            },
          });
        }
      });
    });
  }
  return (
    <div className="pb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputForm
            disabled={isPending}
            form={form}
            name="title"
            label="Product Name"
            placeholder="e.g. Apple"
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Desc</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-3 gap-x-3">
            <InputForm
              disabled={isPending}
              form={form}
              name="basePrice"
              label="Previous Price"
              placeholder="10.00"
            />
            <InputForm
              disabled={isPending}
              form={form}
              name="price"
              label="Sale Price"
              placeholder="10.00"
            />
            <InputForm
              disabled={isPending}
              form={form}
              name="quantity"
              label="Product Quantity"
              placeholder="150"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <FormControl>
                    <Combobox
                      disabled={isPending}
                      optoins={categories}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Brand</FormLabel>
                  <FormControl>
                    <Combobox
                      disabled={isPending}
                      optoins={brands}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-0">
                      <SelectTrigger>
                        <SelectValue placeholder="Have any offer?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BUY_ONE_GET_ONE">
                        Buy One Get One
                      </SelectItem>
                      <SelectItem value="SPECIAL_OFFERS">
                        Special Offeer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Image</FormLabel>
                <FormControl>
                  <MultipleFileUpload
                    disabled={isPending}
                    endpoint="mediaPost"
                    value={field.value.map((image) => image.url)}
                    onChange={(url: any) => {
                      const urls = url.map((item: any) => item.url);
                      field.onChange(
                        urls.map((url: string) => {
                          return { url };
                        })
                      );
                    }}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <UpdateButton>Updating</UpdateButton>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
