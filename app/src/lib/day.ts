/** Day number in India Standard Time (UTC+05:30, no DST). Same for everyone in India on a given date. */
export const istDayNumber = (now: Date = new Date()) => Math.floor((now.getTime() + 5.5 * 3600_000) / 86_400_000);
/** Deterministic "one name a day" index for a list of length n. */
export const nameIndexForDay = (n: number, now: Date = new Date()) => ((istDayNumber(now) % n) + n) % n;
/** YYYY-MM-DD in IST. */
export const istDate = (now: Date = new Date()) => new Date(now.getTime() + 5.5 * 3600_000).toISOString().slice(0, 10);
