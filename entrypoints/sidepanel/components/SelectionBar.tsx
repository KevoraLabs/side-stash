import React from 'react';
import { Copy, Trash2, X } from 'lucide-react';
import { t } from '../lib/i18n';
import { Button } from './ui/button';

type SelectionBarProps = {
  selectedCount: number;
  visible: boolean;
  onClear: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

export function SelectionBar({ selectedCount, visible, onClear, onCopy, onDelete }: SelectionBarProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2.5 text-zinc-950 shadow-[0_16px_40px_rgba(24,24,27,0.16)] transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)] min-[421px]:left-1/2 min-[421px]:w-[min(420px,calc(100vw-1.5rem))] min-[421px]:-translate-x-1/2">
      <Button
        aria-label={t('clearSelection', 'Clear selection')}
        className="size-8"
        size="icon"
        title={t('clearSelection', 'Clear selection')}
        type="button"
        variant="ghost"
        onClick={onClear}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
      <div className="grid min-w-0 flex-1 gap-0">
        <span className="truncate text-[13px] font-semibold text-zinc-950 transition-colors dark:text-zinc-50">
          {t('selectedCount', '$1 selected', [String(selectedCount)])}
        </span>
        <span className="truncate text-[11px] font-medium text-zinc-500 transition-colors dark:text-zinc-400">{t('selectionHint', 'Ready for bulk actions')}</span>
      </div>
      <div className="flex shrink-0 gap-1.5">
        <Button size="sm" type="button" variant="primary" onClick={onCopy}>
          <Copy className="size-3.5" aria-hidden="true" />
          {t('copySelected', 'Copy')}
        </Button>
        <Button size="sm" type="button" variant="danger" onClick={onDelete}>
          <Trash2 className="size-3.5" aria-hidden="true" />
          {t('deleteSelected', 'Delete')}
        </Button>
      </div>
    </div>
  );
}
