"use client";

import { deleteCartAction } from "@/actions/user/add-to-cart-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { FormatPrice } from "@/lib/format-price";
import { AddToCart, ProductImage } from "@prisma/client";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: AddToCart & {
    product: { title: string; price: number } & { image: ProductImage[] };
  };
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void; // New prop for removing an item
}

export const CartProduct = ({ data, updateQuantity, removeItem }: Props) => {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const increaseQuantity = () => {
    updateQuantity(data.id, data.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (data.quantity > 1) {
      updateQuantity(data.id, data.quantity - 1);
    }
  };

  const onDelete = () => {
    startTransaction(() => {
      deleteCartAction(data.id).then((result) => {
        if (result.success) {
          toast.success(result.success);
          removeItem(data.id);
          router.refresh();
        } else {
          toast.error(result.error);
        }
      });
    });
  };

  return (
    <TableRow key={data.id}>
      <TableCell className="font-medium">
        <Button onClick={onDelete} disabled={isPending} variant={"outline"}>
          <Trash2 className="size-4" />
        </Button>
      </TableCell>
      <TableCell>
        <Image
          src={data?.product?.image[0]?.url}
          alt=""
          height={50}
          width={50}
        />
      </TableCell>
      <TableCell>{data.product.title}</TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2 items-center">
          <Button
            variant={"ghost"}
            onClick={decreaseQuantity}
            className="border p-0 h-6 w-6 rounded-full"
          >
            <Minus className="w-2" />
          </Button>
          <Badge variant="outline" className="bg-white text-sm font-bold">
            {data.quantity}
          </Badge>
          <Button
            variant={"ghost"}
            onClick={increaseQuantity}
            className="border p-0 h-6 w-6 rounded-full"
          >
            <Plus className="w-2" />
          </Button>
        </div>
      </TableCell>
      <TableCell>{FormatPrice(data.product.price)}</TableCell>
      <TableCell className="text-right">
        {FormatPrice(data.product.price * data.quantity)}
      </TableCell>
    </TableRow>
  );
};
