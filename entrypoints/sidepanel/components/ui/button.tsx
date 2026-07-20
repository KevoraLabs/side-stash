import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  size?: 'default' | 'icon' | 'sm';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

export function Button({
  asChild = false,
  children,
  className = '',
  size = 'default',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const classes = cn(
    'inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-zinc-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 [&_svg]:size-4 active:scale-[0.98]',
    size === 'default' && 'h-10 px-4',
    size === 'sm' && 'h-8 px-3 text-xs',
    size === 'icon' && 'size-8 p-0',
    variant === 'primary' &&
      'bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white',
    variant === 'secondary' &&
      'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white',
    variant === 'ghost' &&
      'bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white',
    variant === 'danger' &&
      'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-200 dark:hover:bg-red-900/60',
    className,
  );

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}
