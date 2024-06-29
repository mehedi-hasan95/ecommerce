"use server";
import { db } from "@/lib/prisma";
import { userRole } from "@/lib/roles";
import { CategorySchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CategoryAction = async (
  values: z.infer<typeof CategorySchema>
) => {
  try {
    const user = await userRole();
    if (user !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.category.create({
      data: values,
    });
    revalidatePath("/");
    return { success: "Category Create Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
export const UpdateCategoryAction = async (
  values: z.infer<typeof CategorySchema>,
  id: string
) => {
  try {
    const user = await userRole();
    if (user !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.category.update({
      where: { id },
      data: {
        ...values,
      },
    });
    revalidatePath("/");
    return { success: "Category Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
