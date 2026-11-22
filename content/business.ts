import { DAYS, type OpeningHours } from '../lib/hours.ts';

interface Business {
  name: string;
  tagline: string;
  introduction: string;
  email: string;
  phone: string;
  address: { street: string; suburb: string; region: string; postcode: string; country: string };
  directions: string;
  geo: { latitude: number; longitude: number };
  timeZone: string;
  hours: readonly OpeningHours[];
  enquiryDescription: string;
}

export const business: Business = {
  name: 'Second Wind Smash Repairs',
  tagline: 'Fix it. Claim it. Keep moving.',
  introduction: 'Panel, paint and hail repairs in Woolloongabba. We’ll help with the insurance claim and lend you a courtesy car while yours is in the booth.',
  email: 'hello@secondwindsmash.example',
  phone: '(07) 5550 2184',
  address: { street: 'Unit 3, 41 Logan Road', suburb: 'Woolloongabba', region: 'QLD', postcode: '4102', country: 'Australia' },
  directions: 'Two blocks south of the Gabba stadium. Drive in off Logan Road, and the customer bay is the one painted with yellow hatching.',
  geo: { latitude: -27.4899, longitude: 153.0403 },
  timeZone: 'Australia/Brisbane',
  hours: [
    ...DAYS.slice(0, 5).map(day => ({ day, opens: '07:30', closes: '17:00' })),
    { day: 'Saturday', opens: '08:00', closes: '12:00', note: 'quotes and assessments' },
  ],
  enquiryDescription: 'Ask Second Wind Smash Repairs for a free assessment, insurance repair quote or courtesy car in Woolloongabba.',
};

export const workshopAddress = `${business.address.street}, ${business.address.suburb} ${business.address.region} ${business.address.postcode}`;
export const workshopPhone = `tel:+61${business.phone.replace(/\D/g, '').slice(1)}`;
export const workshopEmail = `mailto:${business.email}`;
