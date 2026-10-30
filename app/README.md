# lingabhairavi.co.in app (Astro, static)

    npm ci && npm run dev      # http://localhost:4321/en/
    npm run build              # -> dist/ (static, ~80 pages + 34 OG cards + sw.js)

- Content: `../content/names.yaml` (falls back to `src/fixtures/names.yaml`) and
  `../content/calendar.json` (falls back to `src/fixtures/calendar.json`). Mapping in `src/content.config.ts`.
- Design drop-in: replace `src/styles/tokens.css` (all colours/type/space). UI strings: `src/i18n/ui.ts`.
- Routes: `/` (language choice) · `/{en,ta}/` · `/{en,ta}/names/` · `/{en,ta}/names/<slug>/` · `/{en,ta}/sit/` · `/{en,ta}/calendar/` · `/og/<slug>.png`.
- Placeholders: `scripts/make-placeholders.mjs` (icons, hero). OG fonts in `src/og-fonts/` (OFL).
- Vercel test: project `lingabhairavi-test` (https://lingabhairavi-test.vercel.app). Deploy: `vercel pull --yes --environment=production && vercel build --prod && vercel deploy --prebuilt --prod` (prebuilt, so ../content is included).
  (keep "include files outside root" on so `../content` is available). Production is untouched until then.
- `@vite-pwa/astro@1.2.0` declares peer `astro<=5`; a package.json `overrides` entry allows Astro 7 (works, verified offline).
