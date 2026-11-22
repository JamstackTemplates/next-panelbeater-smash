import { useId } from 'react';
import type { Repair } from '../content/repairs';
import { SprayControl } from './spray-control';
import { CarDrawing, ChipRow } from './workshop-art';
import { Tape } from './workshop-ui';

function RepairArt({ job, before }: { job: Repair; before?: boolean }) {
  return <svg viewBox="0 0 640 304" className="block w-full" fill="none" aria-hidden="true">
    <path d="M0 0H640V236H0z" fill="var(--booth-wall)"/>
    <path d="M0 236h640v68H0z" fill="var(--primer-deep)"/>
    <path d="M0 237h640M0 288h640M0 69h640M0 133h640M90 0v236m460-236v236" stroke="var(--line)" strokeWidth="1.5"/>
    <path d="M34 46h180m206 0h186" stroke="var(--light-tube)" strokeWidth="4" opacity=".6"/>
    <g transform={job.zone === 'front' ? 'translate(627 44) scale(-.96 .96)' : 'translate(13 44) scale(.96)'}>
      <CarDrawing body={job.body} paint={job.paintHex} zone={before ? job.zone : undefined} finish={before ? 'primer' : 'gloss'} animate={!before}/>
    </g>
  </svg>;
}

export function SprayPass({ job }: { job: Repair }) {
  return <SprayControl title={job.title} before={<RepairArt job={job} before/>} after={<RepairArt job={job}/>}/>;
}

export function PaintChip({ job }: { job: Repair }) {
  return <div className="inline-flex max-w-full items-center gap-3 border border-line bg-paper px-3 py-2.5 shadow-[0_2px_8px_-6px_color-mix(in_oklab,var(--art-ink)_45%,transparent)]">
    <span className="paint-swatch relative h-10 w-13 shrink-0 border border-line" style={{ backgroundColor: job.paintHex }} aria-hidden="true">
      <span className="absolute top-1 left-1 size-1.5 rounded-full border border-white/50 bg-paper/90"/>
    </span>
    <div className="leading-snug">
      <span className="block font-mono text-xs font-bold tracking-wide">{job.paintCode}</span>
      <span className="text-sm text-muted">{job.paintName}</span>
    </div>
  </div>;
}

export function JobFacts({ job }: { job: Repair }) {
  return <dl className="grid gap-2 font-mono text-xs leading-relaxed">
    <div><dt className="inline text-muted">Panels</dt> <dd className="inline">{job.panels.join(' · ')}</dd></div>
    <div><dt className="sr-only">Working days</dt><dd>{job.days} working {job.days === 1 ? 'day' : 'days'}</dd></div>
    <div><dt className="sr-only">Insurance claim</dt><dd className="inline-block border border-current px-2 py-0.5 text-accent-ink uppercase">{job.insuranceClaim ? 'Insurance claim' : 'Private repair'}</dd></div>
  </dl>;
}

export function JobSheet({ job }: { job: Repair }) {
  return <article id={job.id} className="scroll-mt-6 panel-gap py-8 sm:py-12">
    <div className="job-grid grid items-center gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
      <div className="min-w-0"><SprayPass job={job}/></div>
      <div className="relative min-w-0 space-y-3 border border-line bg-primer speckled p-5 sm:p-7">
        <Tape>{job.vehicle}</Tape>
        <h2 className="text-2xl sm:text-3xl">{job.title}</h2>
        <JobFacts job={job}/>
        <PaintChip job={job}/>
        <p className="text-muted">{job.story}</p>
      </div>
    </div>
    <div className="mt-6 flex justify-end"><ChipRow/></div>
  </article>;
}

export function RepairHeadArt({ job }: { job: Repair }) {
  const id = useId();
  return <svg viewBox="0 7 640 240" className="block w-full" fill="none" aria-hidden="true">
    <defs><clipPath id={id}><path d="M0 0H335L310 250H0Z"/></clipPath></defs>
    <CarDrawing body={job.body} paint={job.paintHex}/>
    <g clipPath={`url(#${id})`}><CarDrawing body={job.body} paint={job.paintHex} finish="primer" zone={job.zone}/></g>
    <path d="m335 17-22 213" stroke="var(--light-tube)" strokeWidth="5" opacity=".8"/>
    <path d="m266 32 122 12-4 9 3 9-6 10-120-12 4-8-3-8Z" fill="var(--tape)" transform="rotate(-9 322 49)"/>
    <text x="275" y="51" className="svg-label" fontSize="10" fill="var(--tape-ink)" transform="rotate(-3 322 49)">BEFORE ◂ ▸ AFTER</text>
  </svg>;
}
