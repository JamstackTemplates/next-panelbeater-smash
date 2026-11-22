'use client';

import { useEffect, useState } from 'react';
import { neutralHours, openingLabel, type Closures, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

export function OpenBadge({ hours, timeZone, closures }: { hours: readonly OpeningHours[]; timeZone: string; closures?: Closures }) {
  const [label, setLabel] = useState(neutralHours);
  const zone = site.timeZone || timeZone;
  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, zone, new Date(), closures));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, zone, closures]);
  return <span>{label}</span>;
}
