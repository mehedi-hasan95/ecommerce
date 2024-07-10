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

// Find Many
type SearchParams = {
  sort?: string;
  categories?: string;
  price?: string;
};
export const AllProductsAction = async ({
  sort,
  categories,
  price,
}: SearchParams) => {
  let dataString = categories;
  let categoriesArray = dataString?.split(",");

  let priceString = price;
  let priceArray = priceString?.split(",").map(Number);
  const data = await db.products.findMany({
    orderBy: sort ? { price: sort as any } : { createdAt: "desc" },
    include: {
      image: true,
      addToWishList: true,
      addToCart: true,
      ratings: true,
    },
    where: {
      categoryId: {
        in: categoriesArray,
      },
      price: {
        gte: priceArray ? priceArray[0] : undefined,
        lte: priceArray ? priceArray[1] : undefined,
      },
    },
  });
  return data.map((product) => {
    const averageRating = product.ratings.length
      ? product.ratings.reduce((sum, rating) => sum + rating.ratings, 0) /
        product.ratings.length
      : null;

    return {
      ...product,
      averageRating,
    };
  });
};

// Max and min Price
export const MaxMinPriceAciton = async () => {
  const data = db.products.aggregate({
    _max: {
      price: true,
    },
    _min: { price: true },
  });
  return data;
};

// Deals of Weeks
export const WeeksProductsAction = async () => {
  const data = await db.products.findMany({
    take: 15,
    orderBy: { createdAt: "desc" },
    include: {
      image: true,
      addToWishList: true,
      addToCart: true,
      ratings: true,
    },
  });
  return data.map((product) => {
    const averageRating = product.ratings.length
      ? product.ratings.reduce((sum, rating) => sum + rating.ratings, 0) /
        product.ratings.length
      : null;

    return {
      ...product,
      averageRating,
    };
  });
};

// Single Product
export const SingleProductAction = async (id: string) => {
  const product = await db.products.findUnique({
    where: {
      id,
    },
    include: {
      addToCart: true,
      addToWishList: true,
      brand: true,
      category: true,
      image: true,
      ratings: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return product;
};

export const RattingAvarageAction = async () => {
  try {
    const data = await db.ratings.aggregate({
      _avg: {
        ratings: true,
      },
    });
    return data;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
