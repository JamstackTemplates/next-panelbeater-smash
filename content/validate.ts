import { business } from './business.ts';
import { workshopClosures } from './closures.ts';
import { courtesyCars } from './courtesy-cars.ts';
import { bodyTypes, damageTypes, damageZones, repairs } from './repairs.ts';
import { serviceIcons, services } from './services.ts';
import { validateHours, type Closures } from '../lib/hours.ts';

type Fields = Record<string, unknown>;

function required(item: Fields, label: string, fields: readonly string[]) {
  for (const field of fields) {
    const value = item[field];
    if (typeof value !== 'string' || !value.trim()) throw new Error(`${label}.${field}: required text`);
  }
}

function flags(item: Fields, label: string, fields: readonly string[]) {
  for (const field of fields) {
    if (typeof item[field] !== 'boolean') throw new Error(`${label}.${field}: expected true or false`);
  }
}

function oneOf(value: unknown, choices: readonly string[], label: string, expected: string) {
  if (typeof value !== 'string' || !choices.includes(value)) throw new Error(`${label}: ${JSON.stringify(value)} is not ${expected}`);
}

function integer(value: unknown, label: string, min = 0, max = Number.MAX_SAFE_INTEGER) {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) {
    throw new Error(`${label}: expected ${max === Number.MAX_SAFE_INTEGER ? `a whole number of at least ${min}` : `a whole number from ${min} to ${max}`}`);
  }
}

function colour(value: unknown, label: string) {
  if (typeof value !== 'string' || !/^#[\da-f]{6}$/i.test(value)) throw new Error(`${label}: expected a six-digit hex colour`);
}

function validateItems<T extends { id: string }>(name: string, items: readonly T[], validate: (item: T, label: string) => void) {
  const seen = new Set<string>();
  items.forEach((item, index) => {
    const label = `${name}[${item.id || index}]`;
    if (typeof item.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) throw new Error(`${label}.id: expected a URL-safe ID`);
    if (seen.has(item.id)) throw new Error(`${label}.id: duplicate ID`);
    seen.add(item.id);
    validate(item, label);
  });
}

export function validateBusiness(value = business) {
  required({ ...value }, 'business', ['name', 'tagline', 'introduction', 'email', 'phone', 'directions', 'timeZone', 'enquiryDescription']);
  required(value.address, 'business.address', ['street', 'suburb', 'region', 'postcode', 'country']);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) throw new Error('business.email: expected a public email address');
  if (!/^0\d{9}$/.test(value.phone.replace(/\D/g, ''))) throw new Error('business.phone: expected a ten-digit Australian phone number');
  try { new Intl.DateTimeFormat('en-AU', { timeZone: value.timeZone }); }
  catch { throw new Error('business.timeZone: expected an IANA time zone'); }
  for (const [key, max] of [['latitude', 90], ['longitude', 180]] as const) {
    if (!Number.isFinite(value.geo[key]) || Math.abs(value.geo[key]) > max) throw new Error(`business.geo.${key}: expected a valid coordinate`);
  }
  validateHours(value.hours);
}

export function validateServices(items = services) {
  validateItems('services', items, (item, label) => {
    required({ ...item }, label, ['name', 'summary']);
    if (item.priceFrom !== null) integer(item.priceFrom, `${label}.priceFrom`);
    integer(item.typicalDays?.min, `${label}.typicalDays.min`);
    integer(item.typicalDays?.max, `${label}.typicalDays.max`);
    if (item.typicalDays.min > item.typicalDays.max) throw new Error(`${label}.typicalDays: min must be at most max`);
    flags({ ...item }, label, ['insuranceWork']);
    oneOf(item.icon, serviceIcons, `${label}.icon`, 'a service icon');
  });
}

export function validateRepairs(items = repairs) {
  validateItems('repairs', items, (item, label) => {
    required({ ...item }, label, ['title', 'vehicle', 'paintCode', 'paintName', 'story']);
    oneOf(item.damage, damageTypes, `${label}.damage`, 'a damage type');
    oneOf(item.body, bodyTypes, `${label}.body`, 'a body type');
    oneOf(item.zone, damageZones, `${label}.zone`, 'a damage zone');
    if (!Array.isArray(item.panels) || !item.panels.length || item.panels.some(panel => typeof panel !== 'string' || !panel.trim())) {
      throw new Error(`${label}.panels: expected one or more panel names`);
    }
    integer(item.days, `${label}.days`, 1);
    flags({ ...item }, label, ['insuranceClaim', 'featured']);
    colour(item.paintHex, `${label}.paintHex`);
  });
  const featured = items.filter(item => item.featured).map(item => item.id);
  if (featured.length !== 1) throw new Error(`repairs.featured: expected exactly one featured repair, found ${featured.join(', ') || 'none'}`);
}

export function validateCourtesyCars(items = courtesyCars) {
  validateItems('courtesyCars', items, (item, label) => {
    required({ ...item }, label, ['name', 'note']);
    oneOf(item.body, bodyTypes, `${label}.body`, 'a body type');
    oneOf(item.transmission, ['automatic', 'manual'], `${label}.transmission`, 'a transmission');
    oneOf(item.fuel, ['petrol', 'hybrid'], `${label}.fuel`, 'a fuel type');
    integer(item.seats, `${label}.seats`, 2, 8);
    flags({ ...item }, label, ['towBar', 'available']);
    colour(item.colourHex, `${label}.colourHex`);
  });
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value).toJSON()?.slice(0, 10) === value;
}

export function validateClosures({ from, through, dates }: Closures = workshopClosures) {
  if (!validDate(from) || !validDate(through) || from > through) throw new Error('closures: expected a valid from/through date range');
  const seen = new Set<string>();
  for (const date of dates) {
    if (!validDate(date) || date < from || date > through) throw new Error(`closures[${date}]: expected a date within the published range`);
    if (seen.has(date)) throw new Error(`closures[${date}]: duplicate date`);
    seen.add(date);
  }
}

export function validateWorkshopContent() {
  validateBusiness();
  validateServices();
  validateRepairs();
  validateCourtesyCars();
  validateClosures();
}
