import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddToWishList, ProductImage, Products } from "@prisma/client";
import { Eye, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { ImageTabs } from "./image-tabs";
import { FormatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  products: Products;
  onCart: (value: string) => void;
  children: React.ReactNode;
  quantity?: any;
  setQuantity?: any;
  images: ProductImage[];
}

export const ProductModal = ({
  quantity,
  setQuantity,
  products,
  onCart,
  images,
  children,
}: ProductModalProps) => {
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:min-w-max">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <ImageTabs images={images} />
          </div>
          <DialogHeader>
            <p className="pt-5 flex gap-10 pb-5">
              <span>STATUS</span> <span className="text-theme">In Stock</span>
            </p>
            <DialogTitle>{products.title}</DialogTitle>
            {/* Todo Rettitns  */}
            <DialogDescription>
              <div className="flex gap-2 items-center py-5">
                <h4 className="text-lg font-medium line-through">
                  {FormatPrice(products?.basePrice || 0)}
                </h4>
                <h4 className="text-lg font-medium">
                  {FormatPrice(products.price)}
                </h4>
              </div>
              {/* Increase Decrease button  */}
              <div className="flex gap-2 pb-5 items-center">
                <Button
                  variant={"ghost"}
                  onClick={decreaseQuantity}
                  className="bg-white p-0 h-8 w-8 rounded-full"
                >
                  <Minus className="w-4" />
                </Button>
                <Badge variant="outline" className="bg-white text-xl font-bold">
                  {quantity}
                </Badge>
                <Button
                  variant={"ghost"}
                  onClick={increaseQuantity}
                  className="bg-white p-0 h-8 w-8 rounded-full"
                >
                  <Plus className="w-4" />
                </Button>
              </div>

              {/* Add to Cart  */}
              <Button
                onClick={() => onCart(products.id)}
                className={cn(
                  "text-sm border border-theme text-whiteTwo text-themeTwo rounded-full px-7 py-2 hover:bg-themeTwo hover:text-white"
                )}
                variant={"ghost"}
              >
                Add to Cart
              </Button>
              {/* To Do  */}
              {/* <div className="py-5">
                <WishListButton item={products as any} wish={wish} />
              </div> */}
              <div className="mt-5">
                <Link href={`/shop/${products.id}`}>
                  <Button
                    variant={"ghost"}
                    className="hover:text-theme underline"
                  >
                    <Eye className="mr-2 h-6 w-6" />
                    View More Details
                  </Button>
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};
