// Linga Bhairavi, Coimbatore: daily timings as published by Isha (checked 30 Oct 2026).
// Source: https://isha.sadhguru.org/linga-bhairavi/in/en/visit-devi/linga-bhairavi-coimbatore
// Times are minutes after midnight IST.
export const TIMINGS_CHECKED = '2026-10-30';
export const TIMINGS_SOURCE = 'https://isha.sadhguru.org/linga-bhairavi/in/en/visit-devi/linga-bhairavi-coimbatore';
export const OPEN_WINDOWS: [number, number][] = [
  [6 * 60 + 30, 13 * 60 + 20], // 6:30 AM – 1:20 PM
  [16 * 60 + 20, 20 * 60 + 20], // 4:20 PM – 8:20 PM (until 12:30 AM on Pournami)
];
export const POURNAMI_CLOSE = 24 * 60 + 30; // 12:30 AM, next day
export const ABHISHEKAM = [7 * 60 + 40, 12 * 60 + 40, 19 * 60 + 40];

export type Status =
  | { open: true; closesAt: number }
  | { open: false; opensAt: number; tomorrow: boolean };

/** minutes = minutes since IST midnight; pournamiToday extends the evening window. */
export function statusAt(minutes: number, pournamiToday = false): Status {
  const windows = OPEN_WINDOWS.map(([a, b], i) => [a, i === 1 && pournamiToday ? POURNAMI_CLOSE : b] as const);
  for (const [a, b] of windows) if (minutes >= a && minutes < b) return { open: true, closesAt: b };
  const next = windows.find(([a]) => minutes < a);
  return next ? { open: false, opensAt: next[0], tomorrow: false } : { open: false, opensAt: windows[0][0], tomorrow: true };
}
export function nextAbhishekam(minutes: number) {
  const n = ABHISHEKAM.find((m) => m > minutes);
  return n === undefined ? { at: ABHISHEKAM[0], tomorrow: true } : { at: n, tomorrow: false };
}
/** 760 -> "12:40 PM" */
export function fmtTime(m: number, lang: 'en' | 'ta' = 'en') {
  const h24 = Math.floor(m / 60) % 24, mm = String(m % 60).padStart(2, '0');
  const h = ((h24 + 11) % 12) + 1;
  if (lang === 'ta') return `${h24 < 4 ? 'நள்ளிரவு' : h24 < 12 ? 'காலை' : h24 < 16 ? 'மதியம்' : h24 < 19 ? 'மாலை' : 'இரவு'} ${h}:${mm}`;
  return `${h}:${mm} ${h24 < 12 ? 'AM' : 'PM'}`;
}
/** Minutes since midnight in IST. */
export const istMinutes = (now = new Date()) => {
  const d = new Date(now.getTime() + 5.5 * 3600_000);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
};
