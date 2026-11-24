# Future Phase: Customer Portal & Internal Administration

> **Status: planned, not built.** The public website contains no login, dashboard, or customer data. This document describes how the codebase is prepared for the portal.

## How the current site is prepared

- **Route space reserved:** `/portal/*` (customers) and `/admin/*` (staff). `robots.ts` already disallows `/portal/`.
- **Data model starts in Airtable:** quote and contact submissions already create structured records (reference number, status, customer, product, destination). Those become the first rows of the project-tracking system.
- **Reusable UI:** the timeline in `components/sections/ProcessTimeline.tsx` maps directly onto order milestones.
- **Server-side boundary:** all writes go through `app/api/*` with validation in `lib/forms`. Portal APIs follow the same pattern.

## Recommended architecture (Phase 2)

| Concern | Recommendation |
|---|---|
| Auth | Auth.js (NextAuth) with email magic links, or Clerk. Separate roles: `customer`, `staff`, `admin`. |
| Data | **Start:** Airtable as the system of record (fast to set up, staff-friendly). **Scale:** Postgres (Neon / Supabase) with Prisma, synced from Airtable or migrated once volume grows. |
| Files | Vercel Blob or S3 with signed URLs for invoices, inspection reports, and shipping documents |
| Notifications | Resend email on milestone changes, triggered by Airtable automations or webhooks |
| Access control | Every query is scoped to the signed-in customer's company ID, enforced on the server |

## Customer dashboard (`/portal`)

- Active orders with status (Quoted → PO Confirmed → Sampling → In Production → Inspected → Shipped → Customs → Delivered)
- Production tracking and inspection results
- Invoices and payment status
- Shipping updates (vessel/flight, ETD/ETA)
- Document downloads (PI, PO, inspection report, commercial invoice, packing list, bill of lading)
- Delivery confirmation

## Internal administration (`/admin`)

- Customer management (CRM)
- Supplier database (capabilities, audits, contacts, performance)
- Project tracking and milestones
- Quotations → purchase orders
- Quality inspections
- Shipping milestones
- Profitability reports (landed cost vs. sell price per project)

## Suggested Airtable base (Phase 2 starting point)

`Customers` · `Contacts` · `Quote Requests` · `Projects` · `Suppliers` · `Purchase Orders` · `Inspections` · `Shipments` · `Documents` · `Invoices`, linked by record relationships, with a `Status` single-select on Projects that drives the customer-facing timeline.
