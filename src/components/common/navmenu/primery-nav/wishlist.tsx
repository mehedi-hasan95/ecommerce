import { WishListCount } from "@/actions/user/wishlist-action";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export const WishList = async () => {
  const data = await WishListCount();
  return (
    <>
      <Heart className={cn("size-6", data && "fill-rose-500 text-rose-500")} />
    </>
  );
};
