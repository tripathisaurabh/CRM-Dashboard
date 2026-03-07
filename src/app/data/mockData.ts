/**
 * MOCK DATA PLACEHOLDERS
 * 
 * This file contains all mock data used in the Customer Analytics Platform.
 * Replace these with actual API calls to Zoho Invoice when integrating with real data.
 * 
 * API Integration Guide:
 * =====================
 * 
 * 1. KPI Metrics (Dashboard)
 *    Endpoint: /api/zoho/kpis
 *    Returns: { totalRevenue, totalOrders, averageOrderValue, totalCustomers, revenueGrowth, repeatCustomerRate }
 * 
 * 2. Monthly Revenue Data
 *    Endpoint: /api/zoho/revenue/monthly
 *    Returns: Array<{ month: string, revenue: number, orders: number }>
 * 
 * 3. Top Customers
 *    Endpoint: /api/zoho/customers/top?limit=5
 *    Returns: Array<{ id, name, revenue, orders, lastPurchase }>
 * 
 * 4. New Customers
 *    Endpoint: /api/zoho/customers/new?month=current
 *    Returns: Array<{ id, name, email, revenue, orders, joinedDate }>
 * 
 * 5. At-Risk Customers
 *    Endpoint: /api/zoho/customers/at-risk?days=60
 *    Returns: Array<{ id, name, revenue, orders, lastPurchase, daysSinceLastOrder }>
 * 
 * 6. Top Products
 *    Endpoint: /api/zoho/products/top?limit=5
 *    Returns: Array<{ id, name, revenue, unitsSold, avgPrice }>
 * 
 * 7. Product Penetration
 *    Endpoint: /api/zoho/analytics/product-penetration
 *    Returns: Array<{ name, value, color }>
 * 
 * 8. Cross-Sell Opportunities
 *    Endpoint: /api/zoho/analytics/cross-sell
 *    Returns: Array<{ id, product, suggestedProduct, customers, potentialRevenue }>
 * 
 * 9. Popular Bundles
 *    Endpoint: /api/zoho/analytics/bundles
 *    Returns: Array<{ id, products: string[], customers, avgRevenue }>
 * 
 * 10. Customer Segments
 *     Endpoint: /api/zoho/segments
 *     Returns: Array<{ id, name, description, customers, icon, color, badgeColor }>
 * 
 * Example API Integration:
 * ========================
 * 
 * // Replace mock data with:
 * const kpiData = await fetch('/api/zoho/kpis').then(res => res.json());
 * 
 * // Or using React Query:
 * const { data: kpiData } = useQuery('kpis', () => 
 *   fetch('/api/zoho/kpis').then(res => res.json())
 * );
 */

// This file intentionally left empty - all mock data is inline in components
// with clear data-placeholder attributes for easy identification
export {};
