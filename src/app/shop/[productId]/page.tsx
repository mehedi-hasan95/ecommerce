import { SingleProductAction } from "@/actions/seller/product-action";
import { ImageTabs } from "@/app/_home-components/image-tabs";
import { WishListButton } from "@/app/_home-components/wishlist-button";
import { FormatPrice } from "@/lib/format-price";
import { ProductTabs } from "./_components/product-tabs";
import { ProductCartQuantity } from "./_components/product-cart-quantity";
import { ItemNotFound } from "@/components/common/error/item-not-found";
import { db } from "@/lib/prisma";

export async function generateStaticParams() {
  const posts = await db.products.findMany();

  return posts.map((post) => ({
    productId: post.id,
  }));
}
const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await SingleProductAction(params.productId);
  if (!product) {
    return <ItemNotFound />;
  }
  return (
    <div className="max-w-screen-2xl px-6 py-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-x-10 gap-y-5">
        <div className="md:col-span-1">
          <ImageTabs images={product?.image} />
        </div>
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold pb-10">{product.title}</h2>
          <div className="flex gap-x-2">
            <h4 className="text-lg font-semibold">
              {FormatPrice(product.price)}
            </h4>
            <h4 className="text-lg font-semibold line-through text-gray-400">
              {FormatPrice(product.basePrice || 0)}
            </h4>
          </div>
          <div>
            <h4 className="text-md font-medium">Quick Overview</h4>
            <p className="line-clamp-2">{product.desc}</p>
          </div>
          <ProductCartQuantity product={product} />
          <div className="flex gap-x-10">
            <div className="flex gap-x-2 items-center">
              <WishListButton
                likes={product.addToWishList.map((item) => item.userId)}
                postId={product.id}
              />{" "}
              <p>Wishlist</p>
            </div>
            <div className="">Share</div>
          </div>
        </div>
      </div>
      <div className="my-20 bg-slate-100 py-10 px-6">
        <ProductTabs product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
