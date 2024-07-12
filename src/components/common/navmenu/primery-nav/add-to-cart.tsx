import { AllCartAction } from "@/actions/user/add-to-cart-action";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export const AddToCart = async () => {
  const data = await AllCartAction();
  return (
    <Link href="/add-to-cart" className="relative">
      <Badge variant={"destructive"} className="absolute -right-2 -top-6">
        {data?.length ? data.length : 0}
      </Badge>
      <ShoppingBag />
    </Link>
  );
};
