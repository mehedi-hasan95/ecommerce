import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_KEY!
    );

    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === "checkout.session.completed") {
      const orderData = JSON.parse(session?.metadata?.ids as string);
      const userId = JSON.parse(session?.metadata?.userId as string);
      console.log("User Id: ", userId);
      const ids = orderData.map((order: any) => order.id);
      await db.order.updateMany({
        where: {
          id: { in: ids },
          // userId: userId as string,
        },
        data: {
          paid: true,
          paymentId: session.payment_intent as string,
        },
      });
      // Update add to product data
      const orderItems = await db.order.findMany({
        where: {
          id: { in: ids },
          // userId: userId as string,
        },
      });
      console.log("Order item", orderItems);
      for (const item of orderItems) {
        await db.products.update({
          where: {
            id: item.productId,
          },
          data: {
            sale: {
              increment: item.quantity,
            },
          },
        });
      }
      // Delete add to cart
      for (const item of orderItems) {
        await db.addToCart.deleteMany({
          where: {
            productId: item.productId,
            // userId: userId as string,
          },
        });
      }
    }
    revalidatePath("/");
    return new NextResponse("Order created", { status: 200 });
  } catch (error) {
    console.log("[webhooks_POST]", error);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
};
