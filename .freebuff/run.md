# Run doc — nur-marisa-catering

Next.js 16 (App Router, Turbopack) app. No environment files are needed: the repo
has no `.env*` files, so there is nothing to copy from the main checkout when
starting from a fresh worktree.

## 1. Reproduce the artifacts

Nothing to generate — there are no build artifacts or env files required for
dev mode. Only step:

- Install dependencies with npm (the repo has `package-lock.json`):
  ```
  npm install
  ```

## 2. Run the dev server

- Prefer the project default port 3000. IMPORTANT: if the shell has `PORT`
  exported (even `PORT=0`), Next.js will ignore `-p` and bind a random port —
  clear it or override it:
  ```
  PORT=3000 npm run dev -- -p 3000
  ```
- Windows detached recipe (log and error log must be DIFFERENT files):
  ```
  powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev','--','-p','3000' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
  ```
- Confirm readiness: the log should show `✓ Ready`, and
  `curl http://localhost:3000` should answer 200.
- Routes: `/` (landing), `/menu` (price list / brochure), `/isi-data`.
