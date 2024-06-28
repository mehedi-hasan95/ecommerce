import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";

export const AddToCart = () => {
  return (
    <div className="relative">
      <Badge variant={"destructive"} className="absolute -right-2 -top-6">
        0
      </Badge>
      <ShoppingBag />
    </div>
  );
};
