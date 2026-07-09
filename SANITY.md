# ContentMesh — Sanity CMS Setup

The site pulls all editable content from Sanity. If Sanity is unreachable or a document is missing, each section falls back to sensible hard-coded defaults so the site is never blank.

## Environment variables

Both variables are public (Sanity project ID and dataset are safe in the client).

```
VITE_SANITY_PROJECT_ID=ru6ynu80
VITE_SANITY_DATASET=production
```

### Local development
Create a `.env.local` in the project root with the two lines above, then `bun install && bun run dev`.

### Vercel
Project → Settings → Environment Variables → add both for **Production**, **Preview**, and **Development**. Redeploy.

### Cloudflare / other hosts
Set the same two variables in your host's environment configuration.

## Sanity Studio

Studio is embedded at **`/studio`**. Visit it, log in with your Sanity account, and start editing the following content types:

- **Site Settings** (singleton) — tagline, socials, logo
- **Homepage** (singleton) — hero, stats, "why us", CTA copy
- **Contact Information** (singleton) — email, phone, address, hours, map embed
- **Services** — service cards on `/` and `/services`
- **Portfolio Items** — projects on `/` and `/portfolio`
- **Testimonials** — testimonial slider
- **Team Members** — team grid on `/about`
- **FAQs** — FAQ accordion
- **Blog Posts** — blog list on `/blog` and detail pages `/blog/<slug>`

## CORS origins

The following origins are already allowlisted:

- `http://localhost:8080`
- `https://*.lovable.app`

Add your production domain in **sanity.io/manage → API → CORS origins** once deployed.
