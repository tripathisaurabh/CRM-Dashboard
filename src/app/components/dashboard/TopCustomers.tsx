import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowUpRight } from "lucide-react";

// Mock data placeholder - easily replaceable with {{topCustomers}}
const mockCustomers = [
  {
    id: "CUST001",
    name: "Acme Corporation",
    revenue: 124500,
    orders: 45,
    lastPurchase: "2026-03-04",
  },
  {
    id: "CUST002",
    name: "Tech Innovators Inc",
    revenue: 98750,
    orders: 38,
    lastPurchase: "2026-03-05",
  },
  {
    id: "CUST003",
    name: "Global Solutions Ltd",
    revenue: 87200,
    orders: 32,
    lastPurchase: "2026-03-03",
  },
  {
    id: "CUST004",
    name: "Digital Dynamics",
    revenue: 76500,
    orders: 28,
    lastPurchase: "2026-03-06",
  },
  {
    id: "CUST005",
    name: "Future Systems",
    revenue: 68900,
    orders: 24,
    lastPurchase: "2026-03-02",
  },
];

export function TopCustomers() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg truncate">Top Customers by Revenue</CardTitle>
          <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 whitespace-nowrap">
            View All
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{topCustomers}}">
          Highest revenue generating customers
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {mockCustomers.map((customer, index) => (
            <div
              key={customer.id}
              className="flex items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm sm:text-base flex-shrink-0">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{customer.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{customer.orders} orders</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                  ${customer.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">Last: {customer.lastPurchase}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}