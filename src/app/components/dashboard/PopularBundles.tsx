import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Package } from "lucide-react";
import { Badge } from "../ui/badge";

// Mock data placeholder - easily replaceable with {{popularBundles}}
const mockBundles = [
  {
    id: "BUNDLE001",
    products: ["Enterprise License", "Advanced Analytics", "Premium Support"],
    customers: 156,
    avgRevenue: 5400,
  },
  {
    id: "BUNDLE002",
    products: ["Professional License", "Training Package", "API Access"],
    customers: 203,
    avgRevenue: 3200,
  },
  {
    id: "BUNDLE003",
    products: ["Basic License", "Onboarding", "Support Plan"],
    customers: 289,
    avgRevenue: 1800,
  },
  {
    id: "BUNDLE004",
    products: ["Analytics Module", "Reporting Dashboard", "Data Export"],
    customers: 134,
    avgRevenue: 2600,
  },
];

export function PopularBundles() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg truncate">Popular Product Bundles</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500" data-placeholder="{{popularBundles}}">
          Frequently purchased product combinations
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {mockBundles.map((bundle) => (
            <div
              key={bundle.id}
              className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-purple-300 bg-gradient-to-r from-purple-50 to-white transition-colors"
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-1 sm:mb-2">
                      {bundle.products.map((product) => (
                        <Badge
                          key={product}
                          variant="outline"
                          className="bg-white border-purple-200 text-purple-700 text-xs"
                        >
                          {product}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      Often purchased together
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {bundle.customers} customers
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Avg: ${bundle.avgRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}