"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const CreateRatingsAction = async (
  productId: string,
  ratings: number,
  comments: string
) => {
  try {
    const { userId } = auth();
    if (!userId) return { error: "Please login first" };
    await db.ratings.create({
      data: {
        ratings,
        comments,
        productId,
        userId: userId as string,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
