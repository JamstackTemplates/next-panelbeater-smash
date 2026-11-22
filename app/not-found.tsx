import { SiteLink } from '../components/site-link';
import { CarView } from '../components/workshop-art';
import { Lede, Tape } from '../components/workshop-ui';

export default function NotFound() {
  return <section className="panel-gap bg-primer speckled py-14 sm:py-22">
    <div className="wrap grid items-center gap-10 md:grid-cols-[.85fr_1.15fr]">
      <div className="space-y-5">
        <h1 className="text-[clamp(3.1rem,6.7vw,6.5rem)]">This panel’s <span className="text-accent-ink">missing.</span></h1>
        <Lede>The page you wanted has been taken off for repair.</Lede>
        <div className="flex flex-wrap gap-3">
          <SiteLink className="tape" href="/">Home</SiteLink>
          <SiteLink className="tape" href="/repairs/">Repairs</SiteLink>
          <SiteLink className="tape" href="/contact/">Contact</SiteLink>
        </div>
      </div>
      <figure className="border border-line bg-primer-deep p-4 sm:p-8">
        <CarView body="hatch" paint="#1C5A78" missingDoor/>
        <figcaption className="mt-3 text-center"><Tape>Panel off for repair</Tape></figcaption>
      </figure>
    </div>
  </section>;
}
