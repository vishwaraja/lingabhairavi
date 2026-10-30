// Content collections.
// names    <- ../content/names.yaml   (falls back to src/fixtures/names.yaml)
// calendar <- ../content/calendar.json (falls back to src/fixtures/calendar.json)
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { existsSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import { slugify } from './lib/slug';

// Paths for file() are relative to the project root (app/).
const NAMES = existsSync(new URL('../../content/names.yaml', import.meta.url)) ? '../content/names.yaml' : 'src/fixtures/names.yaml';
const CALENDAR = existsSync(new URL('../../content/calendar.json', import.meta.url)) ? '../content/calendar.json' : 'src/fixtures/calendar.json';

/**
 * Map the content/names.yaml shape (roman_official, simple, iast, tamil_meaning, ...)
 * onto the app's model. Display name = roman_official; URL slug = simple.
 */
const normalizeName = (e: any) => {
  const name = e.name ?? e.roman_official ?? e.simple;
  const both = (en: unknown, ta: unknown) => (ta ? { en, ta } : en);
  return {
    ...e,
    id: e.slug ?? slugify(e.simple ?? name),
    name,
    meaning: both(e.meaning, e.tamil_meaning),
    reflection: both(e.reflection, e.tamil_reflection),
  };
};

/** A text field may be a plain string (English) or { en, ta }. */
const localized = z.union([z.string(), z.object({ en: z.string().optional(), ta: z.string().optional() })]);
const source = z.union([z.string(), z.object({ title: z.string().optional(), url: z.string().optional() }).loose()]);

const names = defineCollection({
  loader: file(NAMES, {
    parser: (text) => {
      const data = parseYaml(text);
      const list: any[] = Array.isArray(data) ? data : (data?.names ?? []);
      return list.map(normalizeName);
    },
  }),
  schema: z.object({
    number: z.number().int(),
    name: z.string(),
    roman_official: z.string().optional(),
    simple: z.string().optional(),
    iast: z.string().optional(),
    slug: z.string().optional(),
    devanagari: z.string().optional(),
    tamil: z.string().optional(),
    chant: localized.optional(),
    meaning: localized.optional(),
    reflection: localized.optional(),
    sources: z.array(source).default([]),
    confidence_text: z.string().optional(),
    confidence_meaning: z.string().optional(),
    note: z.string().optional(),
  }),
});

const calendar = defineCollection({
  loader: file(CALENDAR, {
    parser: (text) => {
      const data = JSON.parse(text);
      const list: any[] = Array.isArray(data) ? data : (data?.events ?? []);
      return list.map((e, i) => ({
        ...e,
        id: `${e.date}-${e.type}-${i}`,
        title: e.title ?? { en: e.name_en, ta: e.name_ta },
      }));
    },
  }),
  schema: z.object({
    date: z.string(), // YYYY-MM-DD (IST)
    end: z.string().optional(),
    type: z.string(), // pournami | amavasya | navaratri | festival | anniversary
    title: localized.optional(),
    starts_ist: z.string().nullish(),
    ends_ist: z.string().nullish(),
    basis: z.string().optional(),
    notes: z.string().optional(),
    source: z.string().optional(),
  }),
});

// Long-form pages written in ../content/*.md (visit, offerings, yantra).
const pages = defineCollection({
  loader: glob({ base: existsSync(new URL('../../content/visit.md', import.meta.url)) ? '../content' : 'src/fixtures/pages', pattern: ['visit.md', 'offerings.md', 'yantra.md'] }),
  schema: z.object({
    title: z.string(),
    last_checked: z.coerce.string().optional(),
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { names, calendar, pages };
export const usingFixtures = { names: NAMES.startsWith('src/'), calendar: CALENDAR.startsWith('src/') };
