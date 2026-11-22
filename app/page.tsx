import { Fleet } from '../components/fleet';
import { Hero, Priorities, Priority, SectionIntro, ServiceSheet, ShortClaims, ShortStep } from '../components/home-sections';
import { JobFacts, PaintChip, SprayPass } from '../components/repairs';
import { SiteLink } from '../components/site-link';
import { WorkshopSection } from '../components/workshop-details';
import { Lede, QuoteBand, QuoteLink, SectionHeading, Tape } from '../components/workshop-ui';
import { availableCarCount, courtesyCars } from '../content/courtesy-cars';
import { repairs } from '../content/repairs';
import { services } from '../content/services';
import { pageMetadata } from '../lib/metadata';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata = pageMetadata('/');

export default function HomePage() {
  const featured = repairs.find(job => job.featured)!;
  return <>
    <Hero>
      <div className="self-end">
        <Tape>Panel &amp; paint · Woolloongabba</Tape>
        <Hero.Heading>Had a prang?<br/><span className="text-accent-ink">Take a breath.</span></Hero.Heading>
      </div>
      <Hero.Artwork><span>Primer &amp; masking</span><span className="text-accent-ink">Ocean Metallic · OCN-41</span></Hero.Artwork>
      <Hero.Intro>Panel, paint and hail repairs in Woolloongabba. We’ll help with the insurance claim and lend you a courtesy car while yours is in the booth.</Hero.Intro>
      <Hero.Actions>
        <QuoteLink>Ask for a free repair quote</QuoteLink>
        <SiteLink className="text-link py-1 min-[520px]:px-2" href="/claims/">How claims work</SiteLink>
      </Hero.Actions>
    </Hero>

    <section className="bg-paper py-13 sm:py-19">
      <div className="wrap">
        <SectionHeading className="mb-8 sm:mb-10">Three things on your mind</SectionHeading>
        <Priorities>
          <Priority number="1" icon="panel" href="/repairs/" title="Fix it">From a car-park ding to major collision work, we repair panels and match your paint.</Priority>
          <Priority number="2" icon="shield" href="/claims/" title="Claim it">We deal with your insurer’s assessor and keep you in the loop.</Priority>
          <Priority number="3" icon="key" href="/courtesy-cars/" title="Keep moving">Ask about a free courtesy car while yours is in the workshop.</Priority>
        </Priorities>
      </div>
    </section>

    <section className="night-booth panel-gap bg-paper booth-wash py-14 text-ink sm:py-21">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-15">
        <SprayPass job={featured}/>
        <div className="space-y-4">
          <Tape>Featured repair</Tape>
          <SectionHeading>{featured.title}</SectionHeading>
          <Lede>{featured.story}</Lede>
          <JobFacts job={featured}/>
          <PaintChip job={featured}/>
          <p><SiteLink href={`/repairs/#${featured.id}`} className="text-link">See the repairs gallery →</SiteLink></p>
        </div>
      </div>
    </section>

    <ServiceSheet services={services}>
      <SectionIntro label="Workshop price sheet · AUD">What we repair</SectionIntro>
    </ServiceSheet>

    <section className="panel-gap bg-primer speckled py-14 sm:py-20">
      <div className="wrap">
        <SectionHeading>How a claim works with us</SectionHeading>
        <ShortClaims>
          <ShortStep number={1}>Lodge the claim with your insurer.</ShortStep>
          <ShortStep number={2}>Tell them you’d like us to quote.</ShortStep>
          <ShortStep number={3}>Bring the car in for a free assessment.</ShortStep>
          <ShortStep number={4}>We start once the insurer authorises the repair.</ShortStep>
          <ShortStep number={5}>Pay any required excess and collect your car.</ShortStep>
        </ShortClaims>
        <SiteLink href="/claims/" className="text-link mt-6 inline-block sm:ml-[30%]">Read the claims guide</SiteLink>
      </div>
    </section>

    <section className="panel-gap bg-paper py-14 sm:py-20">
      <div className="wrap">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading>Courtesy cars</SectionHeading>
          <p className="font-mono text-sm font-semibold text-accent-ink">{availableCarCount(courtesyCars)} of {courtesyCars.length} cars in the bay this week</p>
        </div>
        <Fleet cars={courtesyCars} overhead/>
        <SiteLink href="/courtesy-cars/" className="text-link mt-5 inline-block">Meet the fleet and see the loan terms</SiteLink>
      </div>
    </section>

    <WorkshopSection>Find the workshop</WorkshopSection>

    <QuoteBand>
      <h2 className="max-w-3xl text-xl leading-tight text-tape-ink sm:text-[clamp(1.5rem,2.8vw,2.4rem)]">Send us a few words about the damage and we’ll reply with a time for a free assessment.</h2>
      <QuoteLink className="shrink-0">Ask for a free repair quote</QuoteLink>
    </QuoteBand>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}/>
  </>;
}
