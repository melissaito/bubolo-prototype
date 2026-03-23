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

Pushes to `main` run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml): `npm ci` → `npm run build` → upload `dist/` to GitHub Pages.

1. Repo **Settings → Pages**: set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. Push `main`; the **Actions** tab shows the run. The site stays at  
   **https://melissaito.github.io/bubolo-prototype/** (project site URL).
