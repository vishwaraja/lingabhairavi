// Non-list data from names.yaml (intro, quotes, chant closing). Read at build time.
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';

const real = resolve(process.cwd(), '../content/names.yaml');
const file = existsSync(real) ? real : resolve(process.cwd(), 'src/fixtures/names.yaml');
const data: any = parse(readFileSync(file, 'utf8')) ?? {};

export const STUTI_PAGE = 'https://isha.sadhguru.org/linga-bhairavi/in/en/sadhana/linga-bhairavi-stuti';
const quotes: { text: string; source: string }[] = data.quotes ?? [];
/** Sadhguru: the sound matters more than the meaning (verbatim, from names.yaml quotes). */
export const soundQuote =
  quotes.find((q) => /sound which is important/i.test(q.text)) ??
  { text: 'It is the sound which is important – the impact of the sound.', source: STUTI_PAGE };
export const quotesList = quotes;
export const chant = {
  closing: (data.chant?.closing ?? { roman: [], tamil: [], devanagari: [] }) as { roman: string[]; tamil: string[]; devanagari: string[] },
  practice: (data.chant?.practice ?? '') as string,
  groups: (data.chant?.groups ?? []) as [number, number][],
  lineTemplateTamil: (data.chant?.line_template_tamil ?? '') as string,
};
export const intro = data.intro ?? {};
