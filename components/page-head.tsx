import type { ReactNode } from 'react';
import { Tape } from './workshop-ui';

function Heading({ children }: { children: ReactNode }) {
  return <h1 className="max-w-[19ch] text-[clamp(2.65rem,5.25vw,5.65rem)]">{children}</h1>;
}

function PageHeadBand({ art, children }: { art: ReactNode; children: ReactNode }) {
  return <header className="overflow-hidden bg-primer booth-wash panel-gap print-hide">
    <div className="wrap relative isolate grid min-h-[17rem] items-center gap-3 sm:grid-cols-[1.3fr_0.8fr] md:min-h-[22rem]">
      <div className="z-10 space-y-4 pt-9 pb-3 sm:py-12">{children}</div>
      <div className="pointer-events-none relative -mr-[6vw] -mb-3 ml-auto w-[min(82%,22rem)] sm:absolute sm:right-0 sm:bottom-0 sm:w-[44%] lg:w-[45%]" aria-hidden="true">{art}</div>
    </div>
  </header>;
}

export const PageHead = Object.assign(PageHeadBand, { Label: Tape, Heading });
