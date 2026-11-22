import { business, workshopAddress, workshopEmail, workshopPhone } from '../content/business';
import { NavLinks, Wordmark } from './site-header';
import { HoursTable, WorkshopStatus } from './workshop-details';
import { ChipRow } from './workshop-art';

export function SiteFooter() {
  return <footer className="paper-edge night-booth relative bg-primer speckled pt-11 pb-7 text-ink print-hide">
    <div className="wrap grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_1fr_.85fr]">
      <div className="flex flex-col items-start gap-4">
        <Wordmark/>
        <p className="text-muted">{business.tagline}</p>
        <ChipRow/>
      </div>
      <div className="-order-1 space-y-2 sm:order-none">
        <a href={workshopPhone} className="block text-xl font-bold">{business.phone}</a>
        <a href={workshopEmail} className="text-link break-all">{business.email}</a>
        <address className="max-w-62 text-sm text-muted">{workshopAddress}</address>
      </div>
      <div>
        <p className="mb-2 text-xs font-mono"><WorkshopStatus/></p>
        <HoursTable compact/>
      </div>
      <nav className="grid content-start gap-2" aria-label="Footer">
        <NavLinks className="text-sm font-semibold hover:text-accent-ink"/>
      </nav>
    </div>
    <div className="wrap mt-8 flex flex-wrap gap-x-3 gap-y-2 border-t border-line pt-4 text-sm text-muted">
      <span>{business.name}</span><span>·</span><span>Fictitious workshop for the Jamstacks gallery</span>
    </div>
  </footer>;
}
