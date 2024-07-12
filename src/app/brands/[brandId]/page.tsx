import {
  inbrandAction,
  singlebrandProductsAction,
} from "@/actions/user/category-brand";
import { ItemNotFound } from "@/components/common/error/item-not-found";
import { BrandClient } from "./brand-client";
import { MaxMinPriceAciton } from "@/actions/seller/product-action";
import { AllCategoryAction } from "@/actions/admin/category-aciton";
import { AllBrandAction } from "@/actions/admin/brand-aciton";

interface Props {
  searchParams: {
    sort: string;
    price: string;
    categories: string;
  };
  params: {
    brandId: string;
  };
}

export async function generateStaticParams() {
  const posts = await AllBrandAction();

  return posts.map((post) => ({
    brandId: post.id,
  }));
}
const BrandId = async ({ params, searchParams }: Props) => {
  const isBrand = await inbrandAction(params.brandId);
  if (!isBrand) {
    return <ItemNotFound title="Brand" />;
  }
  const data = await singlebrandProductsAction(isBrand.id, {
    ...searchParams,
  });
  const categories = await AllCategoryAction();
  const maxMinPrice = await MaxMinPriceAciton();
  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <BrandClient
        data={data}
        price={maxMinPrice}
        categories={categories}
        brand={isBrand.name}
      />
    </div>
  );
};

export default BrandId;
