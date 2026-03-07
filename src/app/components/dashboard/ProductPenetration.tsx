import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Mock data placeholder - easily replaceable with {{productPenetration}}
const mockData = [
  { id: "single", name: "Single Product", value: 1245, color: "#3b82f6" },
  { id: "two-three", name: "2-3 Products", value: 892, color: "#8b5cf6" },
  { id: "four-five", name: "4-5 Products", value: 456, color: "#10b981" },
  { id: "six-plus", name: "6+ Products", value: 234, color: "#f59e0b" },
];

export function ProductPenetration() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg truncate">Product Penetration</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{productPenetration}}">
          Distribution of product purchases per customer
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              key="pie-product-penetration"
              data={mockData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {mockData.map((entry, index) => (
                <Cell key={`cell-${entry.id}-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip key="tooltip" />
            <Legend key="legend" />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          {mockData.map((item) => (
            <div key={`legend-${item.id}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{item.value} customers</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}