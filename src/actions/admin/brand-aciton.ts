"use server";
import { db } from "@/lib/prisma";
import { userRole } from "@/lib/roles";
import { BrandSchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const BrandAction = async (values: z.infer<typeof BrandSchema>) => {
  try {
    const user = await userRole();
    if (user !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.brand.create({
      data: values,
    });
    revalidatePath("/");
    return { success: "Brand Create Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
export const UpdateBrandAction = async (
  values: z.infer<typeof BrandSchema>,
  id: string
) => {
  try {
    const user = await userRole();
    if (user !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.brand.update({
      where: { id },
      data: {
        ...values,
      },
    });
    revalidatePath("/");
    return { success: "Brand Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const BulkDeleteBrandAction = async (ids: string[]) => {
  try {
    const user = await userRole();
    if (user !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.brand.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    revalidatePath("/");
    return { success: "Brand Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const AllBrandAction = async () => {
  const data = await db.brand.findMany({ orderBy: { name: "asc" } });
  return data;
};
