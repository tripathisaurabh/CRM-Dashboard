import { useState } from "react";
import { Link } from "react-router";
import {
  Save,
  Download,
  Send,
  Users,
  DollarSign,
  RefreshCw,
  Tag,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

/**
 * Customer Segmentation Page
 * 
 * Preset-based customer segmentation with:
 * - Simple segment type selection with all required filters
 * - Saved segments that auto-refresh on data sync
 * - Live customer preview
 * - Export to CSV and marketing platforms (ActiveCampaign, Omnisend, Drip)
 * - Custom tags and fields for marketing platform integration
 * - Automatic contact updates without creating duplicates
 * 
 * API Integration Points:
 * - GET /api/segments - Get all saved segments
 * - POST /api/segments - Save new segment
 * - PUT /api/segments/:id - Update existing segment
 * - DELETE /api/segments/:id - Delete segment
 * - POST /api/segments/:id/preview - Get preview of matching customers
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

interface SavedSegment {
  id: string;
  name: string;
  type: SegmentType;
  customerCount: number;
  lastRefreshed: string;
  filters: any;
}

export function Segments() {
  const [viewMode, setViewMode] = useState<"create" | "list">("list");
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  
  const [segmentName, setSegmentName] = useState("");
  const [segmentType, setSegmentType] = useState<SegmentType>("inactive");
  
  // Filter values based on segment type
  const [productA, setProductA] = useState("");
  const [productB, setProductB] = useState("");
  const [inactiveDays, setInactiveDays] = useState("60");
  const [topCustomersCount, setTopCustomersCount] = useState("100");
  const [location, setLocation] = useState("");

  // Tags and custom fields
  const [includeLifetimeRevenue, setIncludeLifetimeRevenue] = useState(true);
  const [includeLastOrderDate, setIncludeLastOrderDate] = useState(true);
  const [includeOrderCount, setIncludeOrderCount] = useState(true);
  const [includeTopProduct, setIncludeTopProduct] = useState(false);

  // MOCK DATA - Saved segments (Replace with GET /api/segments)
  const savedSegments: SavedSegment[] = [
    {
      id: "seg-1",
      name: "High-Value At-Risk Customers",
      type: "inactive",
      customerCount: 47,
      lastRefreshed: "2026-03-06T10:30:00",
      filters: { inactiveDays: "60" },
    },
    {
      id: "seg-2",
      name: "Premium Package Cross-Sell",
      type: "product-comparison",
      customerCount: 123,
      lastRefreshed: "2026-03-06T10:30:00",
      filters: { productA: "Basic Service B", productB: "Premium Package A" },
    },
    {
      id: "seg-3",
      name: "Top 100 Revenue Customers",
      type: "top-revenue",
      customerCount: 100,
      lastRefreshed: "2026-03-06T10:30:00",
      filters: { topCustomersCount: "100" },
    },
    {
      id: "seg-4",
      name: "Declining Revenue Alert",
      type: "declining-revenue",
      customerCount: 34,
      lastRefreshed: "2026-03-06T10:30:00",
      filters: {},
    },
  ];

  // MOCK DATA - Product list for dropdowns
  const products = [
    "Premium Package A",
    "Basic Service B",
    "Enterprise Solution C",
    "Support Package D",
    "Advanced Analytics Module",
    "Custom Integration Pack",
    "Training & Onboarding",
  ];

  // MOCK DATA - Location list
  const locations = [
    "San Francisco, CA",
    "Austin, TX",
    "New York, NY",
    "Seattle, WA",
    "Boston, MA",
    "Chicago, IL",
    "Los Angeles, CA",
  ];

  // MOCK DATA - Replace with API call: POST /api/segments/:id/preview
  const previewCustomers = [
    {
      id: 1,
      name: "Acme Corporation",
      email: "contact@acmecorp.com",
      lifetimeRevenue: 125840,
      orderCount: 47,
      lastOrderDate: "2025-12-15",
      topProduct: "Premium Package A",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      name: "TechStart Inc",
      email: "billing@techstart.io",
      lifetimeRevenue: 89500,
      orderCount: 32,
      lastOrderDate: "2025-11-28",
      topProduct: "Enterprise Solution C",
      location: "Austin, TX",
    },
    {
      id: 3,
      name: "Global Systems Ltd",
      email: "orders@globalsys.com",
      lifetimeRevenue: 156200,
      orderCount: 58,
      lastOrderDate: "2025-12-10",
      topProduct: "Premium Package A",
      location: "New York, NY",
    },
    {
      id: 4,
      name: "Digital Ventures",
      email: "finance@digitalventures.net",
      lifetimeRevenue: 67800,
      orderCount: 23,
      lastOrderDate: "2025-11-15",
      topProduct: "Basic Service B",
      location: "Seattle, WA",
    },
    {
      id: 5,
      name: "Innovation Labs",
      email: "procurement@innovlabs.com",
      lifetimeRevenue: 103500,
      orderCount: 41,
      lastOrderDate: "2025-12-05",
      topProduct: "Advanced Analytics Module",
      location: "Boston, MA",
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

  const handleCreateNew = () => {
    setViewMode("create");
    setEditingSegmentId(null);
    setSegmentName("");
    setSegmentType("inactive");
    setProductA("");
    setProductB("");
    setInactiveDays("60");
    setTopCustomersCount("100");
    setLocation("");
  };

  const handleEditSegment = (segment: SavedSegment) => {
    setViewMode("create");
    setEditingSegmentId(segment.id);
    setSegmentName(segment.name);
    setSegmentType(segment.type);
    // Load saved filters
    if (segment.filters.productA) setProductA(segment.filters.productA);
    if (segment.filters.productB) setProductB(segment.filters.productB);
    if (segment.filters.inactiveDays) setInactiveDays(segment.filters.inactiveDays);
    if (segment.filters.topCustomersCount) setTopCustomersCount(segment.filters.topCustomersCount);
    if (segment.filters.location) setLocation(segment.filters.location);
  };

  const handleSaveSegment = () => {
    if (editingSegmentId) {
      // PUT /api/segments/:id
      console.log("Updating segment:", editingSegmentId);
    } else {
      // POST /api/segments
      console.log("Creating new segment");
    }
    
    console.log({
      name: segmentName,
      type: segmentType,
      filters: {
        productA,
        productB,
        inactiveDays,
        topCustomersCount,
        location,
      },
      customFields: {
        includeLifetimeRevenue,
        includeLastOrderDate,
        includeOrderCount,
        includeTopProduct,
      },
    });
    
    alert(editingSegmentId ? "Segment updated successfully!" : "Segment saved successfully!");
    setViewMode("list");
  };

  const handleDeleteSegment = (segmentId: string) => {
    // DELETE /api/segments/:id
    if (confirm("Are you sure you want to delete this segment?")) {
      console.log("Deleting segment:", segmentId);
      alert("Segment deleted successfully!");
    }
  };

  const handleExportCSV = () => {
    // POST /api/segments/:id/export/csv
    alert("Exporting segment to CSV...");
  };

  const handlePushToActiveCampaign = () => {
    // POST /api/segments/:id/export/activecampaign
    alert("Pushing segment to ActiveCampaign with selected custom fields. Existing contacts will be updated without creating duplicates.");
  };

  const handlePushToOmnisend = () => {
    // POST /api/segments/:id/export/omnisend
    alert("Pushing segment to Omnisend with selected custom fields. Existing contacts will be updated without creating duplicates.");
  };

  const handlePushToDrip = () => {
    // POST /api/segments/:id/export/drip
    alert("Pushing segment to Drip with selected custom fields. Existing contacts will be updated without creating duplicates.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Customer Segments
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Create and manage customer segments with automatic data synchronization
          </p>
        </div>
        {viewMode === "list" && (
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Segment
          </Button>
        )}
        {viewMode === "create" && (
          <Button onClick={() => setViewMode("list")} variant="outline">
            Back to Segments
          </Button>
        )}
      </div>

      {/* Auto-Refresh Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Auto-Refreshing Segments
              </p>
              <p className="text-xs text-blue-700">
                Segments automatically refresh when new Zoho Invoice data syncs. When pushing to marketing platforms, existing contacts are updated without creating duplicates—ensuring your email lists stay clean and accurate.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Segments List View */}
      {viewMode === "list" && (
        <div className="grid grid-cols-1 gap-4">
          {savedSegments.map((segment) => (
            <Card key={segment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link to={`/segments/${segment.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                          {segment.name}
                        </h3>
                      </Link>
                      <Badge variant="secondary">
                        {getSegmentTypeLabel(segment.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{segment.customerCount} customers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>Last refreshed: {formatDateTime(segment.lastRefreshed)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Auto-sync enabled</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/segments/${segment.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleEditSegment(segment)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteSegment(segment.id)}
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <Button
                    onClick={handleExportCSV}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                  <Button
                    onClick={handlePushToActiveCampaign}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    ActiveCampaign
                  </Button>
                  <Button
                    onClick={handlePushToOmnisend}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Omnisend
                  </Button>
                  <Button
                    onClick={handlePushToDrip}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Drip
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {savedSegments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No segments created yet
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Create your first customer segment to start organizing your customers
                </p>
                <Button onClick={handleCreateNew} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Segment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Create/Edit Segment View */}
      {viewMode === "create" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Segment Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Segment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Segment Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Segment Name
                  </label>
                  <Input
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                    placeholder="e.g., High-Value At-Risk Customers"
                    data-placeholder="{{segmentName}}"
                  />
                </div>

                {/* Segment Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Segment Type
                  </label>
                  <Select
                    value={segmentType}
                    onValueChange={(value) => setSegmentType(value as SegmentType)}
                  >
                    <SelectTrigger data-placeholder="{{segmentType}}">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-comparison">
                        Bought Product A but not B
                      </SelectItem>
                      <SelectItem value="inactive">
                        Inactive for X days
                      </SelectItem>
                      <SelectItem value="lapsed-buyers">
                        Ordered Last Year, Not This Year
                      </SelectItem>
                      <SelectItem value="top-revenue">
                        Top Customers by Revenue
                      </SelectItem>
                      <SelectItem value="declining-revenue">
                        Declining Revenue YoY
                      </SelectItem>
                      <SelectItem value="single-product">
                        Single Product Customers
                      </SelectItem>
                      <SelectItem value="location">
                        Customers by Location
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dynamic Filters Based on Segment Type */}
                {segmentType === "product-comparison" && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-600 uppercase">
                      Product Filter
                    </p>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Product A (Purchased)
                      </label>
                      <Select value={productA} onValueChange={setProductA}>
                        <SelectTrigger data-placeholder="{{productA}}">
                          <SelectValue placeholder="Select product..." />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Product B (Not Purchased)
                      </label>
                      <Select value={productB} onValueChange={setProductB}>
                        <SelectTrigger data-placeholder="{{productB}}">
                          <SelectValue placeholder="Select product..." />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {segmentType === "inactive" && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-600 uppercase mb-3">
                      Inactivity Period
                    </p>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        No orders in the last
                      </label>
                      <Select value={inactiveDays} onValueChange={setInactiveDays}>
                        <SelectTrigger data-placeholder="{{inactiveDays}}">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {segmentType === "lapsed-buyers" && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-600 uppercase mb-2">
                      Filter Criteria
                    </p>
                    <p className="text-sm text-gray-700">
                      Customers who placed at least one order in 2025 but have not ordered in 2026 (current year).
                    </p>
                  </div>
                )}

                {segmentType === "top-revenue" && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-600 uppercase mb-3">
                      Revenue Ranking
                    </p>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Number of Customers
                      </label>
                      <Select
                        value={topCustomersCount}
                        onValueChange={setTopCustomersCount}
                      >
                        <SelectTrigger data-placeholder="{{topCustomersCount}}">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">Top 50</SelectItem>
                          <SelectItem value="100">Top 100</SelectItem>
                          <SelectItem value="250">Top 250</SelectItem>
                          <SelectItem value="500">Top 500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {segmentType === "declining-revenue" && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-600 uppercase mb-2">
                      Filter Criteria
                    </p>
                    <p className="text-sm text-gray-700">
                      Customers whose total revenue in 2026 is lower than their total revenue in 2025.
                    </p>
                  </div>
                )}

                {segmentType === "single-product" && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-600 uppercase mb-2">
                      Filter Criteria
                    </p>
                    <p className="text-sm text-gray-700">
                      Customers who have only purchased a single unique product (opportunity for cross-selling).
                    </p>
                  </div>
                )}

                {segmentType === "location" && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-600 uppercase mb-3">
                      Geographic Filter
                    </p>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Location
                      </label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger data-placeholder="{{location}}">
                          <SelectValue placeholder="Select location..." />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button onClick={handleSaveSegment} className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    {editingSegmentId ? "Update Segment" : "Save Segment"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags and Custom Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Export Tags & Fields
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-gray-500 mb-3">
                  Select custom fields to include when pushing to marketing platforms. These fields will update existing contacts without creating duplicates.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLifetimeRevenue}
                    onChange={(e) => setIncludeLifetimeRevenue(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Lifetime Revenue</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLastOrderDate}
                    onChange={(e) => setIncludeLastOrderDate(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Last Order Date</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeOrderCount}
                    onChange={(e) => setIncludeOrderCount(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Order Count</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTopProduct}
                    onChange={(e) => setIncludeTopProduct(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Top Product Purchased</span>
                </label>
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
              <CardContent className="space-y-2">
                <p className="text-xs text-gray-500 mb-3">
                  Export options will update existing contacts without creating duplicates
                </p>
                <Button
                  onClick={handleExportCSV}
                  variant="outline"
                  className="w-full gap-2 justify-start"
                >
                  <Download className="w-4 h-4" />
                  Export to CSV
                </Button>
                <Button
                  onClick={handlePushToActiveCampaign}
                  variant="outline"
                  className="w-full gap-2 justify-start"
                >
                  <Send className="w-4 h-4" />
                  Push to ActiveCampaign
                </Button>
                <Button
                  onClick={handlePushToOmnisend}
                  variant="outline"
                  className="w-full gap-2 justify-start"
                >
                  <Send className="w-4 h-4" />
                  Push to Omnisend
                </Button>
                <Button
                  onClick={handlePushToDrip}
                  variant="outline"
                  className="w-full gap-2 justify-start"
                >
                  <Send className="w-4 h-4" />
                  Push to Drip
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Customer Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customer Preview</CardTitle>
                  <Badge variant="secondary" className="gap-1">
                    <Users className="w-3 h-3" />
                    {previewCustomers.length} customers
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1" data-placeholder="{{previewDescription}}">
                  Live preview of customers matching your segment criteria
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full" data-placeholder="{{customerPreview}}">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                          Customer
                        </th>
                        {includeLifetimeRevenue && (
                          <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                            Lifetime Revenue
                          </th>
                        )}
                        {includeOrderCount && (
                          <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">
                            Orders
                          </th>
                        )}
                        {includeLastOrderDate && (
                          <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                            Last Order
                          </th>
                        )}
                        {includeTopProduct && (
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                            Top Product
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {previewCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {customer.name}
                              </p>
                              <p className="text-sm text-gray-500">{customer.email}</p>
                            </div>
                          </td>
                          {includeLifetimeRevenue && (
                            <td className="py-3 px-4 text-right font-medium text-gray-900">
                              {formatCurrency(customer.lifetimeRevenue)}
                            </td>
                          )}
                          {includeOrderCount && (
                            <td className="py-3 px-4 text-center">
                              <Badge variant="secondary">{customer.orderCount}</Badge>
                            </td>
                          )}
                          {includeLastOrderDate && (
                            <td className="py-3 px-4 text-right text-sm text-gray-600">
                              {formatDate(customer.lastOrderDate)}
                            </td>
                          )}
                          {includeTopProduct && (
                            <td className="py-3 px-4 text-sm text-gray-700">
                              {customer.topProduct}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <p className="text-2xl font-bold text-gray-900">
                        {previewCustomers.length}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">Total Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(
                          previewCustomers.reduce(
                            (sum, c) => sum + c.lifetimeRevenue,
                            0
                          )
                        )}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">Total Revenue</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(
                          previewCustomers.reduce(
                            (sum, c) => sum + c.lifetimeRevenue,
                            0
                          ) / previewCustomers.length
                        )}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">Avg per Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}