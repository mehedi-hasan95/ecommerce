import { db } from "@/lib/prisma";
import { BrandForm } from "../_components/brand-form";

const BrandId = async ({ params }: { params: { brandId: string } }) => {
  const brand = await db.brand.findUnique({
    where: { id: params.brandId },
  });
  return (
    <div>
      <BrandForm initialData={brand} />
    </div>
  );
};

export default BrandId;
