import Link from "next/link";
import { BrandClient } from "./_components/brand-client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { db } from "@/lib/prisma";

const BrandPage = async () => {
  const data = await db.brand.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const modifyData = data.map((item) => ({
    id: item.id,
    name: item.name,
    img: item.img,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-2xl font-bold">Brand List</h2>
        <Link href={"/dashboard/admin-brand/new"}>
          <Button>Create One</Button>
        </Link>
      </div>
      <BrandClient data={modifyData} />
    </div>
  );
};

export default BrandPage;
