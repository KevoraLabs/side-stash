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
    <div className="selection-bar is-visible">
      <div className="selection-bar-copy">
        <span className="selection-bar-label">
          {t('selectedCount', '$1 selected', [String(selectedCount)])}
        </span>
        <span className="selection-bar-hint">
          {t('selectionHint', 'Ready for bulk actions')}
        </span>
      </div>
      <div className="selection-bar-actions">
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
