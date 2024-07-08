import { AllProductsAction } from "@/actions/seller/product-action";
import { ShopClient } from "./_components/shop-client";

const ShopPage = async () => {
  const products = await AllProductsAction();
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <ShopClient data={products} />
    </div>
  );
};

export default ShopPage;
