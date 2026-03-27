import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

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
  const classes = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}
