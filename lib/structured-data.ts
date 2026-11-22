import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';
import { site } from './site.ts';

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const { address, geo, hours } = business;
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    name: business.name,
    description: site.description || business.introduction,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street, addressLocality: address.suburb,
      addressRegion: address.region, postalCode: address.postcode, addressCountry: address.country,
    },
    geo: { '@type': 'GeoCoordinates', ...geo },
    openingHoursSpecification: hours.map(({ day, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens, closes,
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
