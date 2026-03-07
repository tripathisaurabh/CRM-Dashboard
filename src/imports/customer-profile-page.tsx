Create a modern SaaS-style "Customer Profile Page" for a Customer Analytics Dashboard powered by Zoho Invoice data.

Design for desktop (1440px width) with a clean analytics layout similar to Stripe, HubSpot, or Segment dashboards.

The page should provide a complete 360° view of a single customer and use mock placeholder data that can later be replaced with API responses.

Structure the page as follows:

Top Header Section
Display a customer summary card with:
- Customer Name
- Email
- Phone
- Location
- Customer since date
- Total lifetime revenue
- Total orders
- Average order value
- Last order date
- Days since last order

Include action buttons:
- Export Customer Data
- Add to Segment
- Push to Marketing Platform

Customer Metrics Section
Create KPI cards for:
- Lifetime Revenue
- Total Orders
- Average Order Value
- Revenue This Year
- Revenue Last Year
- Revenue Growth %

Charts Section
Create analytics charts including:
1. Monthly Revenue Trend (line chart)
2. Orders Per Month (bar chart)
3. Average Order Value Trend

Product Purchase Section
Create a table showing products purchased by this customer.

Columns:
- Product Name
- Quantity Purchased
- Total Revenue
- Average Price Paid
- Last Purchased Date

Top Products Widget
Show the customer's most purchased products.

Missing Products Section
Show "Products Never Purchased" to help identify cross-sell opportunities.

Purchase Behavior Section
Display:
- Average reorder cycle
- Favorite product category
- Purchase channel (Manual order or Shopify)

Customer Timeline
Create a chronological activity timeline showing:
- Orders placed
- Payments made
- Credits issued

Design Requirements
Use reusable components and Auto Layout.

Typography: Inter or modern sans-serif
Grid: 8px spacing
Use soft cards with subtle shadows.

Use placeholder data variables such as:
{{customerName}}
{{lifetimeRevenue}}
{{totalOrders}}
{{avgOrderValue}}
{{monthlyRevenue}}
{{topProducts}}

Ensure all components can later be connected to APIs.