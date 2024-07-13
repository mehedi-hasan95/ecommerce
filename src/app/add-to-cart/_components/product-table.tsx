"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemNotFound } from "@/components/common/error/item-not-found";
import { AddToCart, ProductImage } from "@prisma/client";
import { CartProduct } from "./cart-product";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import {
  deleteAllCartAction,
  updateCartAction,
} from "@/actions/user/add-to-cart-action";
import { toast } from "sonner";
import { FormatPrice } from "@/lib/format-price";
import { useRouter } from "next/navigation";

interface Props {
  data: (AddToCart & {
    product: { title: string; price: number } & { image: ProductImage[] };
  })[];
}

export const ProductTable = ({ data }: Props) => {
  const [cartData, setCartData] = useState(data);
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const updateQuantity = (id: string, quantity: number) => {
    setCartData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const totalPrice = cartData.reduce((acc, cur) => {
    const itemPrice = cur.quantity * cur.product.price;
    return acc + itemPrice;
  }, 0);

  const handleUpdateCart = async () => {
    const updatedItems = cartData.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    startTransaction(() => {
      updateCartAction(updatedItems).then((data) => {
        if (data.success) {
          toast.success("Product updated successfully");
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  const removeAllCart = () => {
    startTransaction(() => {
      deleteAllCartAction().then((data) => {
        if (data.success) {
          toast.success(data.success);
          setCartData([]);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  if (!cartData.length) {
    return <ItemNotFound headding="No product in this cart" />;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Remove</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartData.map((item) => (
            <CartProduct
              data={item}
              key={item.id}
              updateQuantity={updateQuantity}
              removeItem={removeItem} // Pass the removeItem function
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {FormatPrice(totalPrice)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-between items-center pt-4">
        <Button
          disabled={isPending}
          onClick={handleUpdateCart}
          className="bg-green-600 hover:bg-green-600/80"
        >
          Update Cart
        </Button>
        <Button
          onClick={removeAllCart}
          disabled={isPending}
          variant={"destructive"}
        >
          Remove All
        </Button>
      </div>
    </>
  );
};
