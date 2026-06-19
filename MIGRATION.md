# Reviews backend: Supabase → Google Sheets

The reviews/testimonials feature now stores data in a **Google Sheet**, accessed
through a **Google Apps Script Web App**. The site stays on **Vercel**. Supabase
(and the earlier Cloudflare D1 attempts) are fully removed.

No Google API keys, service accounts, or OAuth are needed in the app — just a
Web App URL and a shared token.

---

## Architecture

```
Browser → Vercel (Next.js API routes) → Apps Script Web App → Google Sheet
               lib/db.ts                   Code.gs (doPost)      (rows)
           token in JSON body
```

- `lib/db.ts` POSTs `{ action, token, ...payload }` to the Web App.
- `Code.gs` checks the token, reads/writes the sheet, returns JSON.
- The same typed functions are kept, so the API routes and UI are unchanged.

---

## Workflow preserved (visibility-based)

1. Visitor submits at `/review` → new row with `visible = TRUE` (public immediately).
2. `/reviewmanagement` (admin, `password` header) lists all rows and toggles `visible`.
3. Home page (`GET /api/reviews`) shows only `visible = TRUE` rows.

---

## Files

### Added
| File | Purpose |
|------|---------|
| `google-apps-script/Code.gs` | The Apps Script Web App: token-gated JSON API over the sheet (`list`, `create`, `setVisibility`, `delete`). |
| `lib/db.ts` | Data layer; calls the Web App. Functions unchanged: `getReviews`, `getAllReviews`, `createReview`, `setVisibility`, `deleteReview`. |
| `tsconfig.json`, `.env.example`, `MIGRATION.md` | Tooling/config/docs. |

### Modified
| File | Change |
|------|--------|
| `pages/api/reviews.js` | Uses `lib/db` (unchanged shapes: array on GET, object on POST). |
| `pages/api/admin/reviews.js` | Uses `lib/db`; same `password`-header auth, GET/PATCH. |
| `package.json` | Removed Supabase/Cloudflare/libsql deps & scripts. |
| `.env.local` | Now `SHEET_WEBAPP_URL`, `SHEET_WEBAPP_TOKEN`, `ADMIN_PASSWORD`. |

### Removed
`lib/supabase.js`, the `supabase-*.sql` files, the Cloudflare `worker/`,
`wrangler.jsonc`, and `migrations/`.

### Untouched
`pages/review.js`, `pages/reviewmanagement.js`, `pages/index.js`,
`components/*`, all styling.

---

## Sheet columns (tab 1, row 1 = headers, A–H)

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| id | project_name | client_name | rating | review_text | project_id | visible | created_at |

---

## Environment variables

| Variable | Where | Description |
|----------|-------|-------------|
| `SHEET_WEBAPP_URL` | Vercel (server) | Apps Script Web App URL (ends `/exec`). |
| `SHEET_WEBAPP_TOKEN` | Vercel (server) **and** `Code.gs` `TOKEN` | Shared secret. |
| `ADMIN_PASSWORD` | Vercel (server) | Admin panel `password` header check. |

```dotenv
SHEET_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
SHEET_WEBAPP_TOKEN=your_long_random_shared_token
ADMIN_PASSWORD=Loq@2202
```

---

## Step-by-step: connect the Google Sheet

1. **Create the Sheet**: go to https://sheets.new — name it e.g. "Portfolio Reviews".
2. **Open the script editor**: in the Sheet, **Extensions → Apps Script**.
3. **Paste the code**: delete the default `Code.gs` contents, paste everything from
   `google-apps-script/Code.gs` in this repo. Save (💾).
4. **Set the token**: generate one locally —
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   In `Code.gs` set `var TOKEN = '<that value>';`. Save.
5. **Create headers**: in the editor's function dropdown pick **`setup`**, click
   **Run**. Approve the Google authorization prompt (choose your account →
   Advanced → "Go to … (unsafe)" → Allow — this is your own script). Row 1 of the
   sheet now has the headers.
6. **Deploy as Web App**: **Deploy → New deployment → ⚙ → Web app**.
   - Description: anything
   - **Execute as: Me**
   - **Who has access: Anyone**
   - Click **Deploy**, approve again, then **copy the Web app URL** (ends `/exec`).
7. **Fill `.env.local`** (already created):
   - `SHEET_WEBAPP_URL` = the `/exec` URL
   - `SHEET_WEBAPP_TOKEN` = the same token from step 4
   - `ADMIN_PASSWORD` = your admin password
8. **Run locally**: `npm run dev` → submit a review at `/review`, check it appears
   as a row in the sheet and on the home page; toggle it at `/reviewmanagement`.
9. **Vercel**: in **Settings → Environment Variables** add `SHEET_WEBAPP_URL`,
   `SHEET_WEBAPP_TOKEN`, `ADMIN_PASSWORD`, then redeploy.

> Re-deploying the script later: **Deploy → Manage deployments → edit (✏) →
> Version: New version → Deploy**, so the `/exec` URL stays the same.

---

## Quick test of the Web App (after deploy)

```bash
# Browser GET should say it's running:
#   <SHEET_WEBAPP_URL>   →   {"success":true,"data":"reviews web app is running"}

# List (PowerShell / curl):
curl -L -X POST "$SHEET_WEBAPP_URL" -H "Content-Type: application/json" \
  -d '{"action":"list","token":"YOUR_TOKEN","onlyVisible":false}'
```

---

## Verified locally
- `npm run build` — all routes compile, TypeScript valid, both `/api/*` routes
  are serverless functions. ✅
- No `supabase`, `cloudflare`, `wrangler`, or `libsql` references remain. ✅

## Security note
- `.env.local` is git-ignored. Keep `SHEET_WEBAPP_TOKEN` long/random; to rotate,
  change `TOKEN` in `Code.gs` (redeploy) and the Vercel var together.
- The admin password `Loq@2202` remains hard-coded in `pages/reviewmanagement.js`
  and as a fallback in `pages/api/admin/reviews.js` (pre-existing, preserved).
