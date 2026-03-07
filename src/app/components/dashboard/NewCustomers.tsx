import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";

// Mock data placeholder - easily replaceable with {{newCustomers}}
const mockNewCustomers = [
  {
    id: "NEW001",
    name: "Sarah Johnson",
    email: "sarah@startup.io",
    revenue: 4500,
    orders: 2,
    joinedDate: "2026-03-05",
  },
  {
    id: "NEW002",
    name: "Michael Chen",
    email: "mchen@tech.com",
    revenue: 3200,
    orders: 1,
    joinedDate: "2026-03-04",
  },
  {
    id: "NEW003",
    name: "Emma Williams",
    email: "emma@design.co",
    revenue: 5100,
    orders: 3,
    joinedDate: "2026-03-03",
  },
  {
    id: "NEW004",
    name: "James Rodriguez",
    email: "james@company.com",
    revenue: 2800,
    orders: 1,
    joinedDate: "2026-03-02",
  },
];

export function NewCustomers() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg truncate">New Customers This Month</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{newCustomers}}">
          Recent customer acquisitions
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {mockNewCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold text-xs sm:text-sm">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{customer.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{customer.email}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                  ${customer.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{customer.orders} orders</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}