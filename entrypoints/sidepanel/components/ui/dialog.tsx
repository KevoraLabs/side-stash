import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React, { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

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
      className={['ui-dialog-overlay', className].filter(Boolean).join(' ')}
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
        className={['ui-dialog-content', className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ui-dialog-close" type="button">
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
  <div className={['ui-dialog-header', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);

export const DialogFooter = ({
  children,
  className = '',
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={['ui-dialog-footer', className].filter(Boolean).join(' ')} {...props}>
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
      className={['ui-dialog-title', className].filter(Boolean).join(' ')}
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
      className={['ui-dialog-description', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
});
