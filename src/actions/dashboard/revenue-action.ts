import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface GraphData {
  name: string;
  total: number;
}
export const getSellerRevenue = async () => {
  const { userId } = auth();
  const paidOrder = await db.order.findMany({
    where: {
      paid: true,
      product: {
        sellerId: userId!,
      },
    },
    include: {
      product: true,
    },
  });
  //   Total Product
  const totalProduct = await db.products.count({
    where: {
      sellerId: userId!,
    },
  });

  //   Total Revenues
  const totalRevenues = paidOrder.reduce((acc, cur) => {
    const itemPrice = cur.quantity * cur.price;
    return acc + itemPrice;
  }, 0);

  //   Total Sale
  const totalSale = paidOrder.reduce((acc, cur) => {
    const itemSale = cur.quantity;
    return acc + itemSale;
  }, 0);

  // Revenue Graph
  const monthlyRevenue: { [key: number]: number } = {};
  for (const order of paidOrder) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;
    revenueForOrder += order.price;

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const monthlyGraphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];
  for (const month in monthlyRevenue) {
    monthlyGraphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  //   Product revenue order
  const productRevenueMap: { [key: string]: number } = {};
  for (const order of paidOrder) {
    const productName = order.product.title;
    const revenueForOrder = order.quantity * order.price;

    if (!productRevenueMap[productName]) {
      productRevenueMap[productName] = 0;
    }
    productRevenueMap[productName] += revenueForOrder;
  }
  const productRevenueData: GraphData[] = Object.keys(productRevenueMap).map(
    (productName) => ({
      name: productName,
      total: productRevenueMap[productName],
    })
  );
  return {
    totalRevenues,
    totalSale,
    totalProduct,
    monthlyGraphData,
    productRevenueData,
  };
};
