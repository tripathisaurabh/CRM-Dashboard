import {
  Package,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  RefreshCw,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Product Analytics Dashboard
 * 
 * Comprehensive product performance analytics including:
 * - Product KPI metrics (revenue, units sold, penetration, etc.)
 * - Revenue by product charts
 * - Top products ranking table
 * - Product penetration analysis
 * - Cross-sell / frequently bought together
 * - Product gap analysis for upsell opportunities
 * - Reorder cycle insights
 * 
 * API Integration Points:
 * - GET /api/zoho/products/analytics - Product KPI metrics
 * - GET /api/zoho/products/revenue - Revenue by product
 * - GET /api/zoho/products/top - Top products ranking
 * - GET /api/zoho/products/penetration - Product penetration data
 * - GET /api/zoho/products/cross-sell - Frequently bought together
 * - GET /api/zoho/products/gap-analysis - Upsell opportunities
 * - GET /api/zoho/products/reorder-cycles - Reorder cycle data
 */
export function Products() {
  // MOCK DATA - Replace with API call: GET /api/zoho/products/analytics
  const kpiMetrics = {
    totalProductsSold: 12847,
    totalRevenue: 4285600,
    avgProductPrice: 2845,
    uniqueCustomers: 342,
    repeatPurchaseRate: 64,
    productPenetration: 78,
  };

  // MOCK DATA - Replace with API call: GET /api/zoho/products/revenue
  const revenueByProduct = [
    { name: "Enterprise Solution C", revenue: 1245000 },
    { name: "Premium Package A", revenue: 982000 },
    { name: "Advanced Analytics", revenue: 765000 },
    { name: "Support Package D", revenue: 543000 },
    { name: "Basic Service B", revenue: 421000 },
    { name: "Integration Pack", revenue: 329600 },
  ];

  // MOCK DATA - Replace with API call: GET /api/zoho/products/top
  const topProducts = [
    {
      id: 1,
      name: "Enterprise Solution C",
      revenue: 1245000,
      unitsSold: 138,
      uniqueCustomers: 98,
      repeatRate: 72,
    },
    {
      id: 2,
      name: "Premium Package A",
      revenue: 982000,
      unitsSold: 327,
      uniqueCustomers: 145,
      repeatRate: 68,
    },
    {
      id: 3,
      name: "Advanced Analytics Module",
      revenue: 765000,
      unitsSold: 170,
      uniqueCustomers: 112,
      repeatRate: 61,
    },
    {
      id: 4,
      name: "Support Package D",
      revenue: 543000,
      unitsSold: 362,
      uniqueCustomers: 178,
      repeatRate: 58,
    },
    {
      id: 5,
      name: "Basic Service B",
      revenue: 421000,
      unitsSold: 281,
      uniqueCustomers: 156,
      repeatRate: 54,
    },
  ];

  // MOCK DATA - Replace with API call: GET /api/zoho/products/penetration
  const penetrationData = [
    { name: "Purchased", value: 78, color: "#3b82f6" },
    { name: "Not Purchased", value: 22, color: "#e5e7eb" },
  ];

  // MOCK DATA - Replace with API call: GET /api/zoho/products/cross-sell
  const crossSellProducts = [
    {
      id: 1,
      productA: "Premium Package A",
      productB: "Support Package D",
      orders: 87,
      frequency: 68,
    },
    {
      id: 2,
      productA: "Enterprise Solution C",
      productB: "Advanced Analytics",
      orders: 72,
      frequency: 61,
    },
    {
      id: 3,
      productA: "Basic Service B",
      productB: "Integration Pack",
      orders: 54,
      frequency: 58,
    },
    {
      id: 4,
      productA: "Advanced Analytics",
      productB: "Training & Onboarding",
      orders: 43,
      frequency: 52,
    },
  ];

  // MOCK DATA - Replace with API call: GET /api/zoho/products/gap-analysis
  const gapAnalysis = [
    {
      id: 1,
      customer: "Acme Corporation",
      boughtProduct: "Premium Package A",
      missingProduct: "Advanced Analytics",
      revenue: 125840,
      orders: 47,
      lastOrder: "2026-02-28",
    },
    {
      id: 2,
      customer: "TechStart Inc",
      boughtProduct: "Enterprise Solution C",
      missingProduct: "Support Package D",
      revenue: 89500,
      orders: 32,
      lastOrder: "2025-12-15",
    },
    {
      id: 3,
      customer: "Global Solutions Ltd",
      boughtProduct: "Basic Service B",
      missingProduct: "Premium Package A",
      revenue: 156200,
      orders: 58,
      lastOrder: "2026-01-20",
    },
  ];

  // MOCK DATA - Replace with API call: GET /api/zoho/products/reorder-cycles
  const reorderCycles = [
    { product: "Premium Package A", days: 45, color: "#3b82f6" },
    { product: "Enterprise Solution C", days: 60, color: "#10b981" },
    { product: "Support Package D", days: 30, color: "#f59e0b" },
    { product: "Basic Service B", days: 52, color: "#8b5cf6" },
    { product: "Advanced Analytics", days: 90, color: "#ef4444" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Analytics</h1>
        <p className="text-gray-600 mt-1">
          Comprehensive insights into product performance and customer behavior.
        </p>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products Sold</p>
                <p className="text-2xl font-bold" data-placeholder="{{totalProductsSold}}">
                  {kpiMetrics.totalProductsSold.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Product Revenue</p>
                <p className="text-2xl font-bold" data-placeholder="{{totalProductRevenue}}">
                  {formatCurrency(kpiMetrics.totalRevenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Product Price</p>
                <p className="text-2xl font-bold" data-placeholder="{{avgProductPrice}}">
                  {formatCurrency(kpiMetrics.avgProductPrice)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unique Customers</p>
                <p className="text-2xl font-bold" data-placeholder="{{uniqueCustomersPerProduct}}">
                  {kpiMetrics.uniqueCustomers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-pink-100 text-pink-600">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Repeat Purchase Rate</p>
                <p className="text-2xl font-bold" data-placeholder="{{repeatPurchaseRate}}">
                  {kpiMetrics.repeatPurchaseRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Product Penetration</p>
                <p className="text-2xl font-bold" data-placeholder="{{productPenetration}}">
                  {kpiMetrics.productPenetration}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Product Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueByProduct} data-placeholder="{{productRevenue}}">
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  key="xaxis"
                  dataKey="name"
                  stroke="#888888"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis key="yaxis" stroke="#888888" fontSize={12} />
                <Tooltip
                  key="tooltip"
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar key="bar-revenue" dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Penetration Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Product Penetration</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart data-placeholder="{{productPenetration}}">
                <Pie
                  key="pie-penetration"
                  data={penetrationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {penetrationData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Customers who purchased</span>
                <span className="font-bold text-blue-600">
                  {kpiMetrics.uniqueCustomers} (78%)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Customers who did not</span>
                <span className="font-bold text-gray-400">96 (22%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Products by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-placeholder="{{topProducts}}">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Product Name
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Units Sold
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Unique Customers
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Repeat Purchase Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={`product-${product.id}`} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="w-8 h-8 rounded-full">
                          {index + 1}
                        </Badge>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="py-3 px-4 text-right">{product.unitsSold}</td>
                    <td className="py-3 px-4 text-right">{product.uniqueCustomers}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge
                        variant={product.repeatRate >= 60 ? "default" : "secondary"}
                        className={
                          product.repeatRate >= 60
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                      >
                        {product.repeatRate}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cross-Sell Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Frequently Bought Together
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3" data-placeholder="{{crossSellProducts}}">
            {crossSellProducts.map((bundle) => (
              <div
                key={`bundle-${bundle.id}`}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-white">
                      {bundle.productA}
                    </Badge>
                    <span className="text-gray-400">+</span>
                    <Badge variant="outline" className="bg-white">
                      {bundle.productB}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Purchased together {bundle.orders} times
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{bundle.frequency}%</p>
                  <p className="text-xs text-gray-500">Cross-sell rate</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Product Gap Analysis - Upsell Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-placeholder="{{gapAnalysis}}">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Customer Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Bought Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Missing Product
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Orders
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Last Order
                  </th>
                </tr>
              </thead>
              <tbody>
                {gapAnalysis.map((item) => (
                  <tr key={`gap-${item.id}`} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.customer}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{item.boughtProduct}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-orange-100 text-orange-700">
                        {item.missingProduct}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="py-3 px-4 text-right">{item.orders}</td>
                    <td className="py-3 px-4 text-right text-sm text-gray-600">
                      {formatDate(item.lastOrder)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reorder Cycle Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Average Reorder Cycle by Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" data-placeholder="{{reorderCycles}}">
            {reorderCycles.map((cycle, index) => (
              <div key={`cycle-${index}-${cycle.product}`} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{cycle.product}</span>
                  <span className="text-sm font-bold text-gray-900">{cycle.days} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${(cycle.days / 90) * 100}%`,
                      backgroundColor: cycle.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Insight:</strong> Products with shorter reorder cycles indicate higher
              customer dependency and engagement. Use this data to optimize inventory and
              marketing campaigns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}