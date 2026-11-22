export const bodyTypes = ['hatch', 'sedan', 'wagon', 'suv', 'ute', 'van'] as const;
export const damageTypes = ['rear-end', 'front-end', 'side-swipe', 'hail', 'scrape', 'dent'] as const;
export const damageZones = ['front', 'rear', 'side', 'roof'] as const;

export type Body = typeof bodyTypes[number];
export type Damage = typeof damageTypes[number];
export type Zone = typeof damageZones[number];

export interface Repair {
  /** Stable ID used as a URL fragment on the gallery. */
  id: string;
  title: string;
  vehicle: string;
  body: Body;
  damage: Damage;
  zone: Zone;
  panels: readonly string[];
  days: number;
  insuranceClaim: boolean;
  paintCode: string;
  paintName: string;
  paintHex: string;
  story: string;
  /** Exactly one repair appears on Home. */
  featured: boolean;
}

export const repairs: readonly Repair[] = [
  { id: 'school-run-rear-ender', title: 'The school-run rear-ender', vehicle: '2019 small hatch', body: 'hatch', damage: 'rear-end', zone: 'rear', panels: ['rear bumper', 'tailgate', 'left tail-light'], days: 4, insuranceClaim: true, paintCode: 'OCN-41', paintName: 'Ocean Metallic', paintHex: '#1C5A78', featured: true, story: 'A bump in the school queue pushed the tailgate in and cracked the left lamp. We lined up the new panels, then blended Ocean Metallic into the rear quarter.' },
  { id: 'carpark-door-ding', title: 'Car-park door ding', vehicle: '2021 mid-size sedan', body: 'sedan', damage: 'dent', zone: 'side', panels: ['right front door'], days: 1, insuranceClaim: false, paintCode: 'SLV-08', paintName: 'Quicksilver', paintHex: '#A7ADB2', featured: false, story: 'A neighbouring door left a sharp little crease. We eased it out from behind and kept the factory paint.' },
  { id: 'november-hail', title: 'The November hailstorm', vehicle: '2017 family wagon', body: 'wagon', damage: 'hail', zone: 'roof', panels: ['roof', 'bonnet', 'boot lid'], days: 9, insuranceClaim: true, paintCode: 'WHT-02', paintName: 'Glacier White', paintHex: '#EEF0EE', featured: false, story: 'Pea-sized hail marked the panels from bonnet to boot. Most of the dents came out without paint, and we refinished the spots that needed it.' },
  { id: 'kerb-kiss-bumper', title: 'Kerb kiss on the front bumper', vehicle: '2022 compact SUV', body: 'suv', damage: 'scrape', zone: 'front', panels: ['front bumper'], days: 2, insuranceClaim: false, paintCode: 'RED-17', paintName: 'Flame Red', paintHex: '#B3261E', featured: false, story: 'A high kerb caught the lower corner of the bumper. We smoothed the gouge and blended the red around the curve.' },
  { id: 'roundabout-side-swipe', title: 'Roundabout side swipe', vehicle: '2018 dual-cab ute', body: 'ute', damage: 'side-swipe', zone: 'side', panels: ['left rear door', 'left tub side', 'sill'], days: 6, insuranceClaim: true, paintCode: 'GRY-33', paintName: 'Gunmetal', paintHex: '#4A5157', featured: false, story: 'A crease ran from the rear door to the tub. We straightened the sill and matched the metallic finish across the door gap.' },
  { id: 'bullbar-nose-job', title: 'Front-end after a low-speed nudge', vehicle: '2020 delivery van', body: 'van', damage: 'front-end', zone: 'front', panels: ['front bumper', 'grille', 'bonnet', 'right headlight'], days: 7, insuranceClaim: true, paintCode: 'WHT-05', paintName: 'Fleet White', paintHex: '#F4F4F0', featured: false, story: 'The nudge left the bonnet sitting high and broke a lamp mount. We brought the front gaps back into line before painting.' },
  { id: 'trolley-scrape', title: 'Runaway trolley scrape', vehicle: '2016 small sedan', body: 'sedan', damage: 'scrape', zone: 'side', panels: ['left rear quarter'], days: 2, insuranceClaim: false, paintCode: 'GRN-12', paintName: 'Eucalypt Green', paintHex: '#3E6B4F', featured: false, story: 'A trolley put a long scratch just above the wheel arch. We feathered the edges and blended the green into the quarter.' },
  { id: 'reversing-post', title: 'Reversing into the carport post', vehicle: '2023 mid-size SUV', body: 'suv', damage: 'rear-end', zone: 'rear', panels: ['rear bumper', 'tailgate'], days: 3, insuranceClaim: true, paintCode: 'BLK-01', paintName: 'Jet Black', paintHex: '#1A1C1E', featured: false, story: 'A narrow post left a deep impression in the tailgate. We reset the latch, repaired the bumper and checked the black finish out in daylight.' },
];

export function filterRepairs<T extends Pick<Repair, 'damage'>>(jobs: readonly T[], damage: Damage | 'all') {
  return damage === 'all' ? jobs : jobs.filter(job => job.damage === damage);
}
