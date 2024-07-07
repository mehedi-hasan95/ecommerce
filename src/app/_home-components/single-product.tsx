"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormatPrice } from "@/lib/format-price";
import {
  AddToCart,
  AddToWishList,
  ProductImage,
  Products,
} from "@prisma/client";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProductModal } from "./product-modal";
import { WishListButton } from "./wishlist-button";
import { useAuth } from "@clerk/nextjs";
import { AddToCartButton } from "./add-to-cart-button";

interface Props {
  data: Products & {
    image: ProductImage[];
    addToWishList: AddToWishList[];
    addToCart: AddToCart[];
  };
}
export const SingleProduct = ({ data }: Props) => {
  const { userId } = useAuth();
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="relative">
      <div className="relative group flex justify-center h-[250px] bg-slate-50">
        <div className="flex relative items-center justify-center">
          <Image src={data.image[0].url} alt="" height={100} width={100} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center flex-col">
          <div className="flex gap-2 pb-5 items-center">
            <Button
              variant={"ghost"}
              onClick={decreaseQuantity}
              className="border border-white text-white p-0 h-8 w-8 rounded-full"
            >
              <Minus className="w-4" />
            </Button>
            <Badge variant="outline" className="bg-white text-xl font-bold">
              {quantity}
            </Badge>
            <Button
              variant={"ghost"}
              onClick={increaseQuantity}
              className="border border-white text-white p-0 h-8 w-8 rounded-full"
            >
              <Plus className="w-4" />
            </Button>
          </div>
          {/* Modal  */}
          <ProductModal
            products={data}
            images={data.image}
            onCart={() => {}}
            quantity={quantity}
            setQuantity={setQuantity}
          >
            <Button
              className="w-full hover:bg-inherit text-white hover:text-themeOne"
              variant={"ghost"}
            >
              View Details
            </Button>
          </ProductModal>
        </div>
      </div>
      <Badge className="top-5 right-5 absolute">
        -
        {data.basePrice ? (
          <>
            {(((data?.basePrice - data.price) / data?.basePrice) * 100).toFixed(
              0
            )}{" "}
          </>
        ) : (
          100
        )}
        %
      </Badge>
      {/* Wishlist button  */}
      <div className="absolute top-5 left-5 cursor-pointer">
        <WishListButton
          postId={data.id}
          likes={data?.addToWishList?.map((item) => item.userId)}
        />
      </div>
      <div className="flex justify-center py-5 flex-col items-center space-y-2">
        <div className="flex gap-x-2 items-center">
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <p className="text-sm">(120)</p>
        </div>
        <p className="text-xl font-medium">{data.title}</p>
        <div className="flex gap-x-5">
          <span className="text-xl font-semibold text-custom_gray">
            {FormatPrice(data.price)}
          </span>
          <span className="text-lg line-through text-slate-400">
            {FormatPrice(data?.basePrice || 0)}
          </span>
        </div>
        <AddToCartButton data={data} quantity={quantity} />
      </div>
    </div>
  );
};
