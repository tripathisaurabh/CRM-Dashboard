import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data placeholder - easily replaceable with {{monthlyRevenueData}}
const mockData = [
  { id: "jan", month: "Jan", revenue: 45000, orders: 120 },
  { id: "feb", month: "Feb", revenue: 52000, orders: 145 },
  { id: "mar", month: "Mar", revenue: 48000, orders: 132 },
  { id: "apr", month: "Apr", revenue: 61000, orders: 178 },
  { id: "may", month: "May", revenue: 58000, orders: 165 },
  { id: "jun", month: "Jun", revenue: 67000, orders: 192 },
  { id: "jul", month: "Jul", revenue: 72000, orders: 210 },
  { id: "aug", month: "Aug", revenue: 69000, orders: 198 },
  { id: "sep", month: "Sep", revenue: 78000, orders: 225 },
  { id: "oct", month: "Oct", revenue: 84000, orders: 248 },
  { id: "nov", month: "Nov", revenue: 91000, orders: 267 },
  { id: "dec", month: "Dec", revenue: 98000, orders: 289 },
];

export function RevenueChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg truncate">Revenue & Orders Trend</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{monthlyRevenueData}}">
          Monthly performance overview
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={mockData}>
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis key="xaxis" dataKey="month" stroke="#6b7280" fontSize={11} />
            <YAxis key="yaxis-left" yAxisId="left" stroke="#3b82f6" fontSize={11} />
            <YAxis key="yaxis-right" yAxisId="right" orientation="right" stroke="#8b5cf6" fontSize={11} />
            <Tooltip
              key="tooltip"
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend key="legend" wrapperStyle={{ fontSize: "12px" }} />
            <Bar
              key="bar-revenue"
              yAxisId="left"
              dataKey="revenue"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="Revenue ($)"
            />
            <Line
              key="line-orders"
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Orders"
              dot={{ fill: "#8b5cf6", r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}