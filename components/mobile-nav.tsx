'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from './workshop-art';

export function MobileNav({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  return <details ref={menu} className="relative min-[950px]:hidden" onKeyDown={event => {
    if (event.key === 'Escape' && menu.current?.open) {
      menu.current.open = false;
      menu.current.querySelector('summary')?.focus();
    }
  }}>
    <summary className="grid size-10 list-none place-items-center rounded-ui border border-line [&::-webkit-details-marker]:hidden" aria-label="Menu"><Icon name="menu"/></summary>
    <nav aria-label="Main" className="absolute top-[calc(100%+.9rem)] right-0 grid w-57 border border-line bg-paper px-4 py-2 shadow-lg">
      {children}
    </nav>
  </details>;
}
