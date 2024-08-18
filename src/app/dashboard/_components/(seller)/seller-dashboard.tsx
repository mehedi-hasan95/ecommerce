import { Separator } from "@/components/ui/separator";
import { DashboardHeading } from "../dashboard-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, GitBranchPlusIcon } from "lucide-react";
import { getSellerRevenue } from "@/actions/dashboard/revenue-action";
import { FormatPrice } from "@/lib/format-price";
import { SellerRevenueChart } from "./seller-revenue-chart";

export const SellerDashboard = async () => {
  const {
    totalRevenues,
    totalSale,
    totalProduct,
    monthlyGraphData,
    productRevenueData,
  } = await getSellerRevenue();
  return (
    <div>
      <DashboardHeading descripton="Overview of your store" />
      <Separator className="my-2" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Total Revenue</CardTitle>
              <DollarSign size={25} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl">{FormatPrice(totalRevenues)}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Total Product Sale</CardTitle>
              <CreditCard size={25} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl">+{totalSale}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Total Product</CardTitle>
              <GitBranchPlusIcon size={25} className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl">+{totalProduct}</h2>
          </CardContent>
        </Card>
      </div>
      <Separator className="my-5" />
      <SellerRevenueChart
        data={monthlyGraphData}
        label="Monthly Revenue Chart"
      />
      <Separator className="my-5" />
      <SellerRevenueChart
        data={productRevenueData}
        label="Product Revenue Chart"
        fill="#a78bfa"
      />
    </div>
  );
};
