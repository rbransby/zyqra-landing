# Zyqra Landing Page

A production-ready Phase-1 "validate interest" landing page for Zyqra - booking, payments, and reminders for domestic service sole traders (cleaners, gardeners, dog walkers, handymen).

## Features

- 🎯 A/B testing for headlines (50/50 split with cookie persistence)
- 📊 Full analytics integration (GA4, Meta Pixel, Plausible)
- 💾 Multiple lead storage options (Supabase, Airtable, Google Sheets)
- 📱 Mobile-first responsive design
- ♿ WCAG-friendly accessibility
- 🚀 Optimized for Lighthouse scores ≥ 95
- 🔒 Privacy-first with GDPR considerations
- 📧 Optional email confirmation via Resend

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Analytics**: GA4, Meta Pixel, Plausible
- **Lead Storage**: Supabase (default), Airtable, or Google Sheets
- **Email**: Resend (optional)
- **Deployment**: Optimized for Vercel

## Quick Start

### 1. Install Dependencies

```bash
# Clone the repository
git clone [your-repo-url]
cd zyqra-landing

# Install dependencies
pnpm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (all optional)
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=zyqra.services

# Lead Storage - Choose one adapter
FEATURE_ADAPTER=SUPABASE  # or AIRTABLE or SHEETS

# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (optional)
RESEND_API_KEY=re_xxxxx
```

### 3. Database Setup

#### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run this SQL in the SQL editor:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  biz_type TEXT NOT NULL,
  notes TEXT,
  source TEXT DEFAULT 'website',
  variant TEXT,
  utm JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
```

3. Get your credentials:
   - `SUPABASE_URL`: Found in Settings > API
   - `SUPABASE_SERVICE_ROLE_KEY`: Found in Settings > API > Service Role Key

#### Alternative: Airtable Setup

1. Create a new base in Airtable
2. Create a table called "Leads" with these fields:
   - Email (Email field)
   - Role (Single select: cleaner, gardener, handyman, dog_walker, other)
   - Business Type (Single select: sole_trader, micro_team)
   - Notes (Long text)
   - Source (Single line text)
   - Variant (Single line text)
   - UTM Source (Single line text)
   - UTM Medium (Single line text)
   - UTM Campaign (Single line text)
   - UTM Term (Single line text)
   - UTM Content (Single line text)
   - Referral Code (Single line text)
   - Created At (Created time)

3. Get your credentials:
   - `AIRTABLE_API_KEY`: From [airtable.com/account](https://airtable.com/account)
   - `AIRTABLE_BASE_ID`: From your base URL (airtable.com/appXXXXXX/...)

#### Alternative: Google Sheets Setup

1. Create a Google Cloud project and enable Sheets API
2. Create a service account and download the JSON key
3. Create a spreadsheet with headers in row 1:
   - Timestamp | Email | Role | Business Type | Notes | Source | Variant | UTM Source | UTM Medium | UTM Campaign | UTM Term | UTM Content | Referral Code

4. Share the spreadsheet with your service account email
5. Set environment variables:
   - `GOOGLE_SHEETS_ID`: From your spreadsheet URL
   - `GOOGLE_SERVICE_ACCOUNT_JSON`: The entire JSON key as a string

### 4. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Analytics Setup

### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

### Meta Pixel

1. Create a pixel at [business.facebook.com](https://business.facebook.com)
2. Get your Pixel ID
3. Add to `.env.local`: `NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id`

### Plausible

1. Add your site to [plausible.io](https://plausible.io)
2. Add to `.env.local`: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=zyqra.services`

## A/B Testing

The landing page automatically splits visitors 50/50 between two headline variants:

- **Variant 1**: "Bookings, reminders, and payments—done."
- **Variant 2**: "Stop no-shows. Get paid on time."

The variant is:
- Stored in a cookie (`zr_variant`) for 90 days
- Tracked with all lead submissions
- Visible in your lead storage

## Adding Assets

### Mockup Images

Add your mockup images to `/public/mockups/`:
- `add-customers.webp` - Customer management view (800x600px)
- `schedule-jobs.webp` - Job scheduling and calendar view (800x600px)
- `get-paid-faster.webp` - Invoicing and payment feature (800x600px)

### OG Image

Add your Open Graph image:
- Path: `/public/og.jpg`
- Size: 1200x630px
- Format: JPEG (optimized for web)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Testing

Run the test suite:

```bash
pnpm test
```

Run type checking:

```bash
pnpm typecheck
```

Run linting:

```bash
pnpm lint
```

## Project Structure

```
zyqra-landing/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages group
│   │   └── page.tsx       # Landing page
│   ├── api/               # API routes
│   │   ├── health/        # Health check endpoint
│   │   └── lead/          # Lead capture endpoint
│   ├── thanks/            # Thank you page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── LeadForm.tsx      # Main signup form
│   ├── FeatureCard.tsx   # Feature showcase cards
│   ├── FAQ.tsx           # Frequently asked questions
│   └── Analytics.tsx     # Analytics scripts
├── lib/                   # Utilities and libraries
│   ├── analytics/        # Analytics integrations
│   ├── leads/            # Lead storage adapters
│   ├── validators.ts     # Zod schemas
│   ├── variant.ts        # A/B testing logic
│   └── utm.ts            # UTM parameter handling
├── public/               # Static assets
│   └── mockups/          # Product screenshots
└── tests/                # Test files
```

## Monitoring

### Health Check

Monitor uptime with: `GET /api/health`

Response includes:
- Service status
- Configured integrations
- Environment info

### Lead Tracking

Track conversions through:
1. Analytics events (GA4/Pixel/Plausible)
2. Lead storage (check your configured adapter)
3. Server logs (for errors)

## Security Features

- Rate limiting (5 requests/minute per IP)
- Honeypot field for bot detection
- Time-based form validation
- CSRF protection via SameSite cookies
- Security headers via Vercel config

## Customization

### Change Company Name

Search and replace "Zyqra" throughout the codebase.

### Update Target Audience

Edit the role options in:
- `/lib/validators.ts`
- `/components/LeadForm.tsx`

### Modify Pricing

Update pricing in:
- `/components/PricingTeaser.tsx`
- `/app/(marketing)/page.tsx`

### Add New Lead Storage

1. Create adapter in `/lib/leads/your-adapter.ts`
2. Implement the `LeadAdapter` interface
3. Add to `/lib/leads/index.ts`

## Troubleshooting

### Leads not saving

1. Check environment variables are set correctly
2. Verify your storage adapter credentials
3. Check browser console for errors
4. Review server logs

### Analytics not tracking

1. Ensure analytics IDs are in `.env.local`
2. Check for ad blockers
3. Verify scripts are loading in browser

### A/B test not working

1. Clear cookies and try again
2. Check cookie is being set in browser
3. Verify variant is included in lead data

## Support

For issues or questions:
1. Check the [troubleshooting](#troubleshooting) section
2. Review server logs and browser console
3. Ensure all environment variables are set

## License

This project is provided as-is for the Zyqra landing page.

---

Built with ❤️ for domestic service professionals

