import {
  inCategoryAction,
  singleCategoryProductsAction,
} from "@/actions/user/category-brand";
import { ItemNotFound } from "@/components/common/error/item-not-found";
import { CategoryClient } from "./category-client";
import { MaxMinPriceAciton } from "@/actions/seller/product-action";
import { AllCategoryAction } from "@/actions/admin/category-aciton";

interface Props {
  searchParams: {
    sort: string;
    price: string;
  };
  params: {
    categoryId: string;
  };
}

export async function generateStaticParams() {
  const posts = await AllCategoryAction();

  return posts.map((post) => ({
    categoryId: post.id,
  }));
}
const CategoryId = async ({ params, searchParams }: Props) => {
  const isCategory = await inCategoryAction(params.categoryId);
  if (!isCategory) {
    return <ItemNotFound title="Category" />;
  }
  const data = await singleCategoryProductsAction(isCategory.id, {
    ...searchParams,
  });
  const maxMinPrice = await MaxMinPriceAciton();
  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <CategoryClient
        data={data}
        price={maxMinPrice}
        category={isCategory.name}
      />
    </div>
  );
};

export default CategoryId;
