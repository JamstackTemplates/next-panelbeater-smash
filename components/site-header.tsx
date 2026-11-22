import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { MobileNav } from './mobile-nav';
import { SiteLink } from './site-link';
import { QuoteLink, Tape } from './workshop-ui';

const pages = [
  { path: '/repairs/', title: 'Repairs' },
  { path: '/claims/', title: 'Insurance claims' },
  { path: '/courtesy-cars/', title: 'Courtesy cars' },
  { path: '/contact/', title: 'Contact' },
];

export function NavLinks({ className }: { className?: string }) {
  return pages.map(({ path, title }) => <SiteLink key={path} href={path} className={className} markCurrent="page">{title}</SiteLink>);
}

export function Wordmark() {
  return <SiteLink href="/" aria-label={`${business.name} home`} className="flex shrink-0 items-center gap-2.5 hover:no-underline">
    <svg width="39" height="35" viewBox="0 0 42 38" aria-hidden="true" className="size-8 shrink-0 text-accent-ink sm:size-10">
      <path d="M4 18C12 14 16 6 27 6h12L29 11H24c-7 0-10 5-20 7Zm-2 8c12-5 15-11 26-11h11l-12 6h-4c-7 0-11 4-21 5Zm0 7c11-3 12-8 23-8h9l-11 6h-5c-6 0-8 2-16 2Z" fill="currentColor"/>
    </svg>
    <span className="grid justify-items-start gap-0.5">
      <span className="display text-base leading-none whitespace-nowrap sm:text-xl">SECOND WIND</span>
      <Tape className="px-2 py-0.5 text-[.59rem]! sm:text-[.64rem]!">Smash repairs</Tape>
    </span>
  </SiteLink>;
}

export function SiteHeader() {
  const navClass = 'py-3 font-mono text-xs font-semibold tracking-wide uppercase hover:text-accent-ink';
  return <header className="relative z-20 border-b border-line bg-primer speckled shadow-[0_1px_var(--booth-light)] print-hide">
    <div className="wrap flex min-h-18 items-center justify-between gap-2 sm:min-h-22 sm:gap-5">
      <Wordmark/>
      <nav aria-label="Main" className="hidden items-center gap-6 min-[950px]:flex lg:gap-8"><NavLinks className={navClass}/></nav>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <DarkModeToggle/>
        <QuoteLink className="hidden min-h-10! px-2.5! text-sm min-[360px]:inline-flex sm:px-3.5!">Free quote</QuoteLink>
        <MobileNav><NavLinks className={navClass}/><QuoteLink className="my-2 min-[360px]:hidden">Free quote</QuoteLink></MobileNav>
      </div>
    </div>
  </header>;
}
