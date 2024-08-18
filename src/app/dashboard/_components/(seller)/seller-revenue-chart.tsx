"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
interface Props {
  data: { name: string; total: number }[];
  label: string;
  fill?: string | "#ededed";
}
export const SellerRevenueChart = ({ data, label, fill }: Props) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold p-5">{label}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="total"
            fill={fill ? fill : "#82CA9D"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
