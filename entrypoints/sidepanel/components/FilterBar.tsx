import React from 'react';
import type { RefObject } from 'react';
import { FileText, Image as ImageIcon, Link2, ListFilter, Search, X } from 'lucide-react';
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
  searchInputRef: RefObject<HTMLInputElement | null>;
  selectedCount: number;
  onClearQuery: () => void;
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
  searchInputRef,
  selectedCount,
  onClearQuery,
  onFilterChange,
  onQueryChange,
  onResetFilters,
  onToggleSelectAll,
}: FilterBarProps) {
  return (
    <section className="mb-0 grid gap-3">
      <label className="relative block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400 transition-colors" aria-hidden="true" />
        <Input
          ref={searchInputRef}
          aria-label={t('searchLabel', 'Search saved items')}
          className="h-10 pl-9 pr-16"
          placeholder={t('filterPlaceholder', 'Search snippets...')}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {!query ? (
          <span className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 min-[360px]:inline-flex">
            /
          </span>
        ) : null}
        {query ? (
          <Button
            aria-label={t('filterClear', 'Clear')}
            className="absolute top-1/2 right-1 -translate-y-1/2 size-8"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onClearQuery}
          >
            <X className="size-3.5" aria-hidden="true" />
          </Button>
        ) : null}
      </label>

      <div
        aria-label={t('filterGroupLabel', 'Filter by type')}
        className="grid grid-cols-4 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
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
          const Icon =
            filter === 'all'
              ? ListFilter
              : filter === 'text'
                ? FileText
                : filter === 'link'
                  ? Link2
                  : ImageIcon;

          return (
            <button
              key={filter}
              aria-pressed={activeFilter === filter}
              className={cn(
                'inline-flex h-7 min-w-0 items-center justify-center gap-1 rounded-md px-1.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-sky-500/30',
                activeFilter === filter
                  ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-950 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100',
              )}
              type="button"
              onClick={() => onFilterChange(filter)}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-8 items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-500 transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        <label
          className={cn('inline-flex min-w-0 items-center gap-2 font-medium cursor-pointer group', !hasFilteredItems && 'opacity-50 pointer-events-none')}
        >
          <Checkbox
            checked={allFilteredSelected ? true : hasPartialSelection ? 'indeterminate' : false}
            disabled={!hasFilteredItems}
            onCheckedChange={(checked) => onToggleSelectAll(checked === true)}
          />
          <span className="truncate group-hover:text-zinc-950 dark:group-hover:text-zinc-100">{t('selectAll', 'Select all')}</span>
          {selectedCount > 0 ? (
            <span className="rounded-full bg-sky-50 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
              {selectedCount}
            </span>
          ) : null}
        </label>
        <span className="shrink-0 text-xs font-medium text-zinc-500 transition-colors dark:text-zinc-400">
          {t('shownCount', '$1 shown', [String(filteredCount)])}
        </span>
      </div>
    </section>
  );
}
