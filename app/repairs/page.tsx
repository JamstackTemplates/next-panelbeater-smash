import { PageHead } from '../../components/page-head';
import { RepairFilter } from '../../components/repair-filter';
import { JobSheet, RepairHeadArt } from '../../components/repairs';
import { Lede, QuoteBand, QuoteLink, SectionHeading } from '../../components/workshop-ui';
import { repairs } from '../../content/repairs';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/repairs/', 'Repairs', 'See sample panel, paint, hail and collision repairs from the Second Wind booth in Woolloongabba.');

export default function RepairsPage() {
  return <>
    <PageHead art={<RepairHeadArt job={repairs.find(job => job.featured)!}/>}>
      <PageHead.Label>Repairs</PageHead.Label>
      <PageHead.Heading>Before and after, <span className="text-accent-ink">panel by panel.</span></PageHead.Heading>
      <Lede>Real-looking jobs from our booth (sample work for this demo site). Drag the tape across to see the repair.</Lede>
    </PageHead>
    <section className="wrap pb-6" aria-label="Repair gallery">
      <RepairFilter jobs={repairs.map(job => ({ id: job.id, damage: job.damage, sheet: <JobSheet job={job}/> }))} options={[
        { id: 'all', label: 'All' },
        { id: 'rear-end', label: 'Rear-end' },
        { id: 'front-end', label: 'Front-end' },
        { id: 'side-swipe', label: 'Side swipe' },
        { id: 'hail', label: 'Hail' },
        { id: 'scrape', label: 'Scrapes and scuffs' },
        { id: 'dent', label: 'Dents' },
      ]}/>
    </section>
    <section className="panel-gap bg-primer speckled py-14 sm:py-20">
      <div className="wrap">
        <SectionHeading className="mb-7">Our repair standard</SectionHeading>
        <dl className="grid border-b border-line md:grid-cols-3">
          <div className="panel-gap space-y-2 p-5 md:border-r md:border-line">
            <dt className="display text-3xl text-accent-ink lg:text-4xl">3 mm panel gap</dt>
            <dd className="text-muted">We measure shut-lines and match each vehicle’s factory panel gaps.</dd>
          </div>
          <div className="panel-gap space-y-2 p-5 md:border-r md:border-line">
            <dt className="display text-3xl text-accent-ink lg:text-4xl">2 light checks</dt>
            <dd className="text-muted">We match the colour under booth lights and check the blend in daylight.</dd>
          </div>
          <div className="panel-gap space-y-2 p-5">
            <dt className="display text-3xl text-accent-ink lg:text-4xl">Lifetime warranty</dt>
            <dd className="text-muted">We stand behind our paint and panel workmanship for as long as you own the car.</dd>
          </div>
        </dl>
      </div>
    </section>
    <QuoteBand>
      <h2 className="text-2xl text-tape-ink sm:text-3xl">Let’s have a look at the damage.</h2>
      <QuoteLink>Ask for a free repair quote</QuoteLink>
    </QuoteBand>
  </>;
}
