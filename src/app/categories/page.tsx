import { CategoryProductCountAction } from "@/actions/user/category-brand";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

const CategoriesPage = async () => {
  const data = await CategoryProductCountAction();
  return (
    <div className="max-w-screen-2xl mx-auto px-6 flex flex-wrap gap-8 pt-3 pb-10">
      {data.map((item) => (
        <Link
          href={`/categories/${item.id}`}
          key={item.id}
          className="flex flex-col items-center justify-center h-44 w-44 rounded-md group relative"
          style={{ backgroundColor: `${item.color || "#ededed"}` }}
        >
          <Image src={item.img} alt={item.name} height={80} width={80} />
          <p className="text-xl font-semibold text-custom_gray group-hover:text-themeTwo">
            {item.name}
          </p>
          <Badge className="absolute top-3 right-3" variant={"outline"}>
            {item._count.Products}{" "}
            {item._count.Products > 1 ? "Products" : "Product"}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesPage;
