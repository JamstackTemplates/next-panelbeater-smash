import { Fleet, KeyTag } from '../../components/fleet';
import { PageHead } from '../../components/page-head';
import { CarView } from '../../components/workshop-art';
import { Lede, QuoteBand, QuoteLink, SectionHeading } from '../../components/workshop-ui';
import { courtesyCars } from '../../content/courtesy-cars';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/courtesy-cars/', 'Courtesy cars', 'Meet the five courtesy cars at Second Wind Smash Repairs and find out how to ask for one while your car is in the workshop.');

export default function CourtesyCarsPage() {
  const zephyr = courtesyCars[0];
  return <>
    <PageHead art={<div className="painted-bay relative bg-primer-deep speckled px-5 pt-9 pb-2">
      <span className="absolute top-2.5 left-3 font-mono text-[.68rem] font-semibold tracking-wider text-muted uppercase">Bay 01</span>
      <CarView body={zephyr.body} paint={zephyr.colourHex}/>
      <div className="bay-hatch -mx-5 mt-2 h-1.5 opacity-80" aria-hidden="true"/>
    </div>}>
      <PageHead.Label>Courtesy cars</PageHead.Label>
      <PageHead.Heading>Keep moving while yours is <span className="text-accent-ink">in the booth.</span></PageHead.Heading>
      <Lede>Courtesy cars are free for customers with a repair booked at Second Wind. We have five, so ask early.</Lede>
    </PageHead>
    <section className="wrap py-12 sm:py-17" aria-label="Courtesy car bays">
      <Fleet cars={courtesyCars}/>
    </section>
    <KeyTag title="Before you drive off">
      <ul className="list-disc space-y-2 pl-5">
        <li>Drivers must be at least 21 and have held a full licence for at least two years.</li>
        <li>Return the car with the same fuel level.</li>
        <li>Tolls, fines and the first $500 of any damage are your responsibility.</li>
        <li>150 km a day is included.</li>
      </ul>
      <p>Some insurers arrange a hire car instead. Check your policy.</p>
    </KeyTag>
    <QuoteBand>
      <div className="space-y-3 text-tape-ink">
        <SectionHeading className="text-2xl! sm:text-3xl!">How to ask for one</SectionHeading>
        <p>Tell us the dates and the number of seats you’ll need.<br/>Say if you need a tow bar or an automatic.<br/>We hold a car only once we confirm by reply.</p>
      </div>
      <QuoteLink className="shrink-0">Ask about a courtesy car</QuoteLink>
    </QuoteBand>
  </>;
}
