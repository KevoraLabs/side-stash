import React, { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className = '', ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full min-w-0 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500',
        className,
      )}
      {...props}
    />
  );
});
