import React from 'react';
import { ArchiveX, SearchX } from 'lucide-react';
import { t } from '../lib/i18n';
import { Button } from './ui/button';

type EmptyStateProps = {
  hasActiveFilters: boolean;
  hasItems: boolean;
  onResetFilters: () => void;
};

export function EmptyState({ hasActiveFilters, hasItems, onResetFilters }: EmptyStateProps) {
  const Icon = hasItems ? SearchX : ArchiveX;

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon aria-hidden="true" />
      </div>
      <h2>{hasItems ? t('emptyFilteredTitle', 'No matches found') : t('emptyTitle', 'Nothing saved yet')}</h2>
      <p>
        {hasItems
          ? t('emptyFilteredHint', 'Try a different keyword or switch filters.')
          : t('emptyHint', 'Right-click on a page to save text, links, or images.')}
      </p>
      {hasItems && hasActiveFilters ? (
        <Button type="button" variant="ghost" onClick={onResetFilters}>
          {t('resetFilters', 'Reset')}
        </Button>
      ) : null}
    </div>
  );
}
