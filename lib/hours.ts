export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];

export interface OpeningHours {
  day: Day;
  /** Inclusive local HH:MM. Omit closed days from the list. */
  opens: string;
  /** Exclusive local HH:MM. Same-day intervals only. */
  closes: string;
  note?: string;
}

export interface Closures {
  from: string;
  through: string;
  dates: readonly string[];
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function validateHours(hours: readonly OpeningHours[]): void {
  const seen = new Set<Day>();
  for (const { day, opens, closes, note } of hours) {
    if (!DAYS.includes(day)) throw new Error(`hours[${day}].day: unknown weekday`);
    if (seen.has(day)) throw new Error(`hours[${day}].day: duplicate weekday`);
    seen.add(day);
    if (typeof opens !== 'string' || typeof closes !== 'string' || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours[${day}]: needs HH:MM opening before closing; overnight service is unsupported`);
    }
    if (note !== undefined && (typeof note !== 'string' || !note.trim())) throw new Error(`hours[${day}].note: expected non-empty text`);
  }
}

export function displayTime(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'am' : 'pm'}`;
}

export const neutralHours = 'Workshop hours';

/** Advance local calendar dates in UTC after extracting the workshop's local time. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date(), closures?: Closures): string {
  if (!timeZone) return neutralHours;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-AU', {
      timeZone, weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
    }).formatToParts(now);
  } catch { return neutralHours; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const weekday = DAYS.indexOf(part('weekday') as Day);
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const date = new Date(`${part('year')}-${part('month')}-${part('day')}T00:00:00Z`);
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(weekday + offset) % 7];
    const key = date.toISOString().slice(0, 10);
    date.setUTCDate(date.getUTCDate() + 1);
    if (closures && (key < closures.from || key > closures.through)) return offset === 0 ? neutralHours : 'Closed';
    if (closures?.dates.includes(key)) {
      if (offset === 0) return 'Closed';
      continue;
    }
    const entry = hours.find(value => value.day === day);
    if (!entry) {
      if (offset === 0) return 'Closed';
      continue;
    }
    const note = entry.note ? ` (${entry.note})` : '';
    if (offset === 0 && current >= minutes(entry.opens) && current < minutes(entry.closes)) return `Open now, until ${displayTime(entry.closes)}${note}`;
    if (offset > 0 || current < minutes(entry.opens)) return `Opens ${offset === 0 ? 'today' : day} at ${displayTime(entry.opens)}${note}`;
  }
  return 'Closed';
}
