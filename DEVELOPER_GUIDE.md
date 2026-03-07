# Customer Analytics Platform - Developer Guide

## Overview

This is a modern SaaS-style dashboard for analyzing customer data from Zoho Invoice. The UI is built with React, React Router, Tailwind CSS, and Recharts.

## Project Structure

```
/src/app/
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── KPICard.tsx           # Reusable KPI metric card
│   │   ├── RevenueChart.tsx      # Revenue & orders chart
│   │   ├── TopCustomers.tsx      # Top customers by revenue
│   │   ├── NewCustomers.tsx      # New customer acquisitions
│   │   ├── AtRiskCustomers.tsx   # Inactive customers (60+ days)
│   │   ├── TopProducts.tsx       # Best performing products
│   │   ├── ProductPenetration.tsx # Product distribution chart
│   │   ├── CrossSellOpportunities.tsx # Cross-sell recommendations
│   │   ├── PopularBundles.tsx    # Product bundle analysis
│   │   ├── CustomerSegments.tsx  # Customer segment overview
│   │   ├── ExportPanel.tsx       # Export & marketing sync buttons
│   │   └── FilterBuilder.tsx     # Advanced filter builder UI
│   ├── layouts/           # Layout components
│   │   ├── Sidebar.tsx           # Left navigation sidebar
│   │   ├── TopNav.tsx            # Top navigation bar
│   │   └── DashboardLayout.tsx   # Main layout wrapper
│   └── ui/                # Shadcn UI components
├── pages/                 # Route pages
│   ├── Dashboard.tsx             # Main dashboard page
│   ├── Customers.tsx             # Customer list and management
│   ├── CustomerProfile.tsx       # Individual customer 360° view
│   ├── Products.tsx              # Product analytics dashboard
│   ├── Segments.tsx              # Advanced segment builder
│   ├── Exports.tsx               # Export management (placeholder)
│   ├── MarketingSync.tsx         # Marketing sync (placeholder)
│   ├── Reports.tsx               # Reports (placeholder)
│   ├── ProductMapping.tsx        # Product mapping (placeholder)
│   ├── COGSUpload.tsx            # COGS upload (placeholder)
│   ├── SyncLogs.tsx              # Sync logs (placeholder)
│   └── Settings.tsx              # Settings (placeholder)
├── data/
│   └── mockData.ts               # Mock data documentation
├── routes.ts                     # React Router configuration
└── App.tsx                       # Main app component
```

## Design System

### Typography
- Font: Inter (loaded from Google Fonts)
- Font sizes follow default Tailwind scale
- Font weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Colors
- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)
- Neutrals: Gray scale

### Spacing
- Based on 8px grid system
- Uses Tailwind spacing utilities (p-4, m-6, gap-8, etc.)

