'use client';

import { useEffect, useState, type ReactNode } from 'react';

export function PrintButton({ children }: { children: ReactNode }) {
  const [canPrint, setCanPrint] = useState(false);
  useEffect(() => setCanPrint(typeof window.print === 'function'), []);
  return canPrint ? <button type="button" className="button button-quiet mt-4 print-hide" onClick={() => window.print()}>{children}</button> : null;
}
