'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { filterRepairs, type Damage, type Repair } from '../content/repairs';

type Filter = Damage | 'all';

export function RepairFilter({ jobs, options }: {
  jobs: readonly (Pick<Repair, 'id' | 'damage'> & { sheet: ReactNode })[];
  options: readonly { id: Filter; label: ReactNode }[];
}) {
  const [live, setLive] = useState(false);
  const [active, setActive] = useState<Filter>('all');
  useEffect(() => {
    setLive(true);
  }, []);

  const count = filterRepairs(jobs, active).length;
  return <>
    {live && <div className="flex flex-wrap items-center justify-between gap-4 py-7">
      <div className="flex flex-wrap gap-2" aria-label="Filter by damage type" role="group">
        {options.map(({ id, label }) => <button type="button" className="tape repair-toggle" aria-pressed={active === id} key={id} onClick={() => setActive(id)}>{label}</button>)}
      </div>
      <p role="status" className="font-mono text-sm text-muted">{count} {count === 1 ? 'repair' : 'repairs'}</p>
    </div>}
    <div className={live ? '' : 'pt-8'}>
      {jobs.map(job => <div className="job-shell" key={job.id} hidden={active !== 'all' && active !== job.damage}>{job.sheet}</div>)}
    </div>
  </>;
}
