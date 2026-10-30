// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';
import remarkReviewTags from './src/lib/remark-review-tags.mjs';

/** @type {[string, ...string[]]} */
const TAMIL_RANGE = ['U+0964-0965', 'U+0B82-0BFA', 'U+200C-200D', 'U+20B9', 'U+25CC'];
/** @param {number} w */
const tamilFile = (w) => `./node_modules/@fontsource/noto-serif-tamil/files/noto-serif-tamil-tamil-${w}-normal.woff2`;

export default defineConfig({
  site: 'https://lingabhairavi.co.in',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  markdown: { remarkPlugins: [remarkReviewTags] },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },

  i18n: {
    locales: ['en', 'ta'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  // Tamil web font: self-hosted, Tamil-only subset (~14 KB/weight), font-display: swap,
  // unicode-range so English pages never download it. Latin text uses the system stack.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Noto Serif Tamil',
      cssVariable: '--font-tamil',
      fallbacks: ['serif'],
      display: 'swap',
      options: {
        variants: [
          { weight: 400, style: 'normal', src: [tamilFile(400)], unicodeRange: TAMIL_RANGE },
          { weight: 600, style: 'normal', src: [tamilFile(600)], unicodeRange: TAMIL_RANGE },
        ],
      },
    },
  ],

  image: {
    // astro:assets -> AVIF + WebP via sharp (see components/Photo.astro)
    responsiveStyles: true,
  },

  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-IN', ta: 'ta-IN' } },
      filter: (page) => !page.includes('/og/'),
    }),
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: false, // registered in Base.astro via virtual:pwa-register
      manifest: {
        id: '/',
        name: 'Linga Bhairavi',
        short_name: 'Bhairavi',
        description: 'The 33 names of Linga Bhairavi, a lamp, a mala and a quiet place to sit. Works offline.',
        lang: 'en',
        start_url: '/en/?source=pwa',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0e0a09',
        theme_color: '#0e0a09',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache every page (both languages: all names, sit, calendar) + CSS/JS/fonts/icons.
        globPatterns: ['**/*.{html,css,js,woff2,svg,png,webmanifest}'],
        globIgnores: ['og/**', '**/node_modules/**'],
        navigateFallback: '/en/',
        navigateFallbackDenylist: [/^\/og\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/_astro/') && /\.(avif|webp|jpe?g|png)$/.test(url.pathname),
            handler: 'CacheFirst',
            options: { cacheName: 'images', expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
      experimental: { directoryAndTrailingSlashHandler: true },
    }),
  ],
});
