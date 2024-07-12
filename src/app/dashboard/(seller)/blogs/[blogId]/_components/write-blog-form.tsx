"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { WriteBlogSchema } from "@/schemas/schema";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@/components/custom/editor";
import { FileUpload } from "@/lib/file-upload";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createBlogAction,
  updateBlogActoin,
} from "@/actions/seller/blog-action";
import { toast } from "sonner";
import { Blog } from "@prisma/client";
import { UpdateButton } from "@/components/loader/loader-icon";

interface Props {
  initialData: Blog | null;
}
export const WriteBlogForm = ({ initialData }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const title = initialData ? "Update Blog" : "Create Blog";
  const action = initialData ? "Update" : "Create";
  const afterAction = initialData ? "Updating" : "Creating";
  // 1. Define your form.
  const form = useForm<z.infer<typeof WriteBlogSchema>>({
    resolver: zodResolver(WriteBlogSchema),
    defaultValues: initialData || {
      title: "",
      short_desc: "",
      desc: "",
      image: "",
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags" as never,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof WriteBlogSchema>) {
    startTransition(() => {
      initialData
        ? updateBlogActoin(values, initialData.id).then((data) => {
            if (data.success) {
              toast.success(data.success);
              router.push("/dashboard/blogs");
            } else {
              toast.error(data.error);
            }
          })
        : createBlogAction(values).then((data) => {
            if (data.success) {
              toast.success(data.success);
              router.push("/dashboard/blogs");
            } else {
              toast.error(data.error);
            }
          });
    });
  }
  return (
    <div className="pb-10">
      <h2 className="text-2xl font-bold pb-5">{title}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Blog Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="short_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Blog Short Desc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Editor disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Tags</FormLabel>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <FormItem
                  key={field.id}
                  className="flex items-center space-x-2"
                >
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...form.register(`tags.${index}` as const)}
                    />
                  </FormControl>
                  <Button
                    disabled={isPending}
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </FormItem>
              ))}
            </div>
            <Button
              disabled={isPending}
              type="button"
              onClick={() => append("")}
              className="mt-2 bg-themeTwo"
            >
              Add Tag
            </Button>
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <FileUpload
                    disabled={isPending}
                    endpoint="productImage"
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <UpdateButton>{afterAction}</UpdateButton>
          ) : (
            <Button type="submit">{action}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
