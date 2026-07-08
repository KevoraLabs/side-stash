import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../lib/cn';

type ToastType = 'success' | 'warning' | 'error' | 'info';

type StatusToastProps = {
  message: string;
  type?: ToastType;
  raised: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function StatusToast({ message, type = 'success', raised, action }: StatusToastProps) {
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
    success: 'border-emerald-200 bg-emerald-50/95 text-emerald-800 shadow-[0_12px_32px_rgba(16,185,129,0.18)] dark:border-emerald-900/50 dark:bg-zinc-950 dark:text-emerald-300',
    warning: 'border-amber-200 bg-amber-50/95 text-amber-800 shadow-[0_12px_32px_rgba(245,158,11,0.18)] dark:border-amber-900/50 dark:bg-zinc-950 dark:text-amber-300',
    error: 'border-red-200 bg-red-50/95 text-red-800 shadow-[0_12px_32px_rgba(239,68,68,0.18)] dark:border-red-900/50 dark:bg-zinc-950 dark:text-red-300',
    info: 'border-zinc-200 bg-zinc-50/95 text-zinc-800 shadow-[0_12px_32px_rgba(113,113,122,0.18)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300',
  };

  const iconColorMap = {
    success: 'text-emerald-500 dark:text-emerald-400',
    warning: 'text-amber-500 dark:text-amber-400',
    error: 'text-red-500 dark:text-red-400',
    info: 'text-zinc-500 dark:text-zinc-400',
  };

  const actionButtonMap = {
    success: 'text-emerald-600 hover:bg-emerald-100/50 dark:text-emerald-400 dark:hover:bg-zinc-900',
    warning: 'text-amber-600 hover:bg-amber-100/50 dark:text-amber-400 dark:hover:bg-zinc-900',
    error: 'text-red-600 hover:bg-red-100/50 dark:text-red-400 dark:hover:bg-zinc-900',
    info: 'text-zinc-600 hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:bg-zinc-900',
  };

  const IconComponent = iconMap[type] || CheckCircle2;
  const cardStyle = styleMap[type] || styleMap.success;
  const iconColor = iconColorMap[type] || iconColorMap.success;
  const actionButtonStyle = actionButtonMap[type] || actionButtonMap.success;

  return (
    <div
      aria-live="polite"
      className={cn(
        'fixed inset-x-3 z-50 mx-auto flex w-[min(420px,calc(100vw-1.5rem))] items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-300',
        cardStyle,
        raised ? 'bottom-[98px]' : 'bottom-3',
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <IconComponent className={cn('size-4 shrink-0', iconColor)} aria-hidden="true" />
        <span className="min-w-0 truncate">{message}</span>
      </div>
      {action ? (
        <button
          className={cn(
            'ml-2 shrink-0 cursor-pointer rounded px-2 py-1 text-[11px] font-bold transition-colors active:translate-y-px',
            actionButtonStyle
          )}
          type="button"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
