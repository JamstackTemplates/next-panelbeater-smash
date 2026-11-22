import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { availableCarCount, baySign, courtesyCars } from '../content/courtesy-cars.ts';
import { damageTypes, filterRepairs, repairs } from '../content/repairs.ts';
import { services } from '../content/services.ts';
import { validateBusiness, validateClosures, validateCourtesyCars, validateRepairs, validateServices, validateWorkshopContent } from '../content/validate.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

function invalidFields<T extends { id: string }>(
  collection: string, items: readonly T[], validate: (items: readonly T[]) => void, changes: Record<string, unknown>,
) {
  const [first, ...rest] = items;
  for (const [field, value] of Object.entries(changes)) {
    assert.throws(() => validate([{ ...first, [field]: value }, ...rest]), {
      message: new RegExp(`^${collection}\\[${field === 'id' ? value : first.id}\\]\\.${field}`),
    });
  }
  assert.throws(() => validate([...items, first]), /duplicate ID/);
}

test('all workshop content is valid and errors name the business field', () => {
  assert.doesNotThrow(validateWorkshopContent);
  assert.throws(() => validateBusiness({ ...business, email: 'bad' }), /business\.email/);
  assert.throws(() => validateBusiness({ ...business, phone: '' }), /business\.phone/);
  assert.throws(() => validateBusiness({ ...business, address: { ...business.address, street: '' } }), /business\.address\.street/);
  assert.throws(() => validateBusiness({ ...business, geo: { ...business.geo, latitude: 96 } }), /business\.geo\.latitude/);
  assert.throws(() => validateBusiness({ ...business, timeZone: 'Mars/Base' }), /business\.timeZone/);
  assert.throws(() => validateClosures({ from: '2026-01-01', through: '2026-12-31', dates: ['2026-02-30'] }), /closures\[2026-02-30\]/);
  assert.throws(() => validateClosures({ from: '2026-01-01', through: '2026-12-31', dates: ['2026-05-04', '2026-05-04'] }), /duplicate date/);
});

test('service sheet validates every editable field', () => {
  invalidFields('services', services, validateServices, {
    id: 'bad/path', name: '', summary: ' ', priceFrom: -1, typicalDays: { min: 4, max: 2 }, insuranceWork: 1, icon: 'paint',
  });
  for (const priceFrom of [0.5, '200', undefined]) {
    assert.throws(() => validateServices([{ ...services[0], priceFrom } as typeof services[number]]), /services\[free-assessment\]\.priceFrom/);
  }
  assert.throws(() => validateServices([{ ...services[0], typicalDays: { min: 0, max: NaN } }]), /typicalDays\.max/);
  assert.throws(() => validateServices([{ ...services[0], typicalDays: { min: -2, max: 3 } }]), /typicalDays\.min/);
});

test('repair jobs validate editable fields, references and the single featured repair', () => {
  invalidFields('repairs', repairs, validateRepairs, {
    id: 'bad/path', title: '', vehicle: '', body: 'convertible', damage: 'scratch', zone: 'underneath', panels: [],
    days: 0, insuranceClaim: 1, paintCode: '', paintName: '', paintHex: '#123', story: '', featured: 'yes',
  });
  assert.throws(() => validateRepairs(repairs.map(job => job.id === 'trolley-scrape'
    ? { ...job, damage: 'scratch' } as unknown as typeof job : job)), {
    message: 'repairs[trolley-scrape].damage: "scratch" is not a damage type',
  });
  assert.throws(() => validateRepairs(repairs.map(job => ({ ...job, featured: false }))), /exactly one featured repair, found none/);
  assert.throws(() => validateRepairs(repairs.map((job, index) => ({ ...job, featured: index < 2 }))), /school-run-rear-ender, carpark-door-ding/);
});

test('every damage filter reports its job count', () => {
  assert.equal(filterRepairs(repairs, 'all').length, 8);
  assert.deepEqual(damageTypes.map(damage => filterRepairs(repairs, damage).length), [2, 1, 1, 1, 2, 1]);
});

test('the fleet validates each field and Brisa’s flag changes the count and bay sign', () => {
  invalidFields('courtesyCars', courtesyCars, validateCourtesyCars, {
    id: 'bad/path', name: '', body: 'coupe', seats: 1, transmission: 'fixed', fuel: 'diesel', towBar: 0, colourHex: 'FFFFFF', available: 'true', note: '',
  });
  for (const seats of [8.5, 9]) {
    assert.throws(() => validateCourtesyCars([{ ...courtesyCars[0], seats }]), /courtesyCars\[zephyr\]\.seats/);
  }
  const edited = courtesyCars.map(car => car.id === 'brisa' ? { ...car, available: false } : car);
  assert.equal(availableCarCount(courtesyCars), 3);
  assert.equal(availableCarCount(edited), 2);
  assert.equal(baySign(courtesyCars.find(car => car.id === 'brisa')!), 'In the bay');
  assert.equal(baySign(edited.find(car => car.id === 'brisa')!), 'Out on loan');
});

test('AutoBodyShop schema comes from workshop content and escapes closing script tags', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'AutoBodyShop');
  assert.equal(schema.address.streetAddress, business.address.street);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.email, business.email);
  assert.equal(schema.geo.latitude, business.geo.latitude);
  assert.equal(schema.geo.longitude, business.geo.longitude);
  assert.deepEqual(schema.openingHoursSpecification.map(({ opens, closes }) => ({ opens, closes })),
    business.hours.map(({ opens, closes }) => ({ opens, closes })));
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('published copy treats quotes, claims and car loans as enquiries', () => {
  for (const folder of ['app/', 'components/', 'content/']) {
    const root = new URL(`../${folder}`, import.meta.url);
    for (const file of readdirSync(root, { recursive: true, encoding: 'utf8' })) {
      if (!/\.(tsx?|md)$/.test(file)) continue;
      assert.doesNotMatch(readFileSync(new URL(file, root), 'utf8'), /booking confirmed|reserved for you|claim approved/i, file);
    }
  }
});
