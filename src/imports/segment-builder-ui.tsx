Create a modern "Customer Segment Builder" interface for a SaaS analytics dashboard.

The UI should allow marketing users to create dynamic customer segments using filters and logical conditions.

Design the interface for desktop (1440px).

Layout Structure

Top Header
Title: "Segment Builder"
Include:
- Segment Name Input
- Description Input
- Save Segment button

Filter Builder Section
Create a rule builder interface similar to HubSpot or Airtable filters.

Users should be able to create conditions like:

Customer filters:
- Lifetime Revenue
- Total Orders
- Last Order Date
- Days Since Last Order
- Location

Product filters:
- Bought Product
- Did Not Buy Product
- Bought Product X times
- Average Price Paid

Behavior filters:
- Ordered last year but not this year
- Repeat purchase rate
- Single product buyers

Include logic controls:
- AND
- OR
- Nested conditions

Example Rule Block
IF
Customer Bought Product A
AND
Customer Did Not Buy Product B
AND
Last Order > 60 days

Preview Results Panel
Show a live preview of matching customers.

Table columns:
- Customer Name
- Email
- Revenue
- Orders
- Last Order Date
- Location

Segment Summary Panel
Display metrics such as:
- Total customers in segment
- Total revenue from segment
- Average order value

Segment Actions Panel
Include buttons for:
- Export CSV
- Push to ActiveCampaign
- Push to Omnisend
- Push to Drip

Use placeholder data variables such as:
{{segmentCustomerCount}}
{{segmentRevenue}}
{{segmentCustomers}}

Design Requirements
Use reusable UI components:
Filter_Row
Condition_Group
Segment_Preview_Table
Segment_Action_Buttons

Use Auto Layout and clear component naming for developer handoff.