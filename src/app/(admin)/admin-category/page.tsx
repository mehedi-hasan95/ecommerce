import { db } from "@/lib/prisma";
import { CategoryClient } from "./_components/category-client";

const CategoryPage = async () => {
  const data = await db.category.findMany();
  const formatedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    color: item.color,
    img: item.img,
  }));
  return (
    <div>
      <CategoryClient data={formatedData} />
    </div>
  );
};

export default CategoryPage;
