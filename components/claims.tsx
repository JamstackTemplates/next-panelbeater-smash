import type { ReactNode } from 'react';
import { PrintButton } from './print-button';
import { RoadsideArt } from './workshop-art';
import { SectionHeading, Tape } from './workshop-ui';

export function SceneChecklist({ title, action, children }: { title: ReactNode; action: ReactNode; children: ReactNode }) {
  return <section className="wrap print-block grid items-center gap-8 py-12 sm:py-17 lg:grid-cols-[1.26fr_1fr]">
    <div className="notepad relative py-6 pr-5 pl-12 sm:py-8 sm:pr-8 sm:pl-14">
      <h2 className="mb-4"><Tape className="text-sm!">{title}</Tape></h2>
      <ul className="space-y-3">{children}</ul>
      <PrintButton>{action}</PrintButton>
    </div>
    <div className="print-hide"><RoadsideArt/></div>
  </section>;
}

export function ChecklistItem({ children }: { children: ReactNode }) {
  return <li className="flex items-baseline gap-3">
    <span aria-hidden="true" className="relative top-[2px] size-3.5 shrink-0 border border-current text-accent-ink print:text-black"/>
    <span>{children}</span>
  </li>;
}

export function ClaimTimeline({ title, children, disclaimer }: { title: ReactNode; children: ReactNode; disclaimer: ReactNode }) {
  return <section className="print-block panel-gap bg-primer speckled py-14 sm:py-20">
    <div className="wrap">
      <SectionHeading className="mb-7 md:text-center">{title}</SectionHeading>
      <ol className="claim-steps ml-5 grid border-l border-line md:ml-0 md:border-l-0 md:bg-[linear-gradient(to_right,transparent_calc(50%-1px),var(--line)_calc(50%-1px),var(--line)_calc(50%+1px),transparent_calc(50%+1px))]">
        {children}
      </ol>
      <p className="mx-auto mt-7 max-w-3xl border border-line bg-paper px-4 py-3 text-sm text-muted">{disclaimer}</p>
    </div>
  </section>;
}

export function ClaimStep({ number, title, children }: { number: number; title: ReactNode; children: ReactNode }) {
  return <li className="group relative grid grid-cols-[2.4rem_1fr] gap-3 py-3 pl-3 md:grid-cols-[1fr_5rem_1fr] md:items-start md:gap-5 md:pl-0">
    <span className="step-number display col-start-1 row-start-1 bg-primer text-4xl text-accent-ink md:col-start-2 md:border-y md:border-line md:py-1.5 md:text-center md:text-6xl">{number}</span>
    <div className="col-start-2 row-start-1 md:col-start-3 md:max-w-md md:group-odd:col-start-1 md:group-odd:justify-self-end md:group-odd:text-right">
      <h3 className="mb-2 text-xl md:text-2xl">{title}</h3>
      <p className="text-muted">{children}</p>
    </div>
  </li>;
}

export function Responsibility({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <div className="space-y-3 border border-line bg-primer p-6 last:bg-primary last:text-white sm:p-9">
    <h3 className="text-2xl">{title}</h3>
    <p className="max-w-lg">{children}</p>
  </div>;
}

export function PolicyQuestion({ question, children }: { question: ReactNode; children: ReactNode }) {
  return <details className="workshop-disclosure panel-gap">
    <summary className="py-3.5 text-lg font-bold transition-colors hover:text-accent-ink">{question}</summary>
    <p className="max-w-3xl pb-4 pl-7 text-muted">{children}</p>
  </details>;
}
