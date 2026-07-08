import React from 'react';
import type { RefObject } from 'react';
import { ChevronDown, Copy, FileText, Globe, Image as ImageIcon, Link2, ListFilter, Scissors, Search, Trash2, X } from 'lucide-react';
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
  hasFilteredItems: boolean;
  hasPartialSelection: boolean;
  query: string;
  searchInputRef: RefObject<HTMLInputElement | null>;
  selectedCount: number;
  onClearQuery: () => void;
  onFilterChange: (filter: ItemFilter) => void;
  onQueryChange: (value: string) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onCopy: () => void;
  onCut: () => void;
  onDelete: () => void;
  // Language Selector Props
  languageSelectValue: string;
  resolvedLocaleLabel: string;
  onLanguageChange: (value: any) => void;
};

const FILTERS: ItemFilter[] = ['all', 'text', 'link', 'image'];

export function FilterBar({
  activeFilter,
  allFilteredSelected,
  filteredCount,
  hasFilteredItems,
  hasPartialSelection,
  query,
  searchInputRef,
  selectedCount,
  onClearQuery,
  onFilterChange,
  onQueryChange,
  onToggleSelectAll,
  onCopy,
  onCut,
  onDelete,
  languageSelectValue,
  resolvedLocaleLabel,
  onLanguageChange,
}: FilterBarProps) {
  return (
    <section className="mb-0 grid gap-3">
      <div className="flex items-center gap-2">
        <label className="relative block flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400 transition-colors" aria-hidden="true" />
          <Input
            ref={searchInputRef}
            aria-label={t('searchLabel', 'Search saved items')}
            className="h-10 pl-9 pr-10"
            placeholder={t('filterPlaceholder', 'Search snippets...')}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
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

        <label className="relative block shrink-0" title={resolvedLocaleLabel}>
          <Globe className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-zinc-400 transition-colors" aria-hidden="true" />
          <select
            aria-label={t('languageLabel', 'Language')}
            className="h-10 w-[96px] appearance-none rounded-lg border border-zinc-200 bg-white pr-6 pl-7 text-left text-xs font-medium text-zinc-700 outline-none transition-colors hover:bg-zinc-50 focus:ring-2 focus:ring-sky-500/25 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            value={languageSelectValue}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            <option value="auto">{t('languageAuto', 'Auto')}</option>
            <option value="en">English</option>
            <option value="zh_CN">简体中文</option>
            <option value="zh_TW">繁體中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="pt_BR">Português</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-zinc-400 transition-colors" aria-hidden="true" />
        </label>
      </div>



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

      <div className="flex h-9 items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-2.5 py-0 text-xs text-zinc-500 transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
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
        {selectedCount > 0 ? (
          <div className="flex shrink-0 items-center gap-0.5 animate-in fade-in duration-200">
            <Button
              aria-label={t('copySelected', 'Copy')}
              className="h-6 px-1.5 gap-1 text-[11px] text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              title={t('copySelected', 'Copy')}
              type="button"
              variant="ghost"
              onClick={onCopy}
            >
              <Copy className="size-3" aria-hidden="true" />
              <span>{t('copySelected', 'Copy')}</span>
            </Button>
            <Button
              aria-label={t('cutSelected', 'Cut')}
              className="h-6 px-1.5 gap-1 text-[11px] text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              title={t('cutSelected', 'Cut')}
              type="button"
              variant="ghost"
              onClick={onCut}
            >
              <Scissors className="size-3" aria-hidden="true" />
              <span>{t('cutSelected', 'Cut')}</span>
            </Button>
            <Button
              aria-label={t('deleteSelected', 'Delete')}
              className="h-6 px-1.5 gap-1 text-[11px] text-zinc-500 hover:bg-red-50 hover:text-red-700 dark:text-zinc-400 dark:hover:bg-red-950/50 dark:hover:text-red-200"
              title={t('deleteSelected', 'Delete')}
              type="button"
              variant="ghost"
              onClick={onDelete}
            >
              <Trash2 className="size-3" aria-hidden="true" />
              <span>{t('deleteSelected', 'Delete')}</span>
            </Button>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs font-medium text-zinc-500 transition-colors dark:text-zinc-400">
              {t('shownCount', '$1 shown', [String(filteredCount)])}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
