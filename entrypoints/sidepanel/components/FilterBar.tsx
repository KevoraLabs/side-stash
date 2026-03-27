import React from 'react';
import { Search, X } from 'lucide-react';
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
    <section className="filter-shell">
      <div className="filter-search">
        <div className="filter-search-header">
          <div className="filter-search-copy">
            <span className="filter-search-title">{t('searchTitle', 'Search stash')}</span>
            <span className="filter-search-hint">
              {t('searchHint', 'Search content, title, source, or URL')}
            </span>
          </div>
          {query ? <span className="filter-search-state">{t('searchActive', 'Filtering')}</span> : null}
        </div>
        <label className="filter-search-box">
          <span className="filter-search-iconwrap">
            <Search className="filter-search-icon" aria-hidden="true" />
          </span>
          <span className="filter-search-stack">
            <span className="filter-search-kicker">
              {query
                ? t('searchKickerActive', 'Matching content and source')
                : t('searchKicker', 'Type to narrow instantly')}
            </span>
            <Input
              aria-label={t('searchLabel', 'Search saved items')}
              className="filter-search-input"
              placeholder={t('filterPlaceholder', 'Filter by URL or keyword')}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </span>
          {query ? (
            <Button
              aria-label={t('filterClear', 'Clear')}
              className="filter-search-clear"
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
        className="filter-chip-row"
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
              className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
              type="button"
              onClick={() => onFilterChange(filter)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="filter-meta-row">
        <div className="filter-meta-primary">
          <label className={`select-all-row${!hasFilteredItems ? ' is-disabled' : ''}`}>
            <Checkbox
              checked={allFilteredSelected ? true : hasPartialSelection ? 'indeterminate' : false}
              disabled={!hasFilteredItems}
              onCheckedChange={(checked) => onToggleSelectAll(checked === true)}
            />
            <span>{t('selectAll', 'Select all')}</span>
          </label>
          <span className="filter-count">{t('shownCount', '$1 shown', [String(filteredCount)])}</span>
        </div>

        <div className="filter-meta-copy">
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
          <span className={`filter-status${statusMessage ? ' is-visible' : ''}`} aria-live="polite">
            {statusMessage}
          </span>
        </div>
      </div>
    </section>
  );
}
