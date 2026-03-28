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
    <div className="grid justify-items-center gap-3 rounded-[24px] border border-dashed border-slate-300/80 bg-white/74 px-5 py-12 text-center shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      <div className="grid size-14 place-items-center rounded-[18px] bg-blue-50 text-blue-700">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h2 className="m-0 text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
        {hasItems ? t('emptyFilteredTitle', 'No matches found') : t('emptyTitle', 'Nothing saved yet')}
      </h2>
      <p className="m-0 max-w-[260px] text-[13px] leading-6 text-slate-500">
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
