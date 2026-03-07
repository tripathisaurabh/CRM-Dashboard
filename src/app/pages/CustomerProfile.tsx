import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Download,
  UserPlus,
  Send,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Customer Profile Page
 * 
 * Displays a complete 360° view of a single customer with:
 * - Customer summary and contact info
 * - KPI metrics (lifetime value, orders, AOV, etc.)
 * - Revenue and order trends charts
 * - Product purchase history
 * - Cross-sell opportunities
 * - Purchase behavior insights
 * - Activity timeline
 * 
 * API Integration Points:
 * - GET /api/zoho/customers/:id - Customer details and summary
 * - GET /api/zoho/customers/:id/metrics - Customer KPI data
 * - GET /api/zoho/customers/:id/revenue - Monthly revenue trends
 * - GET /api/zoho/customers/:id/orders - Order history
 * - GET /api/zoho/customers/:id/products - Product purchase data
 * - GET /api/zoho/customers/:id/timeline - Activity timeline
 */
export function CustomerProfile() {
  const { customerId } = useParams();

  // MOCK DATA - Replace with API call: GET /api/zoho/customers/:id
  const customer = {
    id: customerId || "CUST-001",
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    customerSince: "2023-01-15",
    lastOrderDate: "2026-02-28",
    daysSinceLastOrder: 6,
  };

  // MOCK DATA - Replace with API call: GET /api/zoho/customers/:id/metrics
  const metrics = {
    lifetimeRevenue: 125840,
    totalOrders: 47,
    averageOrderValue: 2678,
    revenueThisYear: 32450,
    revenueLastYear: 45680,
    revenueGrowth: -28.9,
  };

  // MOCK DATA - Replace with API call: GET /api/zoho/customers/:id/revenue
  const monthlyRevenue = [
    { month: "Jul 25", revenue: 4200, orders: 3 },
    { month: "Aug 25", revenue: 5800, orders: 4 },
    { month: "Sep 25", revenue: 3200, orders: 2 },
    { month: "Oct 25", revenue: 6500, orders: 5 },
    { month: "Nov 25", revenue: 4800, orders: 3 },
    { month: "Dec 25", revenue: 7200, orders: 6 },
    { month: "Jan 26", revenue: 5400, orders: 4 },
    { month: "Feb 26", revenue: 6800, orders: 5 },
  ];

  // MOCK DATA - Replace with API call: GET /api/zoho/customers/:id/products
  const productPurchases = [
    {
      id: 1,
      name: "Premium Package A",
      quantity: 12,
      totalRevenue: 36000,
      avgPrice: 3000,
      lastPurchased: "2026-02-28",
    },
    {
      id: 2,
      name: "Basic Service B",
      quantity: 8,
      totalRevenue: 12000,
      avgPrice: 1500,
      lastPurchased: "2026-02-15",
    },
    {
      id: 3,
      name: "Enterprise Solution C",
      quantity: 5,
      totalRevenue: 45000,
      avgPrice: 9000,
      lastPurchased: "2026-01-20",
    },
    {
      id: 4,
      name: "Support Package D",
      quantity: 15,
      totalRevenue: 22500,
      avgPrice: 1500,
      lastPurchased: "2026-02-10",
    },
  ];

  // MOCK DATA - Never purchased products for cross-sell opportunities
  const neverPurchased = [
    { id: 5, name: "Advanced Analytics Module", avgPrice: 4500 },
    { id: 6, name: "Custom Integration Pack", avgPrice: 6000 },
    { id: 7, name: "Training & Onboarding", avgPrice: 2500 },
  ];

  // MOCK DATA - Purchase behavior insights
  const behavior = {
    avgReorderCycle: 32,
    favoriteCategory: "Enterprise Solutions",
    purchaseChannel: "Manual Order",
    repeatPurchaseRate: 68,
  };

  // MOCK DATA - Replace with API call: GET /api/zoho/customers/:id/timeline
  const timeline = [
    {
      id: 1,
      type: "order",
      date: "2026-02-28",
      description: "Order #INV-1245 placed",
      amount: 6800,
    },
    {
      id: 2,
      type: "payment",
      date: "2026-02-27",
      description: "Payment received for Order #INV-1240",
      amount: 3200,
    },
    {
      id: 3,
      type: "order",
      date: "2026-02-15",
      description: "Order #INV-1240 placed",
      amount: 3200,
    },
    {
      id: 4,
      type: "credit",
      date: "2026-01-28",
      description: "Credit note issued",
      amount: -500,
    },
    {
      id: 5,
      type: "order",
      date: "2026-01-20",
      description: "Order #INV-1198 placed",
      amount: 9000,
    },
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
      {/* Back Navigation */}
      <Link to="/customers">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </Button>
      </Link>

      {/* Customer Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4" data-placeholder="{{customerName}}">
                {customer.name}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium" data-placeholder="{{customerEmail}}">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium" data-placeholder="{{customerPhone}}">
                      {customer.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium" data-placeholder="{{customerLocation}}">
                      {customer.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Customer Since</p>
                    <p className="text-sm font-medium" data-placeholder="{{customerSince}}">
                      {formatDate(customer.customerSince)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t">
                <div>
                  <p className="text-sm text-gray-500">Lifetime Revenue</p>
                  <p className="text-2xl font-bold text-gray-900" data-placeholder="{{lifetimeRevenue}}">
                    {formatCurrency(metrics.lifetimeRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900" data-placeholder="{{totalOrders}}">
                    {metrics.totalOrders}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900" data-placeholder="{{avgOrderValue}}">
                    {formatCurrency(metrics.averageOrderValue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Order</p>
                  <p className="text-2xl font-bold text-gray-900" data-placeholder="{{lastOrderDate}}">
                    {formatDate(customer.lastOrderDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Days Since Last Order</p>
                  <p className="text-2xl font-bold text-gray-900" data-placeholder="{{daysSinceLastOrder}}">
                    {customer.daysSinceLastOrder}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add to Segment
              </Button>
              <Button size="sm" className="gap-2">
                <Send className="w-4 h-4" />
                Push to Marketing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lifetime Revenue</p>
                <p className="text-2xl font-bold" data-placeholder="{{lifetimeRevenue}}">
                  {formatCurrency(metrics.lifetimeRevenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold" data-placeholder="{{totalOrders}}">
                  {metrics.totalOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold" data-placeholder="{{avgOrderValue}}">
                  {formatCurrency(metrics.averageOrderValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue This Year</p>
                <p className="text-2xl font-bold" data-placeholder="{{revenueThisYear}}">
                  {formatCurrency(metrics.revenueThisYear)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue Last Year</p>
                <p className="text-2xl font-bold" data-placeholder="{{revenueLastYear}}">
                  {formatCurrency(metrics.revenueLastYear)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-3 rounded-lg ${
                  metrics.revenueGrowth >= 0
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue Growth</p>
                <p className="text-2xl font-bold" data-placeholder="{{revenueGrowth}}">
                  {metrics.revenueGrowth.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue} data-placeholder="{{monthlyRevenue}}">
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="xaxis" dataKey="month" stroke="#888888" fontSize={12} />
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
                <Line
                  key="line-revenue"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue} data-placeholder="{{monthlyOrders}}">
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="xaxis" dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis key="yaxis" stroke="#888888" fontSize={12} />
                <Tooltip
                  key="tooltip"
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Bar key="bar-orders" dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Product Purchases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products Purchased</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-placeholder="{{productPurchases}}">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Product Name
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Quantity Purchased
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Total Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Avg Price Paid
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Last Purchased
                  </th>
                </tr>
              </thead>
              <tbody>
                {productPurchases.map((product) => (
                  <tr key={`product-${product.id}`} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-right">{product.quantity}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatCurrency(product.totalRevenue)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {formatCurrency(product.avgPrice)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-gray-600">
                      {formatDate(product.lastPurchased)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cross-Sell Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Cross-Sell Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3" data-placeholder="{{neverPurchased}}">
              {neverPurchased.map((product) => (
                <div
                  key={`never-purchased-${product.id}`}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">Never purchased</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {formatCurrency(product.avgPrice)}
                    </p>
                    <p className="text-xs text-gray-500">Avg price</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Purchase Behavior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" data-placeholder="{{purchaseBehavior}}">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Avg Reorder Cycle</span>
                <span className="font-bold text-gray-900">
                  {behavior.avgReorderCycle} days
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Favorite Category</span>
                <Badge variant="secondary">{behavior.favoriteCategory}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Purchase Channel</span>
                <Badge variant="outline">{behavior.purchaseChannel}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Repeat Purchase Rate</span>
                <span className="font-bold text-green-600">
                  {behavior.repeatPurchaseRate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" data-placeholder="{{activityTimeline}}">
            {timeline.map((activity) => (
              <div key={`activity-${activity.id}`} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div
                  className={`p-2 rounded-full ${
                    activity.type === "order"
                      ? "bg-blue-100 text-blue-600"
                      : activity.type === "payment"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {activity.type === "order" ? (
                    <ShoppingCart className="w-4 h-4" />
                  ) : activity.type === "payment" ? (
                    <DollarSign className="w-4 h-4" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                </div>
                <div
                  className={`font-bold ${
                    activity.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(activity.amount)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}