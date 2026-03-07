Create a Product Analytics Dashboard for a Customer Analytics platform powered by Zoho Invoice data.

Design for desktop (1440px) using a clean SaaS analytics layout.

Use mock data placeholders so developers can later connect the UI to APIs.

Page Structure

Product KPI Section
Create KPI cards for:

- Total Products Sold
- Total Product Revenue
- Average Product Price
- Unique Customers per Product
- Repeat Purchase Rate
- Product Penetration %

Revenue by Product Chart
Create a bar chart showing revenue by product.

Top Products Table
Create a table ranking products by revenue.

Columns:
- Product Name
- Revenue
- Quantity Sold
- Unique Customers
- Repeat Purchase Rate

Product Penetration Chart
Create a donut or pie chart showing:
- Customers who purchased product
- Customers who did not purchase

Cross-Sell Analysis
Create a "Frequently Bought Together" section.

Example:
Product A + Product B
Product C + Product D

Display:
- number of orders
- cross-sell frequency

Product Gap Analysis
Create a table showing:

Customers who bought Product A but not Product B.

Columns:
- Customer Name
- Revenue
- Orders
- Last Order Date

Reorder Cycle Widget
Display estimated reorder cycle per product.

Example:
Product A → 45 days
Product B → 60 days

Design Requirements
Use reusable components and Auto Layout.

Typography: Inter
Spacing: 8px grid
Soft shadows and card layout.

Use placeholders such as:
{{topProducts}}
{{productRevenue}}
{{productPenetration}}
{{crossSellProducts}}

Ensure the layout can easily be converted to React components later.