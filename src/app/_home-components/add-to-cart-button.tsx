"use client";

import { AddToCartAction } from "@/actions/user/add-to-cart-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { AddToCart, Products } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Products & { addToCart: AddToCart[] };
  quantity: number;
}
export const AddToCartButton = ({ data, quantity }: Props) => {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const addCart = async () => {
    startTransition(() => {
      const values = {
        productId: data.id,
        quantity,
        offer: data.offer || undefined,
      };
      AddToCartAction(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };
  const inCart = () => {
    toast.error("Already in Cart");
  };
  return (
    <>
      {data.addToCart.some(
        (item) => item.productId === data.id && item.userId === userId
      ) ? (
        <Button
          onClick={inCart}
          className={cn(
            "text-sm border border-theme text-whiteTwo text-themeTwo rounded-full px-7 py-2 hover:bg-themeTwo hover:text-white"
          )}
          variant={"ghost"}
        >
          Added
        </Button>
      ) : (
        <Button
          onClick={addCart}
          disabled={isPending}
          className={cn(
            "text-sm border border-theme text-whiteTwo text-themeTwo rounded-full px-7 py-2 hover:bg-themeTwo hover:text-white"
          )}
          variant={"ghost"}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
};
