import { Link } from "react-router";
import { Eye, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

/**
 * Customers Page
 * 
 * Customer list and management interface with:
 * - Searchable customer table
 * - Customer filtering options
 * - Quick stats and metrics
 * - Links to individual customer profiles
 * 
 * API Integration Points:
 * - GET /api/zoho/customers - List all customers
 * - GET /api/zoho/customers/search - Search customers
 * - GET /api/zoho/customers/filter - Filter customers by criteria
 */
export function Customers() {
  // MOCK DATA - Replace with API call: GET /api/zoho/customers
  const customers = [
    {
      id: "CUST-001",
      name: "Acme Corporation",
      email: "contact@acmecorp.com",
      revenue: 125840,
      orders: 47,
      lastOrder: "2026-02-28",
      status: "Active",
      location: "San Francisco, CA",
    },
    {
      id: "CUST-002",
      name: "TechStart Inc",
      email: "billing@techstart.io",
      revenue: 89500,
      orders: 32,
      lastOrder: "2025-12-15",
      status: "At Risk",
      location: "Austin, TX",
    },
    {
      id: "CUST-003",
      name: "Global Solutions Ltd",
      email: "accounts@globalsol.com",
      revenue: 156200,
      orders: 58,
      lastOrder: "2026-01-20",
      status: "Active",
      location: "New York, NY",
    },
    {
      id: "CUST-004",
      name: "Digital Dynamics",
      email: "info@digitaldynamics.com",
      revenue: 72300,
      orders: 28,
      lastOrder: "2025-11-20",
      status: "At Risk",
      location: "Seattle, WA",
    },
    {
      id: "CUST-005",
      name: "Innovation Labs",
      email: "contact@innovlabs.com",
      revenue: 94800,
      orders: 41,
      lastOrder: "2026-02-15",
      status: "Active",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">
            Manage and analyze your customer database from Zoho Invoice.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-placeholder="{{customerList}}">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Email
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{customer.email}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatCurrency(customer.revenue)}
                    </td>
                    <td className="py-3 px-4 text-right">{customer.orders}</td>
                    <td className="py-3 px-4 text-right text-sm text-gray-600">
                      {formatDate(customer.lastOrder)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{customer.location}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={customer.status === "Active" ? "default" : "secondary"}
                        className={
                          customer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link to={`/customers/${customer.id}`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}