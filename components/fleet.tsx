import type { ReactNode } from 'react';
import { baySign, type CourtesyCar } from '../content/courtesy-cars';
import { CarView, Icon, TopCar } from './workshop-art';
import { SectionHeading } from './workshop-ui';

function BaySign({ car }: { car: CourtesyCar }) {
  return <span data-available={car.available} className="bay-sign mt-1.5 inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[.69rem] font-semibold tracking-tight whitespace-nowrap uppercase">
    <span className="size-1.5 rounded-full bg-current" aria-hidden="true"/>{baySign(car)}
  </span>;
}

export function Fleet({ cars, overhead = false }: { cars: readonly CourtesyCar[]; overhead?: boolean }) {
  return <ul aria-label="Courtesy car fleet" className={`grid gap-x-2 gap-y-5 ${overhead ? 'grid-cols-2 min-[680px]:grid-cols-5' : 'sm:grid-cols-2 xl:grid-cols-5'}`}>
    {cars.map((car, index) => <li key={car.id} id={overhead ? undefined : car.id} className="min-w-0">
      <div className={`painted-bay relative grid min-w-0 justify-items-center gap-2 bg-primer-deep speckled p-3 ${overhead ? 'min-h-42' : 'min-h-36'}`}>
        <span className="absolute top-2 left-2.5 font-mono text-xs font-semibold text-ink">{overhead ? String(index + 1).padStart(2, '0') : `BAY ${String(index + 1).padStart(2, '0')}`}</span>
        <div className={overhead ? 'mx-auto mt-1 w-[49%] max-w-23' : 'mx-auto mt-4 w-full max-w-72'}>
          {overhead ? <TopCar body={car.body} paint={car.colourHex}/> : <CarView body={car.body} paint={car.colourHex}/>}
        </div>
        {overhead && <div className="mb-1 self-end text-center"><p className="font-bold leading-none">{car.name}</p><BaySign car={car}/></div>}
      </div>
      {!overhead && <div className="space-y-2 border border-t-0 border-line bg-paper px-4 py-4 xl:px-3">
        <div className="flex flex-wrap items-center justify-between gap-x-3">
          <h2 className="pt-1 text-xl xl:text-lg">{car.name}</h2><BaySign car={car}/>
        </div>
        <ul className="flex flex-wrap gap-1.5 font-mono text-[.68rem]" aria-label="Car specifications">
          {[`${car.seats} seats`, car.transmission, car.fuel, car.towBar ? 'Tow bar' : 'No tow bar'].map(spec => <li key={spec} className="border border-line bg-primer px-2 py-1 capitalize">{spec}</li>)}
        </ul>
        <p className="text-muted">{car.note}</p>
      </div>}
    </li>)}
  </ul>;
}

export function KeyTag({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <section className="panel-gap bg-primer speckled py-14 sm:py-20">
    <div className="wrap max-w-[60rem]">
      <div className="relative isolate mx-auto grid gap-5 py-9 pr-7 pl-12 before:absolute before:inset-0 before:-z-10 before:bg-tape before:[clip-path:polygon(0_17%,9%_0,100%_0,100%_100%,9%_100%,0_83%)] sm:grid-cols-[.66fr_1fr] sm:items-center sm:gap-10 sm:px-15 sm:py-12">
        <span className="absolute top-1/2 left-3 size-4 -translate-y-1/2 rounded-full border-[3px] border-masking bg-primer sm:left-5 sm:size-5" aria-hidden="true"/>
        <div className="space-y-3 text-tape-ink"><Icon name="key" className="size-10"/><SectionHeading>{title}</SectionHeading></div>
        <div className="space-y-3 text-tape-ink">{children}</div>
      </div>
    </div>
  </section>;
}
