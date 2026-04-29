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
    <div className="grid h-full min-h-[220px] place-content-center justify-items-center gap-3 px-3 py-6 text-center">
      <div className="grid size-12 place-items-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
        <Icon className="size-6 opacity-80" aria-hidden="true" />
      </div>
      <h2 className="m-0 text-[15px] font-semibold text-zinc-950 transition-colors dark:text-zinc-100">
        {hasItems ? t('emptyFilteredTitle', 'No matches found') : t('emptyTitle', 'Nothing saved yet')}
      </h2>
      <p className="m-0 max-w-[260px] text-xs leading-5 text-zinc-500 transition-colors dark:text-zinc-400">
        {hasItems
          ? t('emptyFilteredHint', 'Try a different keyword or switch filters.')
          : t('emptyHint', 'Right-click on a page to save text, links, or images.')}
      </p>
      {hasItems && hasActiveFilters ? (
        <Button className="mt-1" size="sm" type="button" variant="secondary" onClick={onResetFilters}>
          {t('resetFilters', 'Reset')}
        </Button>
      ) : null}
    </div>
  );
}
