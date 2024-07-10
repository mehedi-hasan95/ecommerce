import {
  inCategoryAction,
  singleCategoryProductsAction,
} from "@/actions/user/category-brand";
import { SingleProduct } from "@/app/_home-components/single-product";
import { ItemNotFound } from "@/components/common/error/item-not-found";

const CategoryId = async ({ params }: { params: { categoryId: string } }) => {
  const isCategory = await inCategoryAction(params.categoryId);
  if (!isCategory) {
    return <ItemNotFound title="Category" />;
  }
  const data = await singleCategoryProductsAction(isCategory.id);
  if (!data.length) {
    return <ItemNotFound headding="No Product in this category" />;
  }
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {data?.map((item) => (
        <SingleProduct key={item.id} data={item} />
      ))}
    </div>
  );
};

export default CategoryId;
