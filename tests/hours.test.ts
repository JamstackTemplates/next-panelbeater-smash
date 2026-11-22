import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { workshopClosures } from '../content/closures.ts';
import { openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const at = (date: string) => openingLabel(business.hours, business.timeZone, new Date(date), workshopClosures);

test('Brisbane opening boundaries use inclusive opening and exclusive closing', () => {
  assert.equal(at('2026-11-20T06:59:00Z'), 'Open now, until 5:00 pm');
  assert.equal(at('2026-11-20T07:00:00Z'), 'Opens Saturday at 8:00 am (quotes and assessments)');
  assert.equal(at('2026-11-20T21:59:00Z'), 'Opens today at 8:00 am (quotes and assessments)');
  assert.equal(at('2026-11-20T22:00:00Z'), 'Open now, until 12:00 pm (quotes and assessments)');
  assert.equal(at('2026-11-21T02:00:00Z'), 'Opens Monday at 7:30 am');
  for (const date of ['2026-11-21T14:00:00Z', '2026-11-22T02:00:00Z', '2026-11-22T13:59:00Z']) {
    assert.equal(at(date), 'Closed');
  }
});

test('Brisbane stays UTC+10 through Sydney summer and winter', () => {
  for (const date of ['2026-01-15', '2026-07-15']) {
    assert.equal(at(`${date}T07:00:00Z`).startsWith('Open now'), false);
    assert.equal(at(`${date}T06:59:00Z`), 'Open now, until 5:00 pm');
  }
});

test('public holidays use the Brisbane date and are skipped when showing the next opening', () => {
  assert.equal(at('2026-04-02T07:00:00Z'), 'Opens Tuesday at 7:30 am');
  assert.equal(at('2026-04-03T00:00:00Z'), 'Closed');
  assert.equal(at('2026-04-04T00:00:00Z'), 'Closed');
  assert.equal(at('2026-08-12T02:00:00Z'), 'Closed');
  assert.equal(at('2026-12-28T00:00:00Z'), 'Closed');
  assert.equal(at('2027-04-26T00:00:00Z'), 'Closed');
  assert.equal(at('2030-01-02T00:00:00Z'), 'Workshop hours');
});

test('the clock also supports DST zones and neutral fallbacks', () => {
  const hours: OpeningHours[] = [{ day: 'Sunday', opens: '09:00', closes: '17:00' }];
  const label = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
  assert.equal(label('2026-03-08T12:59:00Z'), 'Opens today at 9:00 am');
  assert.equal(label('2026-03-08T13:00:00Z'), 'Open now, until 5:00 pm');
  assert.equal(label('2026-11-01T13:59:00Z'), 'Opens today at 9:00 am');
  assert.equal(label('2026-11-01T14:00:00Z'), 'Open now, until 5:00 pm');
  assert.equal(label('2026-11-01T14:00:00Z', ''), 'Workshop hours');
  assert.equal(label('2026-11-01T14:00:00Z', 'Mars/Base'), 'Workshop hours');
});

test('hours validation identifies the weekday and accepts absent closed days', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
  const check = (change: Partial<OpeningHours>) => assert.throws(
    () => validateHours([{ day: 'Saturday', opens: '08:00', closes: '12:00', ...change }]), /hours\[Saturday\]/,
  );
  for (const opens of ['24:00', '8:00', '12:00', '18:00']) check({ opens });
  check({ closes: undefined });
  check({ note: '' });
  assert.throws(() => validateHours([...business.hours, business.hours[0]]), /hours\[Monday\]\.day: duplicate/);
  assert.throws(() => validateHours([{ day: 'Monsterday', opens: '08:00', closes: '12:00' } as unknown as OpeningHours]), /hours\[Monsterday\]\.day/);
});
