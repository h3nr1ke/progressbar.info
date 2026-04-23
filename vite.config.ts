// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Não gera bundle Worker/Wrangler: deploy é somente a pasta do cliente (HTML/JS/CSS estáticos).
  cloudflare: false,
  vite: {
    plugins: [],
  },
  tanstackStart: {
    // Pré-render de `/` → `dist/client/index.html` (sem depender de SPA shell / rotas no servidor).
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    pages: [{ path: "/" }],
  },
});
