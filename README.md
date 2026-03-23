# Bubulo Medical

Static marketing site for Bubulo Medical — weight loss that’s built for you.

**Live site:** [GitHub Pages](https://melissaito.github.io/bubolo-prototype/)

### Local preview (static only)

Open `index.html` with a static server in this folder — **note:** the **Proven success** marquee block is a React island and needs Vite.

### Vite + React (marquee section)

The `WhyBubuloMarquee` component (`src/components/WhyBubuloMarquee.jsx`) mounts into `#why-bubulo-marquee-root` after `#approach`.

```bash
npm install
npm run dev
```

Production build (outputs `dist/` for GitHub Pages or any static host):

```bash
npm run build
npm run preview   # optional: test dist locally
```

Deploy the **contents of `dist/`**, not the repo root `index.html` alone.

### Deploy to GitHub Pages

This repo is a **Vite** build: GitHub Pages must serve **`dist/`**, not the root `index.html` alone.

**Option A — GitHub Actions (recommended)**  
Add [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) to the repo (it exists locally under `.github/`). It runs `npm ci` → `npm run build` → publishes `dist/`.

1. **Settings → Pages → Build and deployment:** set **Source** to **GitHub Actions**.
2. From your machine (Cursor/GitHub OAuth often blocks workflow files without the `workflow` scope):

   ```bash
   git add .github && git commit -m "ci: GitHub Pages deploy" && git push origin main
   ```

3. Check the **Actions** tab; when green, the site is at  
   **https://melissaito.github.io/bubolo-prototype/**

**Option B — Manual**  
Run `npm run build` locally and upload or push the **contents of `dist/`** to whatever branch/source your Pages site uses.

**Large pushes:** if `git push` fails with `http.postBuffer`, run  
`git config http.postBuffer 524288000` in this repo and push again.
