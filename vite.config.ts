import { defineConfig } from 'vite';

export default defineConfig({
  // Relative assets work both at localhost and GitHub Pages' /test/ path.
  base: './',
  server: { host: '0.0.0.0', port: 5173, strictPort: true },
});
