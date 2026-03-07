import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Package } from "lucide-react";

// Mock data placeholder - easily replaceable with {{topProducts}}
const mockProducts = [
  {
    id: "PROD001",
    name: "Premium Enterprise License",
    revenue: 248500,
    unitsSold: 156,
    avgPrice: 1593,
  },
  {
    id: "PROD002",
    name: "Professional Service Package",
    revenue: 189200,
    unitsSold: 203,
    avgPrice: 932,
  },
  {
    id: "PROD003",
    name: "Advanced Analytics Module",
    revenue: 156800,
    unitsSold: 178,
    avgPrice: 881,
  },
  {
    id: "PROD004",
    name: "Custom Integration Service",
    revenue: 124600,
    unitsSold: 89,
    avgPrice: 1400,
  },
  {
    id: "PROD005",
    name: "Training & Onboarding",
    revenue: 98400,
    unitsSold: 164,
    avgPrice: 600,
  },
];

export function TopProducts() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg truncate">Top Products by Revenue</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{topProducts}}">
          Best performing products this period
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-2 sm:space-y-3">
          {mockProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-100 flex-shrink-0">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {product.unitsSold} units • Avg ${product.avgPrice}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                  ${product.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">Total Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}