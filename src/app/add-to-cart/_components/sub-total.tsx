"use client";

import { Button } from "@/components/ui/button";
import { FormatPrice } from "@/lib/format-price";
import { AddToCart, ProductImage } from "@prisma/client";
import { useState } from "react";

interface Props {
  data: (AddToCart & {
    product: { title: string; price: number } & { image: ProductImage[] };
  })[];
}
export const SubTotal = ({ data }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = data.reduce((acc, cur) => {
    const itemPrice = cur.quantity * cur.product.price;
    return acc + itemPrice;
  }, 0);

  const onCart = async () => {
    setIsLoading(true);
    try {
      // const rettriveData = { data };
      const response = await fetch("/api/payment", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();
      if (result) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-4 bg-gray-100 px-5 pt-10 pb-20">
      <div className="flex flex-col gap-y-4">
        {data.map((item) => (
          <div key={item.id} className="grid grid-cols-5 gap-x-3">
            <h4 className="line-clamp-1 col-span-3">{item.product.title}</h4>
            <div className="col-span-2 flex items-center gap-x-2 justify-end">
              <h4>{item.quantity}</h4>
              <p>X</p>
              <h4>{FormatPrice(item.product.price)}</h4>
              <p>=</p>
              <h4>{FormatPrice(item.quantity * item.product.price)}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Subtotal</h2>
        <h2 className="text-xl font-semibold">{FormatPrice(totalPrice)}</h2>
      </div>
      <Button onClick={onCart} disabled={!data.length || isLoading}>
        {isLoading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
};
