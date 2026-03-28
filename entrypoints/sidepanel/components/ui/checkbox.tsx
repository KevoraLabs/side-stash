import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn';

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

export function Checkbox({ className = '', ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'grid size-[18px] shrink-0 place-items-center rounded-md border border-blue-300/80 bg-white text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] outline-none transition data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=indeterminate]:border-blue-600 data-[state=indeterminate]:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-blue-500/12',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-items-center [&_svg]:size-[13px]">
        <Check aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
