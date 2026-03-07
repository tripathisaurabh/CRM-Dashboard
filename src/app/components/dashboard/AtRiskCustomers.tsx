import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";

// Mock data placeholder - easily replaceable with {{atRiskCustomers}}
const mockAtRiskCustomers = [
  {
    id: "RISK001",
    name: "Enterprise Solutions Co",
    revenue: 45600,
    orders: 12,
    lastPurchase: "2025-12-15",
    daysSinceLastOrder: 81,
  },
  {
    id: "RISK002",
    name: "Metro Retail Group",
    revenue: 32400,
    orders: 9,
    lastPurchase: "2025-12-28",
    daysSinceLastOrder: 68,
  },
  {
    id: "RISK003",
    name: "Coastal Trading Ltd",
    revenue: 28900,
    orders: 8,
    lastPurchase: "2025-12-10",
    daysSinceLastOrder: 86,
  },
  {
    id: "RISK004",
    name: "Summit Industries",
    revenue: 38200,
    orders: 11,
    lastPurchase: "2025-12-20",
    daysSinceLastOrder: 76,
  },
];

export function AtRiskCustomers() {
  return (
    <Card className="shadow-sm border-orange-200">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
          <CardTitle className="text-base sm:text-lg truncate">At-Risk Customers</CardTitle>
        </div>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{atRiskCustomers}}">
          Inactive for 60+ days
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-2 sm:space-y-3">
          {mockAtRiskCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-start sm:items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-orange-200 bg-orange-50"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{customer.name}</p>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                  <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                    Lifetime: ${customer.revenue.toLocaleString()}
                  </p>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{customer.orders} orders</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-white border-orange-300 text-orange-700 text-xs whitespace-nowrap flex-shrink-0">
                {customer.daysSinceLastOrder} days
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}