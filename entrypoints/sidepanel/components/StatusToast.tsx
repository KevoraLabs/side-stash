import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/cn';

type StatusToastProps = {
  message: string;
  raised: boolean;
};

export function StatusToast({ message, raised }: StatusToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className={cn(
        'fixed inset-x-3 z-50 mx-auto flex w-[min(420px,calc(100vw-1.5rem))] items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-sky-800 shadow-[0_12px_32px_rgba(2,132,199,0.18)] transition-colors dark:border-sky-900/70 dark:bg-zinc-950 dark:text-sky-200',
        raised ? 'bottom-[98px]' : 'bottom-3',
      )}
    >
      <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
      <span className="min-w-0 truncate">{message}</span>
    </div>
  );
}
