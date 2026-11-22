import { business, workshopAddress, workshopPhone } from '../content/business';
import { workshopClosures } from '../content/closures';
import { DAYS, displayTime } from '../lib/hours';
import { mapDirectionsUrl } from '../lib/maps';
import { GoogleMap } from './google-map';
import { OpenBadge } from './open-badge';
import { Icon, StreetSketch } from './workshop-art';
import { SectionHeading } from './workshop-ui';

export function WorkshopStatus() {
  return <span className="inline-flex items-center gap-2"><Icon name="clock" className="size-5 shrink-0 text-accent-ink"/>
    <OpenBadge hours={business.hours} timeZone={business.timeZone} closures={workshopClosures}/>
  </span>;
}

export function HoursTable({ compact = false }: { compact?: boolean }) {
  const rows: { first: string; last: string; times: string; note?: string }[] = [];
  for (const day of DAYS) {
    const hours = business.hours.find(entry => entry.day === day);
    const times = hours ? `${displayTime(hours.opens)} – ${displayTime(hours.closes)}` : 'Closed';
    const previous = rows.at(-1);
    if (previous?.times === times && previous.note === hours?.note) previous.last = day;
    else rows.push({ first: day, last: day, times, note: hours?.note });
  }
  return <div>
    <table className={`w-full text-left ${compact ? 'text-sm' : 'text-base'}`} aria-label="Workshop hours">
      <tbody>{rows.map(({ first, last, times, note }) => <tr key={first} className="border-b border-line align-top">
        <th scope="row" className="py-1.5 pr-3 font-semibold">{first === last ? first : `${first.slice(0, 3)}–${last.slice(0, 3)}`}</th>
        <td className="py-1.5">{times}{note && <small className="block text-muted">{note.charAt(0).toUpperCase() + note.slice(1)} only</small>}</td>
      </tr>)}</tbody>
    </table>
    <p className="mt-2 text-sm text-muted">Closed on Queensland public holidays.</p>
  </div>;
}

export function AddressDetails() {
  return <div className="space-y-2">
    <address className="font-bold">{workshopAddress}</address>
    <p className="text-muted">{business.directions}</p>
    <a href={mapDirectionsUrl(`${workshopAddress}, ${business.address.country}`)} className="text-link">Get directions</a>
  </div>;
}

export function StatusStrip() {
  return <div className="panel-gap bg-primer-deep speckled">
    <div className="bay-hatch h-1.5 w-full opacity-85" aria-hidden="true"/>
    <div className="wrap flex flex-wrap gap-x-0 py-2 text-[.73rem] font-medium tracking-tight sm:py-0 sm:text-[.77rem] [font-family:var(--font-mono)]">
      <div className="flex min-h-9 items-center pr-4 sm:min-h-14 sm:border-r sm:border-line sm:pr-5"><WorkshopStatus/></div>
      <a className="flex min-h-9 items-center gap-2 pr-4 font-semibold transition-colors hover:text-accent-ink sm:min-h-14 sm:border-r sm:border-line sm:px-5" href={workshopPhone}><Icon name="phone" className="size-5 shrink-0 text-accent-ink"/>{business.phone}</a>
      <a className="flex min-h-9 items-center gap-2 transition-colors hover:text-accent-ink sm:min-h-14 sm:px-5" href="#workshop"><Icon name="pin" className="size-5 shrink-0 text-accent-ink"/>{workshopAddress}</a>
    </div>
  </div>;
}

export function WorkshopSection({ children }: { children: React.ReactNode }) {
  return <section id="workshop" className="panel-gap bg-primer speckled py-14 sm:py-20">
    <div className="wrap grid gap-8 md:grid-cols-[1.16fr_0.84fr] md:items-center md:gap-14">
      <div className="space-y-5 md:row-start-1 md:col-start-2">
        <SectionHeading>{children}</SectionHeading>
        <AddressDetails/>
        <div className="font-mono text-xs"><WorkshopStatus/></div>
        <HoursTable/>
      </div>
      <div className="md:row-start-1 md:col-start-1">
        <div className="border border-line shadow-[0_12px_28px_-20px_color-mix(in_oklab,var(--art-ink)_45%,transparent)]"><StreetSketch/></div>
        <details className="workshop-disclosure border border-t-0 border-line bg-paper">
          <summary className="px-4 py-2.5 font-bold text-accent-ink">Show interactive map</summary>
          <GoogleMap address={workshopAddress} title="Map to Second Wind Smash Repairs"/>
        </details>
      </div>
    </div>
  </section>;
}
