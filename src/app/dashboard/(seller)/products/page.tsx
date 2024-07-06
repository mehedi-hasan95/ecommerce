import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Link from "next/link";
import { ProductsClient } from "./[productId]/_components/products-client";

const SellerProducts = async () => {
  const { userId } = auth();
  const data = await db.products.findMany({
    where: {
      sellerId: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      image: true,
    },
  });
  const modifyData = data.map((item) => ({
    id: item.id,
    title: item.title,
    img: item.image[0].url,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-2xl font-bold">Brand List</h2>
        <Link href={"/dashboard/products/new"}>
          <Button>Create One</Button>
        </Link>
      </div>
      <ProductsClient data={modifyData} />
    </div>
  );
};

export default SellerProducts;
