"use server";

import { db } from "@/lib/prisma";
import { AddToCartSchema } from "@/schemas/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const AddToCartAction = async (
  values: z.infer<typeof AddToCartSchema>
) => {
  const { userId } = auth();
  if (!userId) return { error: "Please login first" };
  try {
    await db.addToCart.create({
      data: {
        ...values,
        userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
