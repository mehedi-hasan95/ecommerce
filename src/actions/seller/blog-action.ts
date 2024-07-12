"use server";

import { db } from "@/lib/prisma";
import { userRole } from "@/lib/roles";
import { WriteBlogSchema } from "@/schemas/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export const createBlogAction = async (
  values: z.infer<typeof WriteBlogSchema>
) => {
  try {
    const { userId } = auth();
    const role = await userRole();
    if (!userId && role === ("ADMIN" || "seller")) {
      return { error: "Unauthorize User" };
    }
    await db.blog.create({
      data: {
        ...values,
        userId: userId as string,
      },
    });
    return { success: "Blog created successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const updateBlogActoin = async (
  values: z.infer<typeof WriteBlogSchema>,
  id: string
) => {
  try {
    const { userId } = auth();
    const role = await userRole();
    if (!userId && role === ("ADMIN" || "seller")) {
      return { error: "Unauthorize User" };
    }
    await db.blog.update({
      where: {
        id,
        userId: userId as string,
      },
      data: {
        ...values,
      },
    });
    return { success: "Blog update successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const singleBlogAction = async (id: string) => {
  const data = await db.blog.findUnique({
    where: { id },
  });
  return data;
};

export const userAllBlogAction = async () => {
  const { userId } = auth();
  const role = await userRole();
  if (!userId && role === ("ADMIN" || "seller")) {
    return { error: "Unauthorize User" };
  }
  const data = await db.blog.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

export const allBlogAction = async () => {
  const data = await db.blog.findMany({
    select: {
      id: true,
      title: true,
      image: true,
      short_desc: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
