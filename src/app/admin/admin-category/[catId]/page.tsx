import { db } from "@/lib/prisma";
import { CategoryForm } from "../_components/category-form";

const CategoryId = async ({ params }: { params: { catId: string } }) => {
  const category = await db.category.findUnique({
    where: { id: params.catId },
  });
  return (
    <div>
      <CategoryForm initialData={category} />
    </div>
  );
};

export default CategoryId;
