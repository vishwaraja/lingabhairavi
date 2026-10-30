// Per-name Open Graph share cards (1200x630 PNG), generated at build time.
// CanvasKit (Skia + HarfBuzz shaping) renders Tamil and Devanagari correctly; fonts are
// local OFL TTFs in src/og-fonts so the build never hits the network.
import { OGImageRoute } from 'astro-og-canvas';
import { getNames } from '../../lib/names';

const names = await getNames();
type Page = { title: string; description: string };
const pages: Record<string, Page> = {
  default: { title: 'Linga Bhairavi', description: 'லிங்க பைரவி' },
  ...Object.fromEntries(
    names.map((n) => [
      n.id,
      { title: n.data.name, description: [n.data.tamil, n.data.devanagari].filter(Boolean).join('\n') },
    ]),
  ),
};

const F = './src/og-fonts/';
export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page: Page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[20, 16, 14], [42, 30, 22]],
    border: { color: [226, 184, 107], width: 12, side: 'block-end' },
    padding: 80,
    fonts: [
      `${F}NotoSerif-SemiBold.ttf`,
      `${F}NotoSerif-Regular.ttf`,
      `${F}NotoSerifTamil-SemiBold.ttf`,
      `${F}NotoSerifTamil-Regular.ttf`,
      `${F}NotoSerifDevanagari-Regular.ttf`,
    ],
    font: {
      title: { families: ['Noto Serif'], weight: 'SemiBold', size: 76, color: [242, 234, 217] },
      description: {
        families: ['Noto Serif Tamil', 'Noto Serif Devanagari', 'Noto Serif'],
        weight: 'SemiBold',
        size: 60,
        lineHeight: 1.5,
        color: [226, 184, 107],
      },
    },
  }),
});
