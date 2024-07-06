"use server";

import { db } from "@/lib/prisma";
import { userRole } from "@/lib/roles";
import { ProductsSchema } from "@/schemas/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateProductAction = async (
  values: z.infer<typeof ProductsSchema>
) => {
  const role = await userRole();
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorize user" };
    }
    if (role !== ("ADMIN" || "seller")) {
      return { error: "Unauthorize user" };
    }
    const validateFields = ProductsSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Valideation Error" };
    }
    const {
      brandId,
      categoryId,
      desc,
      image,
      price,
      quantity,
      title,
      basePrice,
      offer,
    } = validateFields.data;
    await db.products.create({
      data: {
        brandId,
        categoryId,
        desc,
        price,
        quantity,
        title,
        basePrice,
        offer,
        sellerId: userId,
        image: {
          createMany: {
            data: [...(image ?? [].map((image: { url: string }) => image))],
          },
        },
      },
    });
    revalidatePath("/");
    return { success: "Product Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Bulk Delete
export const BulkDeleteProductAction = async (ids: string[]) => {
  try {
    const { userId } = auth();
    const user = await userRole();
    if (user !== ("ADMIN" || "seller")) {
      return { error: "Unauthorize user" };
    }
    await db.products.deleteMany({
      where: {
        id: {
          in: ids,
        },
        sellerId: userId as string,
      },
    });
    revalidatePath("/");
    return { success: "Products Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Find Many
export const AllProductsAction = async () => {
  const data = await db.products.findMany({
    orderBy: { createdAt: "desc" },
    include: { image: true, addToWishList: true },
  });
  return data;
};

// Update Product
export const UpdateProductAction = async (
  values: z.infer<typeof ProductsSchema>,
  id: string
) => {
  const role = await userRole();
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorize user" };
    }
    if (role !== ("ADMIN" || "seller")) {
      return { error: "Unauthorize user" };
    }
    const validateFields = ProductsSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Valideation Error" };
    }
    const {
      brandId,
      categoryId,
      desc,
      image,
      price,
      quantity,
      title,
      basePrice,
      offer,
    } = validateFields.data;
    // update the image
    await db.products.update({
      where: {
        id,
        sellerId: userId,
      },
      data: {
        image: {
          deleteMany: {},
        },
      },
    });

    // Update rest
    await db.products.update({
      where: {
        id,
      },
      data: {
        brandId,
        categoryId,
        desc,
        price,
        quantity,
        title,
        basePrice,
        offer,
        image: {
          createMany: {
            data: [...image.map((image: { url: string }) => image)],
          },
        },
      },
    });
    revalidatePath("/");
    return { success: "Product Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
