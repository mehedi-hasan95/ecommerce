import { Delete, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Products } from "@prisma/client";

interface Props {
  product: Products;
}

export const ProductTabs = ({ product }: Props) => {
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
        <h4 className="text-2xl font-bold pb-5">Customer Reviews</h4>
        <div className="flex gap-x-3">
          <div>
            <Image
              src={"https://github.com/shadcn.png"}
              alt=""
              height={70}
              width={70}
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between w-full">
              <div>
                <h5 className="font-semibold">Customer Name</h5>
                <p>09 Jul, 2024 at 8:24 AM</p>
              </div>
              <div className="flex gap-x-4">
                <Pencil className="size-6" />
                <Delete className="size-6" />
              </div>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              dolorum animi aspernatur in eum id corporis, quibusdam cumque
              molestiae nihil!Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quas dolorum animi aspernatur in eum id corporis, quibusdam
              cumque molestiae nihil!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quas dolorum animi aspernatur in eum id
              corporis, quibusdam cumque molestiae nihil!Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quas dolorum animi aspernatur
              in eum id corporis, quibusdam cumque molestiae nihil!Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quas dolorum animi
              aspernatur in eum id corporis, quibusdam cumque molestiae nihil!
            </p>
            <div>
              <h3 className="text-lg font-bold">Leave your Review</h3>
              <p>Your Ratting</p>
            </div>
          </div>
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
