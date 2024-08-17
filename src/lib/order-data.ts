import { currentUser } from "@clerk/nextjs/server";
import { AddToCart, Products } from "@prisma/client";
import { db } from "./prisma";

interface OrderDataInput extends AddToCart {
  product: Products;
}

export async function OrderData(data: OrderDataInput[]) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const processedOrders = [];

  for (const item of data) {
    const processedOrder = await db.order.create({
      data: {
        cartId: item.id,
        quantity: item.quantity,
        productId: item.productId,
        userId: user.id,
        offer: item.offer,
        price: item.product.price,
      },
    });
    processedOrders.push(processedOrder.id);
  }

  return processedOrders;
}
