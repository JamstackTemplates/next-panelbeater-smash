import type { ReactNode } from 'react';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

export function Tape({ children, className = '' }: Children & { className?: string }) {
  return <span className={`tape ${className}`}>{children}</span>;
}

export function SectionHeading({ children, className = '' }: Children & { className?: string }) {
  return <h2 className={`text-[clamp(2rem,4vw,3.65rem)] ${className}`}>{children}</h2>;
}

export function Lede({ children }: Children) {
  return <p className="max-w-[42rem] text-lg leading-snug text-muted sm:text-xl">{children}</p>;
}

export function QuoteLink({ children, className = '' }: Children & { className?: string }) {
  return <SiteLink href="/contact/" className={`button ${className}`}>{children}</SiteLink>;
}

export function QuoteBand({ children }: Children) {
  return <section className="panel-gap bg-masking speckled py-10 sm:py-14">
    <div className="wrap quote-tape relative isolate flex flex-col items-start gap-5 px-6 py-7 before:absolute before:inset-0 before:-z-10 before:-rotate-1 before:bg-tape sm:flex-row sm:items-center sm:justify-between sm:px-10">
      {children}
    </div>
  </section>;
}
