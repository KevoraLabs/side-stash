import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React, { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { cn } from '../../lib/cn';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className = '', ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-30 bg-slate-950/42 backdrop-blur-[6px]', className)}
      {...props}
    />
  );
});

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(function DialogContent({ children, className = '', ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed top-1/2 left-1/2 z-[31] w-[min(calc(100vw-28px),360px)] max-h-[calc(100vh-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[22px] border border-slate-200/80 bg-white p-[18px] shadow-[0_24px_48px_rgba(15,23,42,0.18)] outline-none',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute top-3 right-3 grid size-8 place-items-center rounded-[10px] border border-transparent bg-transparent text-slate-400 outline-none transition hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-4 focus-visible:ring-blue-500/12"
          type="button"
        >
          <X aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

export const DialogHeader = ({
  children,
  className = '',
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('mb-3 grid gap-1.5', className)} {...props}>
    {children}
  </div>
);

export const DialogFooter = ({
  children,
  className = '',
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('mt-3.5 flex justify-end gap-2', className)} {...props}>
    {children}
  </div>
);

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className = '', ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('m-0 text-[18px] font-semibold tracking-[-0.03em] text-slate-950', className)}
      {...props}
    />
  );
});

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className = '', ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('m-0 text-[13px] leading-5 text-slate-500', className)}
      {...props}
    />
  );
});
