import { db } from "@/lib/prisma";
import {
  AddToCart,
  AddToWishList,
  ProductImage,
  Ratings,
} from "@prisma/client";

export const CategoryProductCountAction = async () => {
  const data = await db.category.findMany({
    select: {
      name: true,
      img: true,
      id: true,
      color: true,
      _count: {
        select: { Products: true },
      },
    },
  });
  return data;
};

export const singleCategoryProductsAction = async (categoryId: string) => {
  const data = await db.products.findMany({
    where: {
      categoryId: categoryId,
    },
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

export const inCategoryAction = async (id: string) => {
  const data = await db.category.findUnique({
    where: { id },
  });
  return data;
};
