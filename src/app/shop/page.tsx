import {
  AllProductsAction,
  MaxMinPriceAciton,
} from "@/actions/seller/product-action";
import { ShopClient } from "./_components/shop-client";
import { AllCategoryAction } from "@/actions/admin/category-aciton";

interface Props {
  searchParams: {
    sort: string;
    categories: string;
    price: string;
  };
}
const ShopPage = async ({ searchParams }: Props) => {
  const products = await AllProductsAction({ ...searchParams });
  const categories = await AllCategoryAction();
  const maxMinPrice = await MaxMinPriceAciton();
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <ShopClient data={products} categories={categories} price={maxMinPrice} />
    </div>
  );
};

export default ShopPage;
