import type { Metadata } from 'next';
import { business } from '../content/business';
import { absoluteUrl, asset } from './paths';
import { site } from './site';

export function pageMetadata(path: string, title?: string, description = site.description || business.introduction): Metadata {
  const canonical = absoluteUrl(path);
  const image = { url: absoluteAsset(), width: 1200, height: 630, alt: 'Second Wind Smash Repairs, with a hatchback half in primer and half in Ocean Metallic paint' };
  const socialTitle = title ? `${title} — ${business.name}` : business.name;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical },
    openGraph: { type: 'website', url: canonical, siteName: business.name, title: socialTitle, description, images: [image] },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [image] },
  };
}

function absoluteAsset() {
  const imagePath = asset('/og.png');
  return site.url ? new URL(imagePath, site.url).href : imagePath;
}
