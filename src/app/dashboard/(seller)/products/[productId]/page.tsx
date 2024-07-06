import { AllBrandAction } from "@/actions/admin/brand-aciton";
import { ProductsForm } from "./_components/products-form";
import { AllCategoryAction } from "@/actions/admin/category-aciton";
import { db } from "@/lib/prisma";

const ProductsId = async ({ params }: { params: { productId: string } }) => {
  const categorys = await AllCategoryAction();
  const brand = await AllBrandAction();
  const product = await db.products.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      image: true,
    },
  });
  return (
    <div>
      <ProductsForm
        initialData={product}
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
