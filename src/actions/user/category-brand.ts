import { db } from "@/lib/prisma";

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

type SearchParams = {
  sort?: string;
  price?: string;
};
export const singleCategoryProductsAction = async (
  categoryId: string,
  { sort, price }: SearchParams
) => {
  let priceString = price;
  let priceArray = priceString?.split(",").map(Number);
  const data = await db.products.findMany({
    where: {
      categoryId: categoryId,
      price: {
        gte: priceArray ? priceArray[0] : undefined,
        lte: priceArray ? priceArray[1] : undefined,
      },
    },
    orderBy: sort ? { price: sort as any } : { createdAt: "desc" },
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

// Brand Action

export const brandProductCountAction = async () => {
  const data = await db.brand.findMany({
    select: {
      name: true,
      img: true,
      id: true,
      _count: {
        select: { Products: true },
      },
    },
  });
  return data;
};

type brandParams = {
  sort?: string;
  price?: string;
  categories?: string;
};
export const singlebrandProductsAction = async (
  brandId: string,
  { sort, price, categories }: brandParams
) => {
  let dataString = categories;
  let categoriesArray = dataString?.split(",");
  let priceString = price;
  let priceArray = priceString?.split(",").map(Number);
  const data = await db.products.findMany({
    where: {
      brandId,
      categoryId: {
        in: categoriesArray,
      },
      price: {
        gte: priceArray ? priceArray[0] : undefined,
        lte: priceArray ? priceArray[1] : undefined,
      },
    },
    orderBy: sort ? { price: sort as any } : { createdAt: "desc" },
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

export const inbrandAction = async (id: string) => {
  const data = await db.brand.findUnique({
    where: { id },
  });
  return data;
};
