"use client";

import { AddToCartButton } from "@/app/_home-components/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCart, Products } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  product: Products & { addToCart: AddToCart[] };
}
export const ProductCartQuantity = ({ product }: Props) => {
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
    <div>
      <div className="flex gap-2 pb-3 items-center">
        <Button
          variant={"ghost"}
          onClick={decreaseQuantity}
          className="border border-custom_gray text-custom_gray p-0 h-8 w-8 rounded-full"
        >
          <Minus className="w-4" />
        </Button>
        <Badge variant="outline" className="bg-white text-xl font-bold">
          {quantity}
        </Badge>
        <Button
          variant={"ghost"}
          onClick={increaseQuantity}
          className="border border-custom_gray text-custom_gray p-0 h-8 w-8 rounded-full"
        >
          <Plus className="w-4" />
        </Button>
      </div>
      <AddToCartButton data={product} quantity={1} />
    </div>
  );
};
