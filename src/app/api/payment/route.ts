import { OrderData } from "@/lib/order-data";
import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { AddToCart, Products } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    const userId = user?.id as string;
    if (!user) {
      return new NextResponse("Unauthorize User", { status: 401 });
    }
    const body = await req.json();
    const { data } = body;
    if (!data || data.length === 0) {
      return new NextResponse("Product is required", { status: 400 });
    }

    const order = await OrderData(data);
    // Find is login customer is in list?
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId,
      },
      select: { stripeCustomerId: true },
    });
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user?.emailAddresses[0].emailAddress,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }
    const paymantIntent = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      mode: "payment",
      line_items: data.map((item: AddToCart & { product: Products }) => ({
        price_data: {
          currency: "USD",
          unit_amount: item.product.price * 100,
          product_data: {
            name: item.product.title,
          },
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL_SHOP}`,
      metadata: {
        ids: JSON.stringify(order.map((item: any) => ({ id: item }))),
      },
    });
    return NextResponse.json({ url: paymantIntent.url });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return NextResponse.json({ msg: "error" });
  }
}