### Components
- Rounded corners: 8-10px (rounded-lg)
- Shadows: Subtle box shadows on cards
- Borders: 1px solid, light gray (#e5e7eb)

## Mock Data & API Integration

All components use inline mock data with clear placeholder attributes. Look for:

- `data-placeholder="{{variableName}}"` attributes on elements
- Comments like `// Mock data placeholder - easily replaceable with {{apiEndpoint}}`

### Data Placeholders

#### KPI Metrics
```typescript
// Current: Inline mock object in Dashboard.tsx
// Replace with: 
const kpiData = await fetch('/api/zoho/kpis').then(res => res.json());
```

#### Top Customers
```typescript
// Current: mockCustomers array in TopCustomers.tsx
// Replace with:
const topCustomers = await fetch('/api/zoho/customers/top?limit=5')
  .then(res => res.json());
```

#### Revenue Chart
```typescript
// Current: mockData array in RevenueChart.tsx
// Replace with:
const revenueData = await fetch('/api/zoho/revenue/monthly')
  .then(res => res.json());
```

### API Endpoints to Implement

1. **KPIs**: `GET /api/zoho/kpis`
2. **Monthly Revenue**: `GET /api/zoho/revenue/monthly`
3. **Top Customers**: `GET /api/zoho/customers/top?limit={n}`
4. **New Customers**: `GET /api/zoho/customers/new?month={month}`
5. **At-Risk Customers**: `GET /api/zoho/customers/at-risk?days={n}`
6. **Top Products**: `GET /api/zoho/products/top?limit={n}`
7. **Product Penetration**: `GET /api/zoho/analytics/product-penetration`
8. **Cross-Sell Opportunities**: `GET /api/zoho/analytics/cross-sell`
9. **Popular Bundles**: `GET /api/zoho/analytics/bundles`
10. **Customer Segments**: `GET /api/zoho/segments`

#### Customer Profile Page Endpoints
11. **Customer Details**: `GET /api/zoho/customers/:id`
12. **Customer Metrics**: `GET /api/zoho/customers/:id/metrics`
13. **Customer Revenue Trends**: `GET /api/zoho/customers/:id/revenue`
14. **Customer Orders**: `GET /api/zoho/customers/:id/orders`
15. **Customer Products**: `GET /api/zoho/customers/:id/products`
16. **Customer Timeline**: `GET /api/zoho/customers/:id/timeline`

#### Segments Page Endpoints
17. **Save Segment**: `POST /api/segments`
18. **Update Segment**: `PUT /api/segments/:id`
19. **Preview Segment**: `POST /api/segments/preview`
20. **Export Segment**: `POST /api/segments/:id/export`

#### Products Page Endpoints
21. **Product Analytics**: `GET /api/zoho/products/analytics`
22. **Product Revenue**: `GET /api/zoho/products/revenue`
23. **Top Products**: `GET /api/zoho/products/top`
24. **Product Penetration**: `GET /api/zoho/products/penetration`
25. **Cross-Sell Analysis**: `GET /api/zoho/products/cross-sell`
26. **Gap Analysis**: `GET /api/zoho/products/gap-analysis`
27. **Reorder Cycles**: `GET /api/zoho/products/reorder-cycles`

## Implemented Pages

### 1. Customer Profile Page (`/customers/:customerId`)

A comprehensive 360° view of individual customers with:

**Features:**
- Customer contact information and summary
- 6 KPI metric cards (lifetime revenue, orders, AOV, yearly revenue, growth)
- Monthly revenue and orders trend charts
- Product purchase history table
- Cross-sell opportunities (never purchased products)
- Purchase behavior insights (reorder cycle, favorite category, etc.)
- Activity timeline showing orders, payments, and credits

**API Integration Points:**
- `GET /api/zoho/customers/:id` - Customer details
- `GET /api/zoho/customers/:id/metrics` - KPI metrics
- `GET /api/zoho/customers/:id/revenue` - Revenue trends
- `GET /api/zoho/customers/:id/products` - Product purchases
- `GET /api/zoho/customers/:id/timeline` - Activity history

**Mock Data Placeholders:**
- `{{customerName}}`, `{{customerEmail}}`, `{{customerPhone}}`
- `{{lifetimeRevenue}}`, `{{totalOrders}}`, `{{avgOrderValue}}`
- `{{monthlyRevenue}}`, `{{productPurchases}}`
- `{{neverPurchased}}`, `{{purchaseBehavior}}`
- `{{activityTimeline}}`

### 2. Customers List Page (`/customers`)

Customer management interface with:

**Features:**
- Comprehensive customer table with all key metrics
- Status indicators (Active, At Risk)
- Links to individual customer profile pages
- Filter and export functionality
- Sorting and search capabilities

**API Integration Points:**
- `GET /api/zoho/customers` - List all customers
- `GET /api/zoho/customers/search` - Search functionality
- `GET /api/zoho/customers/filter` - Filter by criteria

**Mock Data Placeholders:**
- `{{customerList}}` - Main customer table data

### 3. Segments Builder Page (`/segments`)

Advanced customer segmentation interface with:

**Features:**
- Segment name and description inputs
- Dynamic filter builder with AND/OR logic
- Multiple filter groups support
- Field selection (revenue, orders, products, location, etc.)
- Operator selection (equals, greater than, contains, etc.)
- Live preview of matching customers
- Segment summary metrics (total customers, revenue, AOV, lifetime value)
- Export to marketing platforms (ActiveCampaign, Omnisend, Drip)

**API Integration Points:**
- `POST /api/segments` - Save new segment
- `PUT /api/segments/:id` - Update segment
- `POST /api/segments/preview` - Get preview of matching customers
- `POST /api/segments/:id/export` - Export to marketing platform

**Mock Data Placeholders:**
- `{{segmentName}}`, `{{segmentDescription}}`
- `{{filterGroups}}` - Filter configuration
- `{{segmentCustomerCount}}`, `{{segmentRevenue}}`
- `{{segmentAvgOrderValue}}`, `{{segmentAvgLifetimeValue}}`
- `{{segmentCustomers}}` - Preview table data

**Filter Builder Logic:**
- Multiple filter groups combined with OR
- Conditions within a group combined with AND/OR (toggleable)
- Supports nested conditions for complex queries

### 4. Products Analytics Page (`/products`)

Comprehensive product performance dashboard with:

**Features:**
- 6 KPI metric cards (units sold, revenue, avg price, customers, repeat rate, penetration)
- Revenue by product bar chart
- Product penetration pie chart
- Top products ranking table with repeat purchase rates
- Frequently bought together analysis
- Product gap analysis for upsell opportunities
- Average reorder cycle by product
- Visual progress bars for cycle comparison

**API Integration Points:**
- `GET /api/zoho/products/analytics` - Product KPIs
- `GET /api/zoho/products/revenue` - Revenue by product
- `GET /api/zoho/products/top` - Top products ranking
- `GET /api/zoho/products/penetration` - Penetration data
- `GET /api/zoho/products/cross-sell` - Bundle analysis
- `GET /api/zoho/products/gap-analysis` - Upsell opportunities
- `GET /api/zoho/products/reorder-cycles` - Cycle insights

**Mock Data Placeholders:**
- `{{totalProductsSold}}`, `{{totalProductRevenue}}`, `{{avgProductPrice}}`
- `{{uniqueCustomersPerProduct}}`, `{{repeatPurchaseRate}}`, `{{productPenetration}}`
- `{{productRevenue}}` - Chart data
- `{{topProducts}}` - Ranking table
- `{{crossSellProducts}}` - Bundle combinations
- `{{gapAnalysis}}` - Upsell table
- `{{reorderCycles}}` - Cycle data

## Component Architecture

### Reusable Components

#### KPICard
```tsx
<KPICard
  title="Total Revenue"
  value="$2.4M"
  change={12.5}
  changeLabel="vs last year"
  icon={DollarSign}
  iconColor="bg-green-100 text-green-600"
  dataPlaceholder="{{totalRevenue}}"
/>
```

#### RevenueChart
```tsx
<RevenueChart />
// Data source: mockData array (line 11-24)
// Replace with API call
```

### Layout Structure

The app uses React Router with a nested layout:

```
DashboardLayout (sidebar + top nav)
  └── Dashboard (main content)
      ├── KPI Cards
      ├── Revenue Chart
      ├── Customer Insights
      ├── Product Analytics
      ├── Segments & Export
      └── Filter Builder
```

## Adding New Pages

1. Create a new page component in `/src/app/pages/`
2. Add route to `/src/app/routes.ts`:
```tsx
{ path: "new-page", Component: NewPage }
```
3. Add navigation link to `/src/app/components/layouts/Sidebar.tsx`

## Styling Guidelines

### Using Tailwind Classes
- Follow 8px spacing system: `p-2`, `p-4`, `p-6`, `p-8`
- Use semantic color classes: `bg-blue-600`, `text-gray-900`
- Hover states: `hover:bg-gray-100`, `hover:shadow-md`
- Transitions: `transition-colors`, `transition-shadow`

### Card Styling Pattern
```tsx
<Card className="shadow-sm hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

## State Management

Currently, the app uses local component state. For production:

1. **React Query** for server state management
2. **Zustand** or **Redux** for global client state
3. **React Hook Form** for form state (already installed)

## Export & Marketing Sync

The ExportPanel component includes buttons for:
- CSV Export
- ActiveCampaign integration
- Omnisend integration
- Drip integration

Implement these by connecting to respective API endpoints.

## Filter Builder

The FilterBuilder component provides a UI for building complex customer queries:
- Multiple filter rules
- AND/OR logic
- Field selection (product, revenue, orders, location, etc.)
- Operator selection (equals, contains, greater than, etc.)

Connect to a query builder API endpoint to apply filters.

## Performance Considerations

- Use React.lazy() for code splitting large pages
- Implement pagination for large data tables
- Use React Query's caching for API responses
- Optimize chart rendering with useMemo()

## Testing

Recommended testing approach:
1. **Unit tests**: Individual components with Jest + React Testing Library
2. **Integration tests**: Page-level tests with user interactions
3. **E2E tests**: Cypress or Playwright for critical user flows

## Deployment

The app is built with Vite. To deploy:

```bash
npm run build
# Outputs to /dist directory
```

Deploy the dist folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## Environment Variables

Create a `.env` file:

```env
VITE_ZOHO_API_URL=https://api.zoho.com/v1
VITE_ZOHO_CLIENT_ID=your_client_id
VITE_ZOHO_CLIENT_SECRET=your_client_secret
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_ZOHO_API_URL;
```

## Next Steps

1. **Implement Authentication**: Add login flow with Zoho OAuth
2. **Connect to Zoho API**: Replace all mock data with real API calls
3. **Add Loading States**: Show skeletons while data loads
4. **Error Handling**: Add error boundaries and error messages
5. **Build Remaining Pages**: Implement placeholder pages (Customers, Products, etc.)
6. **Add Filters**: Make the filter builder functional
7. **Export Functionality**: Implement CSV export and marketing sync
8. **Real-time Updates**: Add WebSocket support for live data
9. **Mobile Responsive**: Optimize for tablet and mobile views
10. **Dark Mode**: Implement dark mode toggle (theme system is ready)

## Support

For questions or issues, refer to:
- React Router Docs: https://reactrouter.com
- Tailwind CSS Docs: https://tailwindcss.com
- Recharts Docs: https://recharts.org
- Shadcn UI Docs: https://ui.shadcn.com