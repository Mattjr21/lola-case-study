# Deploy — La Bodega case study (Vercel + Framer)

## 1. One-time setup

```powershell
cd "c:\My Web Sites\lola-case-study"
npm install
copy .env.example .env.local
```

Edit `.env.local`:

| Variable | Example |
|----------|---------|
| `VITE_SITE_URL` | `https://la-bodega-lola.vercel.app` |
| `VITE_PORTFOLIO_LINKEDIN` | `https://www.linkedin.com/in/your-handle` |
| `VITE_PORTFOLIO_EMAIL` | `you@email.com` |
| `VITE_PORTFOLIO_BACK_URL` | Your Framer portfolio home URL |

Optional — regenerate Hear Lola audio clips:

```powershell
npm run audio:generate
```

## 2. Build locally

```powershell
npm run build
npm run preview
```

Open the preview URL and check `#flows`, `#craft`, and footer links.

## 3. Deploy to Vercel

**Option A — CLI** (from this folder):

```powershell
npx vercel
npx vercel --prod
```

**Option B — Dashboard**

1. [vercel.com/new](https://vercel.com/new) → Import or drag this project folder  
2. Root directory: repository root (this folder is its own project)  
3. Add the same `VITE_*` env vars  
4. Deploy  

After first deploy, set `VITE_SITE_URL` to the production URL and redeploy so Open Graph previews resolve correctly.

## 4. Embed in Framer

**Full-page case study (recommended)**

Add a page → **Embed** or custom code:

```html
<iframe
  src="https://YOUR-VERCEL-URL.vercel.app"
  title="La Bodega — Lola case study"
  style="width:100%;min-height:100vh;border:0;display:block"
  loading="lazy"
></iframe>
```

**Link from project card**

Point the card CTA to `https://YOUR-VERCEL-URL.vercel.app` (opens in new tab).

## 5. Link preview checklist

- [ ] `VITE_SITE_URL` matches production URL  
- [ ] `/og-image.svg` loads at `https://YOUR-URL/og-image.svg`  
- [ ] Paste URL in [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or Slack to verify OG tags  
