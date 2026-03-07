import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, AlertCircle, ShoppingBag, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";

// Mock data placeholder - easily replaceable with {{customerSegments}}
const mockSegments = [
  {
    id: "SEG001",
    name: "High Value Customers",
    description: "Revenue > $10,000",
    customers: 342,
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    badgeColor: "bg-blue-500 text-white",
  },
  {
    id: "SEG002",
    name: "Inactive 90+ Days",
    description: "No purchase in 3 months",
    customers: 589,
    icon: AlertCircle,
    color: "bg-orange-100 text-orange-600",
    badgeColor: "bg-orange-500 text-white",
  },
  {
    id: "SEG003",
    name: "Single Product Buyers",
    description: "Only purchased 1 product type",
    customers: 1245,
    icon: ShoppingBag,
    color: "bg-purple-100 text-purple-600",
    badgeColor: "bg-purple-500 text-white",
  },
  {
    id: "SEG004",
    name: "North America",
    description: "US & Canada customers",
    customers: 1876,
    icon: MapPin,
    color: "bg-green-100 text-green-600",
    badgeColor: "bg-green-500 text-white",
  },
  {
    id: "SEG005",
    name: "Europe",
    description: "EU customers",
    customers: 943,
    icon: MapPin,
    color: "bg-indigo-100 text-indigo-600",
    badgeColor: "bg-indigo-500 text-white",
  },
  {
    id: "SEG006",
    name: "Asia Pacific",
    description: "APAC region customers",
    customers: 678,
    icon: MapPin,
    color: "bg-pink-100 text-pink-600",
    badgeColor: "bg-pink-500 text-white",
  },
];

export function CustomerSegments() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg truncate">Customer Segments</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{customerSegments}}">
          Pre-defined customer groups
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {mockSegments.map((segment) => (
            <div
              key={segment.id}
              className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${segment.color}`}>
                  <segment.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <Badge className={`${segment.badgeColor} text-xs`}>
                  {segment.customers.toLocaleString()}
                </Badge>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate">{segment.name}</h4>
              <p className="text-xs text-gray-600 truncate">{segment.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}