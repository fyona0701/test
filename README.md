# Bencho

React + TypeScript + Vite project with the Bencho IconBar.

```sh
npm install
npm run dev
npm run build
```

Import `IconBar` from `src/components/IconBar.tsx` and load `src/styles.css`.
Props: `axis` (`row` or `column`), `glyph`, `dilate`, `bounce`, `speed`, `hug`, `corner`.
The supplied navigation changes local selection; connect it to your app routing when routes exist.

The original source comments are preserved. Shared-kit CSS is scoped to `.icon-bar`.
This empty repository had no existing design tokens: all 19 Bencho tokens are
component-local defaults; the UI font inherits from the application.
The demo uses a `data-surface="glass"` ancestor to enable glass rims and shadows.

Source: Bencho Icon bar, provided by the user under MIT, https://bencho.dev/licence.
