import { AllBrandAction } from "@/actions/admin/brand-aciton";
import { ProductsForm } from "./_components/products-form";
import { AllCategoryAction } from "@/actions/admin/category-aciton";

const ProductsId = async ({ params }: { params: { productId: string } }) => {
  const categorys = await AllCategoryAction();
  const brand = await AllBrandAction();
  return (
    <div>
      <ProductsForm
        categories={categorys.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }))}
        brands={brand.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }))}
      />
    </div>
  );
};

export default ProductsId;
