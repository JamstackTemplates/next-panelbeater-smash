import type { ReactNode } from 'react';
import type { Service } from '../content/services';
import { asset } from '../lib/paths';
import { SiteLink } from './site-link';
import { ChipFan, Icon } from './workshop-art';
import { StatusStrip } from './workshop-details';
import { SectionHeading, Tape } from './workshop-ui';

type Children = { children: ReactNode };
function HeroBand({ children }: Children) {
  return <section className="bg-primer booth-wash">
    <div className="wrap grid items-center gap-x-9 pt-8 pb-8 sm:pt-10 sm:pb-11 lg:grid-cols-[minmax(0,.88fr)_minmax(0,1.22fr)] lg:py-16 xl:gap-x-12">
      {children}
    </div>
    <StatusStrip/>
  </section>;
}

function HeroHeading({ children }: Children) {
  return <h1 className="mt-4 text-[clamp(2.8rem,7vw,4.3rem)] leading-[.99] lg:mt-5 lg:text-[clamp(3.25rem,4.75vw,5.2rem)]">{children}</h1>;
}

function HeroIntro({ children }: Children) {
  return <p className="max-w-[32rem] pt-4 text-[clamp(1.03rem,1.55vw,1.25rem)] leading-snug text-muted lg:pt-1">{children}</p>;
}

const heroBoothAlt = 'A hatchback in the downdraft spray booth, with matte grey primer and kraft masking paper on the rear half and gleaming Ocean Metallic paint on the front half';

function HeroArtwork({ children }: Children) {
  return <figure className="relative mt-5 min-w-0 border border-line bg-primer-deep shadow-[0_16px_36px_-22px_color-mix(in_oklab,var(--art-ink)_40%,transparent)] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0">
    <div className="flex items-center justify-between gap-2 border-b border-line bg-paper px-3 py-1.5 font-mono text-[.6rem] font-semibold tracking-wider text-muted uppercase sm:px-4 sm:text-[.66rem]">
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><span className="size-1.5 rounded-full bg-guide-coat" aria-hidden="true"/>Bay 02 · Downdraft booth</span>
      <span className="whitespace-nowrap">60°C bake<span className="hidden min-[440px]:inline"> · Match verified</span></span>
    </div>
    <img src={asset('/hero-booth-light.webp')} alt={heroBoothAlt} width={1600} height={893} fetchPriority="high" decoding="async" className="hero-booth-light block aspect-[1600/893] w-full object-cover"/>
    <img src={asset('/hero-booth-dark.webp')} alt={heroBoothAlt} width={1600} height={893} fetchPriority="high" decoding="async" className="hero-booth-dark block aspect-[1600/893] w-full object-cover"/>
    <figcaption className="flex flex-wrap items-center justify-between gap-1 border-t border-line bg-paper px-3 py-2 font-mono text-[.62rem] tracking-wide uppercase sm:px-4 sm:text-[.71rem]">{children}</figcaption>
  </figure>;
}

function HeroActions({ children }: Children) {
  return <div className="mt-4 flex flex-col items-stretch gap-3 text-center min-[520px]:flex-row min-[520px]:items-center lg:mt-5">{children}</div>;
}

export const Hero = Object.assign(HeroBand, { Heading: HeroHeading, Intro: HeroIntro, Artwork: HeroArtwork, Actions: HeroActions });

export function Priorities({ children }: Children) {
  return <div className="relative ml-4 grid border-l border-line pl-5 sm:ml-0 sm:grid-cols-3 sm:border-t sm:border-l-0 sm:pl-0">{children}</div>;
}

export function Priority({ number, icon, href, title, children }: Children & {
  number: string; icon: 'panel' | 'shield' | 'key'; href: string; title: ReactNode;
}) {
  return <div className="relative grid grid-cols-[3.7rem_1fr] gap-2 px-2 pt-6 pb-5 sm:grid-cols-[auto_1fr] sm:gap-3.5 sm:pt-7 sm:pr-6 sm:pl-0 sm:not-first:border-l sm:not-first:border-line/70 sm:not-first:pl-6 sm:nth-2:pt-10 sm:nth-3:pt-13">
    <span className="absolute top-10 -left-[25px] size-[9px] rounded-full border-2 border-accent-ink bg-paper sm:-top-[5px] sm:left-7" aria-hidden="true"/>
    <span className="display text-5xl leading-none text-accent-ink sm:text-[clamp(3.3rem,5.8vw,6.25rem)]">{number}</span>
    <div className="max-w-64 space-y-2.5">
      <h3 className="text-xl sm:text-[clamp(1.15rem,2vw,1.6rem)]">
        <SiteLink href={href} className="tape gap-2 !text-[.82rem]">
          <Icon name={icon} className="size-4"/>{title}<span aria-hidden="true" className="opacity-75">→</span>
        </SiteLink>
      </h3>
      <p className="text-muted">{children}</p>
    </div>
  </div>;
}

const aud = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

export function ServiceSheet({ services, children }: Children & { services: readonly Service[] }) {
  return <section className="panel-gap bg-paper py-14 sm:py-22">
    <div className="wrap grid items-start gap-7 lg:grid-cols-[.65fr_1.35fr] lg:gap-14">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:sticky lg:top-8 lg:block">
        {children}
        <div className="mx-auto w-[clamp(5rem,23vw,10.5rem)] lg:mt-4 lg:w-full lg:max-w-72"><ChipFan/></div>
      </div>
      <ul aria-label="Repair services and prices" className="border-b border-line">
        {services.map(service => {
          const { min, max } = service.typicalDays;
          const isFree = service.priceFrom === 0;
          return <li key={service.id} className="panel-gap -mx-2 grid grid-cols-[1.7rem_1fr] gap-x-3 gap-y-1 rounded-ui px-2 py-3.5 transition-colors hover:bg-primer/55 sm:grid-cols-[2rem_1fr_13.5rem] sm:py-4.5">
            <Icon name={service.icon} className="mt-0.5 shrink-0 text-accent-ink"/>
            <div><h3 className="text-[1.03rem] leading-snug sm:text-lg">{service.name}</h3><p className="text-muted">{service.summary}</p></div>
            <p className="col-start-2 font-mono text-sm font-bold leading-snug sm:col-start-3 sm:text-right">
              <span className={isFree ? 'text-accent-ink' : ''}>
                {service.priceFrom === null ? 'Quoted after assessment' : isFree ? 'Free' : `From ${aud.format(service.priceFrom)}`}
              </span>
              <span className="mt-0.5 block text-xs font-normal text-muted">{max === 0 ? 'While you wait' : `${min === max ? min : `${min}–${max}`} working ${max === 1 ? 'day' : 'days'}`}</span>
            </p>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}

export function ShortClaims({ children }: Children) {
  return <ol className="mt-6 grid gap-1.5 sm:gap-2">{children}</ol>;
}

export function ShortStep({ number, children }: Children & { number: number }) {
  return <li className="flex items-center gap-3 sm:gap-5" style={{ '--step': number - 1 } as React.CSSProperties}>
    <span className="display w-12 shrink-0 text-right text-5xl text-accent-ink sm:w-[calc(4rem+var(--step)*5.6vw)] sm:text-6xl">{number}</span>
    <Tape className="text-[.77rem] sm:text-sm">{children}</Tape>
  </li>;
}

export function SectionIntro({ label, children }: Children & { label: string }) {
  return <div className="space-y-4"><Tape>{label}</Tape><SectionHeading>{children}</SectionHeading></div>;
}
