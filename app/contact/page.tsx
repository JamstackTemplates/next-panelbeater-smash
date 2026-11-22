import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { Icon, PhoneArt } from '../../components/workshop-art';
import { AddressDetails, HoursTable, WorkshopStatus } from '../../components/workshop-details';
import { Lede, Tape } from '../../components/workshop-ui';
import { business, workshopEmail, workshopPhone } from '../../content/business';
import { pageMetadata } from '../../lib/metadata';
import { site } from '../../lib/site';

export const metadata = pageMetadata('/contact/', 'Contact', business.enquiryDescription);

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead art={<PhoneArt/>}>
      <PageHead.Label>Contact</PageHead.Label>
      <PageHead.Heading>Tell us what <span className="text-accent-ink">happened.</span></PageHead.Heading>
      <Lede>Send a few words and we’ll reply with a time for a free assessment, usually within one working day.</Lede>
    </PageHead>

    <div className="wrap grid items-start gap-8 py-12 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-17">
      <section className="panel-gap border-x border-b border-line bg-primer speckled p-6 sm:p-8" aria-label="Repair enquiry">
        <h2 className="mb-4 text-2xl sm:text-3xl">{hosted ? 'Send an enquiry' : 'Send us an email'}</h2>
        {hosted
          ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email}/>
          : <div className="space-y-4">
            <p className="text-muted">Write to us for a free repair quote, help with a claim or to ask about a courtesy car.</p>
            <a href={workshopEmail} className="button max-w-full break-all">{business.email}</a>
          </div>}
      </section>

      <div className="space-y-6">
        <section className="notepad py-5 pr-5 pl-12 sm:py-6 sm:pr-6 sm:pl-14">
          <h2><Tape className="text-sm!">Put this in your message</Tape></h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Your car’s year, make, model and colour (or paint code)</li>
            <li>What happened and where the damage is</li>
            <li>Your insurer and claim number, if you’ve lodged a claim</li>
            <li>Whether you’d like a courtesy car, and the dates</li>
            <li>The best days for you to bring the car in</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl">Email or phone</h2>
          <a href={workshopEmail} className="text-link block wrap-anywhere">{business.email}</a>
          <a href={workshopPhone} className="text-link inline-flex items-center gap-2"><Icon name="phone" className="size-5"/>{business.phone}</a>
          <p className="text-muted">Photos help. Email them to <a href={workshopEmail} className="text-link wrap-anywhere">{business.email}</a> after you’ve sent your message.</p>
          <CopyEmail email={business.email}/>
        </section>

        <section className="panel-gap space-y-3 pt-5">
          <h2 className="text-2xl">Visit the workshop</h2>
          <AddressDetails/>
          <p className="font-mono text-sm"><WorkshopStatus/></p>
          <HoursTable/>
        </section>
      </div>
    </div>
  </>;
}
