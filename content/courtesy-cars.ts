import type { Body } from './repairs.ts';

export interface CourtesyCar {
  id: string;
  name: string;
  body: Body;
  seats: number;
  transmission: 'automatic' | 'manual';
  fuel: 'petrol' | 'hybrid';
  towBar: boolean;
  colourHex: string;
  /** Flip this to update the Home count and both bay signs. */
  available: boolean;
  note: string;
}

export const courtesyCars: readonly CourtesyCar[] = [
  { id: 'zephyr', name: 'Zephyr', body: 'hatch', seats: 5, transmission: 'automatic', fuel: 'petrol', towBar: false, colourHex: '#1C5A78', available: true, note: 'Easy to park around the Gabba.' },
  { id: 'southerly', name: 'Southerly', body: 'sedan', seats: 5, transmission: 'automatic', fuel: 'hybrid', towBar: false, colourHex: '#A7ADB2', available: true, note: 'Our most economical car.' },
  { id: 'trade-wind', name: 'Trade Wind', body: 'wagon', seats: 5, transmission: 'automatic', fuel: 'petrol', towBar: true, colourHex: '#3E6B4F', available: false, note: 'Room for the dog and a trailer.' },
  { id: 'brisa', name: 'Brisa', body: 'suv', seats: 7, transmission: 'automatic', fuel: 'petrol', towBar: true, colourHex: '#EEF0EE', available: true, note: 'Seven seats for the school run.' },
  { id: 'gust', name: 'Gust', body: 'hatch', seats: 5, transmission: 'manual', fuel: 'petrol', towBar: false, colourHex: '#B3261E', available: false, note: 'Manual only. Say so if that suits.' },
];

export function availableCarCount(fleet: readonly CourtesyCar[]) {
  return fleet.filter(car => car.available).length;
}

export function baySign(car: CourtesyCar) {
  return car.available ? 'In the bay' : 'Out on loan';
}
