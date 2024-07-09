"use client";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Products, Ratings } from "@prisma/client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { format } from "date-fns";
import { CreateRatingsAction } from "@/actions/seller/ratings-action";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  comment: z.string().optional(),
});

interface Props {
  product: Products & { ratings: Ratings[] };
}

export const ProductTabs = ({ product }: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const [review, setReview] = useState(0);
  const handleStarClick = (selectedRating: number) => {
    setReview(selectedRating === review ? 0 : selectedRating);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransaction(() => {
      CreateRatingsAction(product.id, review, values.comment as string).then(
        (data) => {
          if (data?.error) {
            toast.error(data.error, {
              action: {
                label: "Error",
                onClick: () => console.log("Error"),
              },
            });
          } else {
            setReview(0);
            form.reset();
            router.refresh();
          }
        }
      );
    });
  }
  return (
    <Tabs defaultValue="description">
      <TabsList className="pb-10">
        <TabsTrigger
          value="description"
          className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
        >
          Reviews
        </TabsTrigger>
        <TabsTrigger
          value="information"
          className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
        >
          Information
        </TabsTrigger>
        <TabsTrigger
          value="tags"
          className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
        >
          Tags
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="bg-white p-5">
        {product.desc}
      </TabsContent>
      <TabsContent value="reviews" className="bg-white p-5">
        <div className="pb-5">
          <h3 className="text-lg font-bold">Leave your Review</h3>
          <p className="py-2">Your Ratting</p>
          <div className="flex items-center pb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleStarClick(star)}>
                <Star
                  className={`cursor-pointer md:text-3xl lg:text-4xl ${
                    star <= review
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </span>
            ))}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Your Review" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={review < 1 || isPending} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <h4 className="text-2xl font-bold pb-5">Customer Reviews</h4>
        <div className="space-y-5">
          {product?.ratings?.map((item) => (
            <div key={item.id} className="flex gap-x-3">
              <div>
                <Image
                  src={user?.imageUrl || "https://github.com/shadcn.png"}
                  alt=""
                  height={70}
                  width={70}
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between w-full">
                  <div>
                    <h5 className="font-semibold">{user?.fullName}</h5>
                    <p>
                      {format(item?.createdAt, "MMMM do, yyyy")} at{" "}
                      {format(item?.createdAt, "h:mm a")}
                    </p>
                  </div>
                </div>
                <p className="text-sm">{item.comments}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="information" className="bg-white p-5">
        {product.desc}
      </TabsContent>
      <TabsContent value="tags" className="bg-white p-5">
        Comming Soon
      </TabsContent>
    </Tabs>
  );
};
