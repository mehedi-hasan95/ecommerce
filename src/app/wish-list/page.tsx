import { allWishlistAction } from "@/actions/user/wishlist-action";
import { SingleProduct } from "../_home-components/single-product";

const WishListPage = async () => {
  const data = await allWishlistAction();
  return (
    <div className="max-w-screen-2xl px-6 mx-auto">
      {data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data.map((item) => (
            <SingleProduct key={item.id} data={item.product as any} />
          ))}
        </div>
      ) : (
        "No Product"
      )}
    </div>
  );
};

export default WishListPage;
