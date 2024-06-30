import Link from "next/link";
import { CategoryClient } from "./_components/category-client";
import { AllCategoryAction } from "@/actions/admin/category-aciton";
import { Button } from "@/components/ui/button";

const CategoryPage = async () => {
  const data = await AllCategoryAction();

  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-2xl font-bold">Category List</h2>
        <Link href={"/admin/admin-category/new"}>
          <Button>Create One</Button>
        </Link>
      </div>
      <CategoryClient data={data} />
    </div>
  );
};

export default CategoryPage;
