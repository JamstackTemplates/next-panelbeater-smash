'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export function SprayControl({ title, before, after }: { title: string; before: ReactNode; after: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [swept, setSwept] = useState(false);
  const [position, setPosition] = useState(52);
  useEffect(() => {
    setLive(true);
    if (!frame.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSwept(true);
        observer.disconnect();
      }
    }, { threshold: .35 });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={frame} className="spray-frame border border-line bg-primer speckled shadow-[0_14px_32px_-20px_color-mix(in_oklab,var(--art-ink)_55%,transparent)]" data-live={live} data-swept={swept}
    style={{ '--position': `${position}%` } as CSSProperties}>
    <div className="spray-art">
      <div className="spray-before">{before}</div><div className="spray-after">{after}</div>
    </div>
    <div className="spray-captions pointer-events-none grid grid-cols-2 border-t border-line py-2 text-center font-mono text-[.68rem] font-semibold tracking-wider uppercase">
      <span>Before</span><span>After</span>
    </div>
    {live && <>
      <span className="pointer-events-none absolute top-2.5 left-2.5 z-1 border border-line bg-paper/90 px-2 py-0.5 font-mono text-[.62rem] font-semibold tracking-wider text-ink uppercase" aria-hidden="true">Before · Primer</span>
      <span className="pointer-events-none absolute top-2.5 right-2.5 z-1 border border-line bg-paper/90 px-2 py-0.5 font-mono text-[.62rem] font-semibold tracking-wider text-accent-ink uppercase" aria-hidden="true">After · Gloss</span>
      <div className="spray-divider pointer-events-none absolute inset-y-0 z-1 w-0.5 -translate-x-1/2 bg-tape" style={{ left: 'var(--position)' }} aria-hidden="true"/>
      <span className="tape pointer-events-none absolute top-1/2 z-2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap" style={{ left: 'clamp(5rem, var(--position), 100% - 5rem)' }} aria-hidden="true">
        Before ◂ ▸ After
      </span>
      <input type="range" min="0" max="100" step="1" value={position}
        aria-label={`Compare before and after for ${title}`} aria-valuetext={`${position}% before, ${100 - position}% after`}
        onChange={event => setPosition(event.currentTarget.valueAsNumber)}/>
    </>}
  </div>;
}
