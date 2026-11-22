import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { validateWorkshopContent } from '../content/validate';
import { site } from '../lib/site';
import '@fontsource-variable/archivo/standard.css';
import '@fontsource-variable/atkinson-hyperlegible-next';
import '@fontsource-variable/azeret-mono';
import './tailwind.input.css';

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  validateWorkshopContent();
  return <html lang="en-AU" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
