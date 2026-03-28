import React from 'react';
import { Copy, Trash2 } from 'lucide-react';
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
    <div className="fixed inset-x-3.5 bottom-3.5 z-40 flex flex-col gap-3 rounded-[20px] border border-slate-800/10 bg-slate-950/96 p-3 text-slate-50 shadow-[0_24px_48px_rgba(15,23,42,0.28)] backdrop-blur-xl min-[421px]:flex-row min-[421px]:items-center min-[421px]:justify-between">
      <div className="grid gap-0.5">
        <span className="text-[13px] font-semibold tracking-[-0.01em]">
          {t('selectedCount', '$1 selected', [String(selectedCount)])}
        </span>
        <span className="text-[11px] text-slate-300/75">{t('selectionHint', 'Ready for bulk actions')}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={onClear}>
          {t('clearSelection', 'Clear selection')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCopy}>
          <Copy aria-hidden="true" />
          {t('copySelected', 'Copy')}
        </Button>
        <Button type="button" variant="danger" onClick={onDelete}>
          <Trash2 aria-hidden="true" />
          {t('deleteSelected', 'Delete')}
        </Button>
      </div>
    </div>
  );
}
