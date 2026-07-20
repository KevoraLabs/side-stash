import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../lib/cn';

type ToastType = 'success' | 'warning' | 'error' | 'info';

type StatusToastProps = {
  message: string;
  type?: ToastType;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function StatusToast({ message, type = 'success', action }: StatusToastProps) {
  if (!message) {
    return null;
  }

  const iconMap = {
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info,
  };

  const styleMap = {
    success:
      'border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100',
    warning:
      'border-amber-200/80 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-zinc-950 dark:text-amber-200',
    error:
      'border-red-200/80 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-zinc-950 dark:text-red-200',
    info:
      'border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100',
  };

  const iconColorMap = {
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-zinc-500 dark:text-zinc-400',
  };

  const IconComponent = iconMap[type] || CheckCircle2;

  return (
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-auto fixed inset-x-3 bottom-3 z-50 mx-auto flex w-[min(420px,calc(100vw-1.5rem))] items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium shadow-[0_8px_30px_rgba(24,24,27,0.08)]',
        styleMap[type] || styleMap.success,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <IconComponent className={cn('size-4 shrink-0', iconColorMap[type])} aria-hidden="true" />
        <span className="min-w-0 truncate">{message}</span>
      </div>
      {action ? (
        <button
          className="ml-1 shrink-0 cursor-pointer rounded-md px-2 py-1 text-[11px] font-semibold text-zinc-900 underline-offset-2 transition-colors hover:bg-zinc-100 hover:underline dark:text-zinc-100 dark:hover:bg-zinc-800"
          type="button"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
