# Run doc: Nur Marisa Catering

Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4.

## 1. Reproduce the uncommitted artifacts

A fresh checkout of this worktree needs **no secret values and no `.env` file**;
the project reads no environment variables at all.

```bash
# Node 25 / npm 11 are what this worktree was developed against.
npm install          # uses package-lock.json (npm, not pnpm/yarn)
```

That is the only step. `node_modules/` is the sole artifact that must be rebuilt.

Notes on other files that are *content*, not build artifacts:

- `assets-src/Price list Nurmarisa Catering.pdf`: the original 34 MB price list (source of truth,
  kept OUTSIDE `public` so it is never deployed to visitors).
- `public/Price list Nurmarisa Catering.pdf`: the compressed download copy served to visitors
  (±3.8 MB, rendered page images rebuilt as an A4 PDF). Regenerate after the original changes:
  ```bash
  node scripts/compress-price-list-pdf.mjs   # needs pdf-to-img + pdf-lib (devDependencies)
  ```
- `public/images/price-list/page-01..11.jpg`: **11 brochure pages already generated and present**
  (rendered from the PDF, 3.4 MB total) plus `manifest.json`. Regenerate only if the PDF changes:
  ```bash
  node scripts/render-price-list-pages.mjs "assets-src/Price list Nurmarisa Catering.pdf" public/images/price-list 1300 78
  ```
  Uses the `pdf-to-img` devDependency (pdfjs + prebuilt canvas, no compiler needed), so
  `npm install` must have run first. Copy the new width/height from `manifest.json` into
  `priceListPages` in `data/price-list.ts`.
- `public/images/menu/*.jpg`: **33 photos already generated and present.** They are only
  regenerated if the PDF or `PHOTO_BY_ITEM` mapping changes. Order matters:
  ```bash
  node scripts/extract-price-list-images.mjs "assets-src/Price list Nurmarisa Catering.pdf"
  node scripts/build-menu-images.mjs
  ```
  The first script writes 57 raw images + `manifest.json` to a temp dir; the second maps them
  onto menu ids, resizes to 1100px JPEG q76, and writes `public/images/menu/`.
- There are **no** committed build outputs. `.next/` is disposable.

If `.next/` ever holds a mixture of `next build` output and dev state, delete it
(`rm -rf .next`) before starting the dev server; a stale mix makes Turbopack serve
`404` for routes that exist.

## 2. Run the server

Port **3000** is the project default and is used for preview. It is passed explicitly so
Turbopack never falls back to a random port:

```bash
npm run dev -- --port 3000
```

Start it detached on Windows (PowerShell, PID printed for `register_preview`):

```powershell
powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev','--','--port','3000' -RedirectStandardOutput '<project>\.freebuff\preview-<id>.log' -RedirectStandardError '<project>\.freebuff\preview-<id>.log.err' -WindowStyle Hidden -PassThru).Id"
```

Use `npm.cmd` (not `npm`), because `Start-Process` does not resolve shell shims. stdout and stderr
must go to separate files. The server listens on `http://localhost:3000`; the PID that owns
the listener is the `node.exe` one (the `cmd.exe` wrapper PID differs).

Routes: `/` (home) and `/menu` (brochure price list only; the menu card catalog was removed).
The map is a Google Maps `output=embed` iframe (no API key, no extra dependency); the pin is the
exact coordinate in `data/site.ts` (`mapPin`), not a text address query.
