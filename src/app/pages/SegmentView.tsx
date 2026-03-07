import { useParams, Link } from "react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Download,
  Send,
  Users,
  DollarSign,
  RefreshCw,
  Edit,
  Trash2,
  CheckCircle,
  Filter,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";

/**
 * Segment View Page
 * 
 * Detailed view of a saved customer segment with:
 * - Segment configuration and filters
 * - Full customer list with all details
 * - Summary statistics and metrics
 * - Export actions to CSV and marketing platforms
 * - Edit and delete capabilities
 * - Auto-refresh status
 * 
 * API Integration Points:
 * - GET /api/segments/:id - Get segment details
 * - GET /api/segments/:id/customers - Get full customer list
 * - PUT /api/segments/:id/refresh - Manually trigger refresh
 * - DELETE /api/segments/:id - Delete segment
 * - POST /api/segments/:id/export/csv - Export to CSV
 * - POST /api/segments/:id/export/activecampaign - Push to ActiveCampaign
 * - POST /api/segments/:id/export/omnisend - Push to Omnisend
 * - POST /api/segments/:id/export/drip - Push to Drip
 */

type SegmentType =
  | "product-comparison"
  | "inactive"
  | "lapsed-buyers"
  | "top-revenue"
  | "declining-revenue"
  | "single-product"
  | "location";

