import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

// Mock data placeholder - easily replaceable with {{crossSellOpportunities}}
const mockOpportunities = [
  {
    id: "OPP001",
    product: "Analytics Module",
    suggestedProduct: "Reporting Dashboard",
    customers: 245,
    potentialRevenue: 48900,
  },
  {
    id: "OPP002",
    product: "Basic License",
    suggestedProduct: "Premium Upgrade",
    customers: 189,
    potentialRevenue: 75600,
  },
  {
    id: "OPP003",
    product: "Training Package",
    suggestedProduct: "Support Plan",
    customers: 156,
    potentialRevenue: 31200,
  },
  {
    id: "OPP004",
    product: "API Access",
    suggestedProduct: "Custom Integration",
    customers: 98,
    potentialRevenue: 58800,
  },
];

export function CrossSellOpportunities() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
          <CardTitle className="text-base sm:text-lg truncate">Cross-Sell Opportunities</CardTitle>
        </div>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{crossSellOpportunities}}">
          Product recommendations based on purchase patterns
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {mockOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-green-300 bg-gradient-to-r from-green-50 to-white transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
                  <span className="font-medium text-gray-700 truncate">{opp.product}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-semibold text-green-700 truncate">
                    {opp.suggestedProduct}
                  </span>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs whitespace-nowrap self-start sm:self-auto">
                  {opp.customers} customers
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                <p className="text-xs text-gray-600 truncate">
                  Customers who bought {opp.product}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Potential: ${opp.potentialRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}