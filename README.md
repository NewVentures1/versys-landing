# Versys Technologies — Coming Soon Page

Static landing page for versysinc.com. One HTML file, one SVG logo, zero dependencies.

Deployed to Vercel from this repo. Pushes to `main` auto-deploy.

## Local preview

```bash
cd "path/to/versys-landing"
python3 -m http.server 8080
```

Open http://localhost:8080 in a browser.

## Files

- `index.html` — the landing page (styles inline, Inter font from Google Fonts)
- `logo.svg` — wordmark in white with green accent
- `.gitignore` — ignores `.DS_Store`, `.vercel`, and local dev noise

## TODOs before launch

- Wire the waitlist form to a real endpoint (Formspree, Supabase table, or custom API). Currently it shows a client-side success message but doesn't save emails.
- Add analytics (Plausible / Fathom / Google Analytics) if desired.
- Add a proper social share image (og:image) sized 1200×630 once we have design for it.