export function SegmentView() {
  const { segmentId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  // MOCK DATA - Replace with GET /api/segments/:id
  const segment = {
    id: segmentId || "seg-1",
    name: "High-Value At-Risk Customers",
    type: "inactive" as SegmentType,
    description: "Customers with high lifetime value who haven't ordered in 60+ days",
    filters: {
      inactiveDays: "60",
    },
    customerCount: 47,
    totalRevenue: 4250380,
    avgRevenuePerCustomer: 90434,
    lastRefreshed: "2026-03-06T10:30:00",
    createdAt: "2026-02-15T14:20:00",
    autoRefreshEnabled: true,
    customFields: {
      includeLifetimeRevenue: true,
      includeLastOrderDate: true,
      includeOrderCount: true,
      includeTopProduct: false,
    },
  };

  // MOCK DATA - Replace with GET /api/segments/:id/customers
  const customers = [
    {
      id: 1,
      name: "Acme Corporation",
      email: "contact@acmecorp.com",
      lifetimeRevenue: 125840,
      orderCount: 47,
      lastOrderDate: "2025-12-15",
      daysSinceLastOrder: 81,
      topProduct: "Premium Package A",
      location: "San Francisco, CA",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "TechStart Inc",
      email: "billing@techstart.io",
      lifetimeRevenue: 89500,
      orderCount: 32,
      lastOrderDate: "2025-11-28",
      daysSinceLastOrder: 98,
      topProduct: "Enterprise Solution C",
      location: "Austin, TX",
      phone: "+1 (555) 234-5678",
    },
    {
      id: 3,
      name: "Global Systems Ltd",
      email: "orders@globalsys.com",
      lifetimeRevenue: 156200,
      orderCount: 58,
      lastOrderDate: "2025-12-10",
      daysSinceLastOrder: 86,
      topProduct: "Premium Package A",
      location: "New York, NY",
      phone: "+1 (555) 345-6789",
    },
    {
      id: 4,
      name: "Digital Ventures",
      email: "finance@digitalventures.net",
      lifetimeRevenue: 67800,
      orderCount: 23,
      lastOrderDate: "2025-11-15",
      daysSinceLastOrder: 111,
      topProduct: "Basic Service B",
      location: "Seattle, WA",
      phone: "+1 (555) 456-7890",
    },
    {
      id: 5,
      name: "Innovation Labs",
      email: "procurement@innovlabs.com",
      lifetimeRevenue: 103500,
      orderCount: 41,
      lastOrderDate: "2025-12-05",
      daysSinceLastOrder: 91,
      topProduct: "Advanced Analytics Module",
      location: "Boston, MA",
      phone: "+1 (555) 567-8901",
    },
    {
      id: 6,
      name: "CloudTech Solutions",
      email: "admin@cloudtech.com",
      lifetimeRevenue: 178900,
      orderCount: 62,
      lastOrderDate: "2025-12-01",
      daysSinceLastOrder: 95,
      topProduct: "Enterprise Solution C",
      location: "San Francisco, CA",
      phone: "+1 (555) 678-9012",
    },
    {
      id: 7,
      name: "Quantum Industries",
      email: "purchasing@quantum.io",
      lifetimeRevenue: 92300,
      orderCount: 28,
      lastOrderDate: "2025-11-20",
      daysSinceLastOrder: 106,
      topProduct: "Premium Package A",
      location: "Chicago, IL",
      phone: "+1 (555) 789-0123",
    },
    {
      id: 8,
      name: "Nexus Enterprises",
      email: "orders@nexusent.com",
      lifetimeRevenue: 134600,
      orderCount: 45,
      lastOrderDate: "2025-12-08",
      daysSinceLastOrder: 88,
      topProduct: "Support Package D",
      location: "Los Angeles, CA",
      phone: "+1 (555) 890-1234",
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getSegmentTypeLabel = (type: SegmentType) => {
    const labels = {
      "product-comparison": "Bought Product A but not B",
      "inactive": "Inactive Customers",
      "lapsed-buyers": "Ordered Last Year, Not This Year",
      "top-revenue": "Top Customers by Revenue",
      "declining-revenue": "Declining Revenue YoY",
      "single-product": "Single Product Customers",
      "location": "Customers by Location",
    };
    return labels[type];
  };

  const getFilterDescription = (type: SegmentType, filters: any) => {
    switch (type) {
      case "inactive":
        return `No orders in the last ${filters.inactiveDays} days`;
      case "product-comparison":
        return `Bought ${filters.productA} but not ${filters.productB}`;
      case "top-revenue":
        return `Top ${filters.topCustomersCount} customers by lifetime revenue`;
      case "location":
        return `Customers located in ${filters.location}`;
      case "lapsed-buyers":
        return "Ordered in 2025 but not in 2026";
      case "declining-revenue":
        return "Revenue in 2026 lower than 2025";
      case "single-product":
        return "Purchased only one unique product";
      default:
        return "";
    }
  };

  const handleManualRefresh = () => {
    // PUT /api/segments/:id/refresh
    alert("Manually refreshing segment data...");
  };

  const handleExportCSV = () => {
    // POST /api/segments/:id/export/csv
    alert("Exporting segment to CSV...");
  };

  const handlePushToActiveCampaign = () => {
    // POST /api/segments/:id/export/activecampaign
    alert("Pushing segment to ActiveCampaign...");
  };

  const handlePushToOmnisend = () => {
    // POST /api/segments/:id/export/omnisend
    alert("Pushing segment to Omnisend...");
  };

  const handlePushToDrip = () => {
    // POST /api/segments/:id/export/drip
    alert("Pushing segment to Drip...");
  };

  const handleDeleteSegment = () => {
    // DELETE /api/segments/:id
    if (confirm("Are you sure you want to delete this segment?")) {
      alert("Segment deleted successfully!");
      window.location.href = "/segments";
    }
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link to="/segments">
            <Button variant="ghost" size="sm" className="gap-2 mb-3">
              <ArrowLeft className="w-4 h-4" />
              Back to Segments
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {segment.name}
            </h1>
            <Badge variant="secondary">{getSegmentTypeLabel(segment.type)}</Badge>
            {segment.autoRefreshEnabled && (
              <Badge variant="outline" className="gap-1 text-green-600 border-green-600">
                <CheckCircle className="w-3 h-3" />
                Auto-sync
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{segment.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleManualRefresh} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Now
          </Button>
          <Link to={`/segments`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </Link>
          <Button
            onClick={handleDeleteSegment}
            variant="outline"
            size="sm"
            className="gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Auto-Refresh Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Last refreshed: {formatDateTime(segment.lastRefreshed)}
                </p>
                <p className="text-xs text-blue-700">
                  This segment automatically updates when new Zoho Invoice data syncs
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3 h-3" />
              {segment.customerCount} customers
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{segment.customerCount}</p>
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
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(segment.totalRevenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg per Customer</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(segment.avgRevenuePerCustomer)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatDate(segment.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Segment Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">
                {getFilterDescription(segment.type, segment.filters)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Type: {getSegmentTypeLabel(segment.type)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Export Segment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button onClick={handleExportCSV} variant="outline" className="gap-2 justify-start">
              <Download className="w-4 h-4" />
              Export to CSV
            </Button>
            <Button
              onClick={handlePushToActiveCampaign}
              variant="outline"
              className="gap-2 justify-start"
            >
              <Send className="w-4 h-4" />
              Push to ActiveCampaign
            </Button>
            <Button
              onClick={handlePushToOmnisend}
              variant="outline"
              className="gap-2 justify-start"
            >
              <Send className="w-4 h-4" />
              Push to Omnisend
            </Button>
            <Button
              onClick={handlePushToDrip}
              variant="outline"
              className="gap-2 justify-start"
            >
              <Send className="w-4 h-4" />
              Push to Drip
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Exports include custom fields: {segment.customFields.includeLifetimeRevenue && "Lifetime Revenue, "}
            {segment.customFields.includeLastOrderDate && "Last Order Date, "}
            {segment.customFields.includeOrderCount && "Order Count, "}
            {segment.customFields.includeTopProduct && "Top Product"}
          </p>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Customers in Segment</CardTitle>
            <div className="w-64">
              <Input
                type="search"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-placeholder="{{segmentCustomers}}">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Lifetime Revenue
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">
                    Orders
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Last Order
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">
                    Days Inactive
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {customer.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">
                      {formatCurrency(customer.lifetimeRevenue)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="secondary">{customer.orderCount}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-gray-600">
                      {formatDate(customer.lastOrderDate)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={customer.daysSinceLastOrder > 90 ? "destructive" : "secondary"}
                      >
                        {customer.daysSinceLastOrder} days
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{customer.location}</td>
                    <td className="py-3 px-4">
                      <div className="text-xs">
                        <p className="text-gray-600">{customer.email}</p>
                        <p className="text-gray-500">{customer.phone}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No customers found matching your search</p>
            </div>
          )}

          {/* Pagination placeholder */}
          {filteredCustomers.length > 0 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600">
                Showing {filteredCustomers.length} of {customers.length} customers
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
