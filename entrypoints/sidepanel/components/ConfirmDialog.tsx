import React from 'react';
import { t } from '../lib/i18n';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type ConfirmDialogProps = {
  description: string;
  open: boolean;
  title: string;
  value: string;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
};

export function ConfirmDialog({
  description,
  open,
  title,
  value,
  onConfirm,
  onOpenChange,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <p className="m-0 break-words rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs leading-relaxed text-zinc-700 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          {value}
        </p>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {t('confirmCancel', 'Cancel')}
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            {t('actionDelete', 'Delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
