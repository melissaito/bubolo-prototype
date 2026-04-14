# Bubolo Medical

Static marketing site for Bubolo Medical — weight loss that’s built for you.

**Live site:** [GitHub Pages](https://melissaito.github.io/bubolo-prototype/)

### Local preview

Serve this folder with any static file server (so asset paths resolve correctly), for example:

```bash
npx serve .
```

Open the URL shown in the terminal. The site is plain `index.html` + `styles.css` + assets — no build step.

### Deploy to GitHub Pages

The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) uploads the repository root as the Pages artifact.

1. **Settings → Pages → Build and deployment:** set **Source** to **GitHub Actions**.
2. Push to `main`; when the workflow finishes, the site updates.

**Large pushes:** if `git push` fails with `http.postBuffer`, run  
`git config http.postBuffer 524288000` in this repo and push again.
