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
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border text-[13px] font-semibold tracking-[-0.01em] transition outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-blue-500/12 [&_svg]:size-4',
    size === 'default' && 'h-10 px-3.5',
    size === 'sm' && 'h-8 px-3 text-[12px]',
    size === 'icon' && 'size-9 rounded-[14px] p-0',
    variant === 'primary' &&
      'border-blue-700 bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.24)] hover:border-blue-600 hover:bg-blue-500',
    variant === 'secondary' &&
      'border-white/10 bg-white/10 text-white hover:border-white/15 hover:bg-white/16',
    variant === 'ghost' &&
      'border-slate-200/80 bg-white/72 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700',
    variant === 'danger' &&
      'border-red-600 bg-red-500 text-white shadow-[0_10px_22px_rgba(239,68,68,0.22)] hover:border-red-500 hover:bg-red-400',
    className,
  );

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}
