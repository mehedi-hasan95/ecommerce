"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const switchLikes = async (productId: string) => {
  const { userId } = auth();
  if (!userId) return { error: "User is not authenticated!" };
  try {
    const existingLike = await db.addToWishList.findFirst({
      where: {
        userId,
        productId,
      },
    });
    if (existingLike) {
      await db.addToWishList.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await db.addToWishList.create({
        data: {
          productId,
          userId,
        },
      });
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
