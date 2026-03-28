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

        <p className="m-0 rounded-[16px] border border-slate-200/80 bg-slate-50 px-3.5 py-3 text-[13px] leading-5 text-slate-700 break-words">
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
