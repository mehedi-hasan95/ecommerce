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

export const AllCartAction = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await db.addToCart.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: true,
    },
  });
  return data;
};

export const userIndividualCart = async () => {
  const { userId } = auth();
  if (!userId) return [];
  const data = await db.addToCart.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      product: {
        include: {
          image: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return data;
};

// update cart
export const updateCartAction = async (
  items: { id: string; quantity: number }[]
) => {
  try {
    for (const item of items) {
      await db.addToCart.updateMany({
        where: { id: item.id },
        data: { quantity: item.quantity },
      });
    }
    revalidatePath("/add-to-cart");
    return { success: "Cart update successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Delete a single cart
export const deleteCartAction = async (id: string) => {
  try {
    const { userId } = auth();
    await db.addToCart.delete({
      where: {
        id,
        userId: userId as string,
      },
    });
    return { success: "Cart Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Remove all cart
export const deleteAllCartAction = async () => {
  try {
    const { userId } = auth();
    await db.addToCart.deleteMany({
      where: {
        userId: userId as string,
      },
    });
    revalidatePath("/add-to-cart");
    return { success: "Cart Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
