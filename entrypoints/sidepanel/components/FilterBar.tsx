import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/cn';
import { t } from '../lib/i18n';
import type { ItemFilter } from '../types';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Button } from './ui/button';

type FilterBarProps = {
  activeFilter: ItemFilter;
  allFilteredSelected: boolean;
  filteredCount: number;
  hasActiveFilters: boolean;
  hasFilteredItems: boolean;
  hasPartialSelection: boolean;
  query: string;
  selectedCount: number;
  statusMessage: string;
  onClearQuery: () => void;
  onClearSelection: () => void;
  onFilterChange: (filter: ItemFilter) => void;
  onQueryChange: (value: string) => void;
  onResetFilters: () => void;
  onToggleSelectAll: (checked: boolean) => void;
};

const FILTERS: ItemFilter[] = ['all', 'text', 'link', 'image'];

export function FilterBar({
  activeFilter,
  allFilteredSelected,
  filteredCount,
  hasActiveFilters,
  hasFilteredItems,
  hasPartialSelection,
  query,
  selectedCount,
  statusMessage,
  onClearQuery,
  onClearSelection,
  onFilterChange,
  onQueryChange,
  onResetFilters,
  onToggleSelectAll,
}: FilterBarProps) {
  return (
    <section className="grid gap-3 rounded-[22px] border border-slate-200/80 bg-white/78 p-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="w-full">
        <div className="mb-2 flex flex-col gap-2 min-[421px]:flex-row min-[421px]:items-start min-[421px]:justify-between">
          <div className="grid min-w-0 gap-0.5">
            <span className="text-[12px] font-semibold tracking-[0.1em] text-slate-950 uppercase">
              {t('searchTitle', 'Search stash')}
            </span>
            <span className="text-[12px] leading-5 text-slate-500">
              {t('searchHint', 'Search content, title, source, or URL')}
            </span>
          </div>
          {query ? (
            <span className="inline-flex h-6 items-center rounded-full bg-blue-50 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-blue-700 uppercase">
              {t('searchActive', 'Filtering')}
            </span>
          ) : null}
        </div>
        <label className="group flex min-h-[88px] w-full items-center gap-3 rounded-[24px] border border-blue-200/40 bg-linear-to-b from-white via-slate-50 to-blue-50/70 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_12px_24px_rgba(15,23,42,0.04)] transition focus-within:border-blue-300 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_0_0_4px_rgba(59,130,246,0.08),0_18px_32px_rgba(37,99,235,0.12)]">
          <span className="grid size-11 shrink-0 place-items-center rounded-[18px] bg-blue-600/10 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <Search className="size-[18px]" aria-hidden="true" />
          </span>
          <span className="grid min-w-0 flex-1 gap-1">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
              {query
                ? t('searchKickerActive', 'Matching content and source')
                : t('searchKicker', 'Type to narrow instantly')}
            </span>
            <Input
              aria-label={t('searchLabel', 'Search saved items')}
              className="h-auto border-0 bg-transparent p-0 text-[17px] leading-6 font-semibold text-slate-950 shadow-none ring-0 placeholder:text-slate-400 focus-visible:ring-0"
              placeholder={t('filterPlaceholder', 'Filter by URL or keyword')}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </span>
          {query ? (
            <Button
              aria-label={t('filterClear', 'Clear')}
              className="size-9 rounded-[14px] border-transparent bg-slate-200/55 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              size="icon"
              type="button"
              variant="ghost"
              onClick={onClearQuery}
            >
              <X aria-hidden="true" />
            </Button>
          ) : null}
        </label>
      </div>

      <div
        aria-label={t('filterGroupLabel', 'Filter by type')}
        className="flex flex-wrap gap-2"
        role="group"
      >
        {FILTERS.map((filter) => {
          const label =
            filter === 'all'
              ? t('filterAll', 'All')
              : filter === 'text'
                ? t('filterText', 'Text')
                : filter === 'link'
                  ? t('filterLink', 'Link')
                  : t('filterImage', 'Image');

          return (
            <button
              key={filter}
              aria-pressed={activeFilter === filter}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[12px] font-semibold tracking-[-0.01em] transition',
                activeFilter === filter
                  ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-[0_8px_18px_rgba(37,99,235,0.10)]'
                  : 'border-slate-200/80 bg-white/72 text-slate-500 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700',
              )}
              type="button"
              onClick={() => onFilterChange(filter)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 min-[421px]:flex-row min-[421px]:items-center min-[421px]:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <label
            className={cn(
              'inline-flex items-center gap-2.5 text-[12px] font-semibold text-slate-600',
              !hasFilteredItems && 'opacity-55',
            )}
          >
            <Checkbox
              checked={allFilteredSelected ? true : hasPartialSelection ? 'indeterminate' : false}
              disabled={!hasFilteredItems}
              onCheckedChange={(checked) => onToggleSelectAll(checked === true)}
            />
            <span>{t('selectAll', 'Select all')}</span>
          </label>
          <span className="text-[12px] text-slate-400">
            {t('shownCount', '$1 shown', [String(filteredCount)])}
          </span>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          {hasActiveFilters ? (
            <Button size="sm" type="button" variant="ghost" onClick={onResetFilters}>
              {t('resetFilters', 'Reset')}
            </Button>
          ) : null}
          {selectedCount > 0 ? (
            <Button size="sm" type="button" variant="ghost" onClick={onClearSelection}>
              {t('clearSelection', 'Clear selection')}
            </Button>
          ) : null}
          <span
            className={cn(
              'max-w-[160px] truncate text-[12px] text-blue-700 transition-opacity',
              statusMessage ? 'opacity-100' : 'opacity-0',
            )}
            aria-live="polite"
          >
            {statusMessage}
          </span>
        </div>
      </div>
    </section>
  );
}
