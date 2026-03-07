import { KPICard } from "../components/dashboard/KPICard";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { TopCustomers } from "../components/dashboard/TopCustomers";
import { NewCustomers } from "../components/dashboard/NewCustomers";
import { AtRiskCustomers } from "../components/dashboard/AtRiskCustomers";
import { TopProducts } from "../components/dashboard/TopProducts";
import { ProductPenetration } from "../components/dashboard/ProductPenetration";
import { CrossSellOpportunities } from "../components/dashboard/CrossSellOpportunities";
import { PopularBundles } from "../components/dashboard/PopularBundles";
import { CustomerSegments } from "../components/dashboard/CustomerSegments";
import { ExportPanel } from "../components/dashboard/ExportPanel";
import { FilterBuilder } from "../components/dashboard/FilterBuilder";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  BarChart3,
  Repeat,
} from "lucide-react";

// Mock KPI data - easily replaceable with API calls
// Replace with: const kpiData = await fetch('/api/kpis').then(res => res.json())
const mockKPIs = {
  totalRevenue: { value: "$2.4M", change: 12.5, label: "vs last year" },
  totalOrders: { value: "2,847", change: 8.3, label: "vs last month" },
  averageOrderValue: { value: "$843", change: -2.1, label: "vs last month" },
  totalCustomers: { value: "3,456", change: 15.2, label: "vs last year" },
  revenueGrowth: { value: "18.4%", change: 3.2, label: "YoY growth" },
  repeatRate: { value: "64%", change: 5.8, label: "vs last quarter" },
};

export function Dashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Welcome back! Here's your customer analytics overview.
        </p>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" data-placeholder="{{kpiMetrics}}">
        <KPICard
          title="Total Revenue"
          value={mockKPIs.totalRevenue.value}
          change={mockKPIs.totalRevenue.change}
          changeLabel={mockKPIs.totalRevenue.label}
          icon={DollarSign}
          iconColor="bg-green-100 text-green-600"
          dataPlaceholder="{{totalRevenue}}"
        />
        <KPICard
          title="Total Orders"
          value={mockKPIs.totalOrders.value}
          change={mockKPIs.totalOrders.change}
          changeLabel={mockKPIs.totalOrders.label}
          icon={ShoppingCart}
          iconColor="bg-blue-100 text-blue-600"
          dataPlaceholder="{{totalOrders}}"
        />
        <KPICard
          title="Average Order Value"
          value={mockKPIs.averageOrderValue.value}
          change={mockKPIs.averageOrderValue.change}
          changeLabel={mockKPIs.averageOrderValue.label}
          icon={TrendingUp}
          iconColor="bg-purple-100 text-purple-600"
          dataPlaceholder="{{averageOrderValue}}"
        />
        <KPICard
          title="Total Customers"
          value={mockKPIs.totalCustomers.value}
          change={mockKPIs.totalCustomers.change}
          changeLabel={mockKPIs.totalCustomers.label}
          icon={Users}
          iconColor="bg-orange-100 text-orange-600"
          dataPlaceholder="{{totalCustomers}}"
        />
        <KPICard
          title="Revenue Growth (YoY)"
          value={mockKPIs.revenueGrowth.value}
          change={mockKPIs.revenueGrowth.change}
          changeLabel={mockKPIs.revenueGrowth.label}
          icon={BarChart3}
          iconColor="bg-indigo-100 text-indigo-600"
          dataPlaceholder="{{revenueGrowth}}"
        />
        <KPICard
          title="Repeat Customer Rate"
          value={mockKPIs.repeatRate.value}
          change={mockKPIs.repeatRate.change}
          changeLabel={mockKPIs.repeatRate.label}
          icon={Repeat}
          iconColor="bg-pink-100 text-pink-600"
          dataPlaceholder="{{repeatCustomerRate}}"
        />
      </div>

      {/* Revenue Analytics Section */}
      <div>
        <RevenueChart />
      </div>

      {/* Customer Insights Section */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Customer Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <TopCustomers />
          <NewCustomers />
          <AtRiskCustomers />
        </div>
      </div>

      {/* Product Analytics Section */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Product Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <TopProducts />
          <ProductPenetration />
          <CrossSellOpportunities />
          <PopularBundles />
        </div>
      </div>

      {/* Customer Segments & Export */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomerSegments />
        <ExportPanel />
      </div>

      {/* Advanced Filter Builder */}
      <div>
        <FilterBuilder />
      </div>
    </div>
  );
}