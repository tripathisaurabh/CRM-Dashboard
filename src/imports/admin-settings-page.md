Design an "Admin Settings" page for a Customer Analytics Dashboard that uses Zoho Invoice data.

The purpose of this page is to allow administrators to manage product normalization and upload product cost data.

Design for desktop (1440px) using a clean SaaS dashboard layout.

The page should contain two main sections.

----------------------------------------------------

SECTION 1: Product Name / SKU Normalization

Purpose:
Products may appear with different names across invoices. Admins must normalize them into a single product name or SKU.

Create a table with the following columns:

• Original Product Name (from invoice)
• Normalized Product Name
• SKU
• Status

Example rows:
Original Name: "Product A - Large"
Normalized Name: "Product A"
SKU: PROD-A

Original Name: "Product A (L)"
Normalized Name: "Product A"
SKU: PROD-A

Admin Actions:
• Edit normalized name
• Edit SKU
• Merge duplicate products

Include buttons:
• Save Changes
• Add New Mapping

Explain with helper text:
"Normalize product names or SKUs when they appear differently across invoices."

----------------------------------------------------

SECTION 2: Product Cost Upload (COGS)

Purpose:
Admins can upload product cost data to calculate Cost of Goods Sold.

Create a card section titled:
"Upload Product Costs (COGS)"

Include:

Upload CSV Button

Supported CSV format:
Columns should include:
• Product Name
• SKU
• Cost Per Unit

Example CSV:

Product Name, SKU, Cost
Product A, PROD-A, 12.50
Product B, PROD-B, 7.20

After upload display a table:

Columns:
• Product Name
• SKU
• Cost per Unit
• Last Updated

Include buttons:
• Upload CSV
• Replace Existing Data

Helper text:
"Upload product cost data to calculate product profitability."

----------------------------------------------------

Design Requirements

Use reusable UI components and Auto Layout.

Typography:
Inter or modern sans-serif

Spacing:
8px grid

Use soft cards with subtle shadows.

Use placeholder variables such as:
{{productMappings}}
{{productCosts}}

Ensure components can later be connected to APIs.