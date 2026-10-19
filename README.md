# Bencho

A React + TypeScript workbench for the Bencho Icon bar. Tune its elastic indicator,
switch direction, compare glass and flat material, and use the generated JSX.

## Local development with hot reload

Use Node 24.15 or newer in the Node 24 LTS line (`nvm use` selects Node 24).

```sh
git clone https://github.com/fyona0701/test.git bencho
cd bencho
# Until the first-version PR is merged:
git switch feat/bencho-v1
npm ci
npm run dev
```

Open http://localhost:5173. Save changes to update the page through Vite's hot
module replacement, or refresh to load the latest source. Keep the terminal
running. In a remote workspace, forward port 5173 through your editor; its
localhost is separate from your computer. The server binds to all interfaces
for workspace previews.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload on port 5173 |
| `npm test` | Interaction and animation regression tests |
| `npm run test:watch` | Rerun tests when source changes |
| `npm run build` | Check TypeScript and build static files in `dist/` |
| `npm run preview` | Serve the built app locally on port 4173 |

## GitHub Pages

After merging the PR, `.github/workflows/pages.yml` tests, builds, and deploys
`dist/` on each push to `main`. It can also run manually from the Actions tab
once it is on `main`. Pull requests run checks without deploying production.

The connected environment could not access repository Pages settings. An owner
must select **GitHub Actions** under **Settings → Pages → Build and deployment → Source**:
https://github.com/fyona0701/test/settings/pages

After a successful deployment, the expected address is
https://fyona0701.github.io/test/. This does not indicate an existing live deployment.
Relative asset paths support GitHub Pages' `/test/` path. Pages serves static
builds; changes appear after deployment completes. Use the local server for hot reload.

The repository needs GitHub Actions enabled. Deployment uses the built-in token
with `pages: write` and `id-token: write`; no custom secrets or rendering service
are needed.

## Component integration

```tsx
import { IconBar } from './components/IconBar';
import './styles.css';

<div data-surface="glass">
  <IconBar axis="row" onSelect={(key) => console.log(key)} />
</div>
```

| Prop | Default | Meaning |
| --- | --- | --- |
| `axis` | `"row"` | `"row"` or `"column"` |
| `glyph` | `17` | Icon size in pixels |
| `dilate` | `100` | Indicator stretch, 0–100 |
| `bounce` | `50` | Landing overshoot, 0–100 |
| `speed` | `50` | Motion speed, 0–100 |
| `hug` | `6` | Padding in pixels |
| `corner` | `26` | Corner radius, clamped to 0–26 pixels |
| `ariaLabel` | `"Main"` | Accessible navigation label |
| `onSelect` | — | Called with `home`, `search`, `files`, `saved`, or `you` |

Selection is internal to each bar. The demo reports selection below the preview;
buttons are not application routes. Native buttons support Tab and Enter/Space.
Reduced-motion preferences disable animation.

All 19 Bencho tokens live on `.icon-bar` in `src/styles.css`. The empty repository
had no existing token system; the component inherits the application's UI font.
RGB tokens contain bare comma-separated channels for `rgba()`. App layout styles
live separately in `src/app.css`.

## Project layout

```text
src/App.tsx                  Interactive demo and generated JSX
src/app.css                  Responsive application layout
src/components/IconBar.tsx   Reusable component and motion helpers
src/styles.css               Scoped component styles and local tokens
src/**/*.test.tsx            Interaction regression tests
.github/workflows/           PR checks and Pages deployment
```

## Attribution

The Icon bar source was supplied by the user as MIT-licensed Bencho code:
https://bencho.dev/licence. All 39 original explanatory comments are preserved.
Icons are from `lucide-react`; dependencies retain their own licences.
This app needs no accounts, database, or API keys.
