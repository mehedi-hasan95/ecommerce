import { AddToCart } from "./add-to-cart";
import { LoginButton } from "./login-button";
import { WishList } from "./wishlist";

export const UserAction = () => {
  return (
    <div className="flex gap-x-3 items-center">
      <WishList />
      <AddToCart />
      <LoginButton />
    </div>
  );
};
