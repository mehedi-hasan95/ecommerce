import { WishListCount } from "@/actions/user/wishlist-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

export const WishList = async () => {
  const data = await WishListCount();
  return (
    <Link href={"/wish-list"} className="relative">
      <Badge variant={"destructive"} className="absolute -right-2 -top-6">
        {data ? data : 0}
      </Badge>
      <Heart className={cn("size-6", data && "fill-rose-500 text-rose-500")} />
    </Link>
  );
};
