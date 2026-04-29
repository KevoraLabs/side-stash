import React, { startTransition, useDeferredValue, useEffect, useRef, useState } from 'react';
import { ConfirmDialog } from './components/ConfirmDialog';
import { EmptyState } from './components/EmptyState';
import { FilterBar } from './components/FilterBar';
import { Header } from './components/Header';
import { ItemList } from './components/ItemList';
import { SelectionBar } from './components/SelectionBar';
import { StatusToast } from './components/StatusToast';
import { copyTextToClipboard } from './lib/clipboard';
import {
  getLanguageSelectValue,
  getLocaleLabel,
  getResolvedLocale,
  setLanguagePreference,
  subscribeToLanguageChange,
  t,
} from './lib/i18n';
import { getCopyValue, getFilteredItems, getOpenUrl } from './lib/items';
import { getItems, removeItems, subscribeToItems } from './lib/storage';
import type { ItemFilter, SavedItem } from './types';

type DeleteState =
  | { ids: string[]; itemLabel: string; message: string }
  | null;

export function App() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [, setLanguageVersion] = useState(0);
  const [items, setItems] = useState<SavedItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<ItemFilter>('all');
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [copyStatus, setCopyStatus] = useState('');
  const [deleteState, setDeleteState] = useState<DeleteState>(null);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const filteredItems = getFilteredItems(items, activeFilter, deferredQuery);
  const selectedItems = items.filter((item) => selectedIds.has(item.id));
  const selectedCount = selectedIds.size;
  const hasActiveFilters = activeFilter !== 'all' || query.trim().length > 0;
  const languageSelectValue = getLanguageSelectValue();
  const resolvedLocale = getResolvedLocale();
  const allFilteredSelected =
    filteredItems.length > 0 && filteredItems.every((item) => selectedIds.has(item.id));
  const someFilteredSelected = filteredItems.some((item) => selectedIds.has(item.id));

  useEffect(() => {
    return subscribeToLanguageChange(() => {
      setLanguageVersion((value) => value + 1);
    });
  }, []);

  useEffect(() => {
    document.title = t('panelTitle', 'Side Stash');
  }, [languageSelectValue, resolvedLocale]);

  useEffect(() => {
    let active = true;

    void getItems().then((nextItems) => {
      if (!active) {
        return;
      }
      startTransition(() => setItems(nextItems));
    });

    const unsubscribe = subscribeToItems((nextItems) => {
      startTransition(() => setItems(nextItems));
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setSelectedIds((previous) => {
      const availableIds = new Set(items.map((item) => item.id));
      const nextSelected = new Set<string>();

      previous.forEach((id) => {
        if (availableIds.has(id)) {
          nextSelected.add(id);
        }
      });

      return nextSelected;
    });
  }, [items]);

  useEffect(() => {
    if (!copyStatus) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCopyStatus((current) => (current === copyStatus ? '' : current));
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (event.key === 'Escape' && selectedIds.size > 0 && deleteState === null) {
        setSelectedIds(new Set());
        return;
      }

      if (event.key === '/' && !isTypingTarget && deleteState === null) {
        event.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'a' && !isTypingTarget) {
        if (!filteredItems.length) {
          return;
        }

        event.preventDefault();
        setSelectedIds(new Set(filteredItems.map((item) => item.id)));
      }

      if (event.key === 'Enter' && selectedIds.size > 0 && !isTypingTarget && deleteState === null) {
        event.preventDefault();
        void handleCopySelected();
      }

      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedItems.length > 0 && !isTypingTarget && deleteState === null) {
        event.preventDefault();
        openDeleteDialog(selectedItems);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteState, filteredItems, selectedIds.size, selectedItems]);

  const handleToggleItem = (id: string, checked: boolean) => {
    setSelectedIds((previous) => {
      const nextSelected = new Set(previous);
      if (checked) {
        nextSelected.add(id);
      } else {
        nextSelected.delete(id);
      }
      return nextSelected;
    });
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (!filteredItems.length) {
      return;
    }

    setSelectedIds((previous) => {
      const nextSelected = new Set(previous);
      filteredItems.forEach((item) => {
        if (checked) {
          nextSelected.add(item.id);
        } else {
          nextSelected.delete(item.id);
        }
      });
      return nextSelected;
    });
  };

  const handleCopyItems = async (targetItems: SavedItem[], successMessage: string) => {
    if (!targetItems.length) {
      setCopyStatus(t('copyNoneSelected', 'No items selected.'));
      return;
    }

    const lines = targetItems.map(getCopyValue).filter(Boolean);
    const success = await copyTextToClipboard(lines.join('\n'));
    setCopyStatus(success ? successMessage : t('copyFailed', 'Copy failed.'));
  };

  const handleCopySingle = async (item: SavedItem) => {
    const text = getCopyValue(item);
    if (!text) {
      setCopyStatus(t('copyFailed', 'Copy failed.'));
      return;
    }

    const success = await copyTextToClipboard(text);
    setCopyStatus(success ? t('copySingleSuccess', 'Copied.') : t('copyFailed', 'Copy failed.'));
  };

  const handleOpenItem = (item: SavedItem) => {
    const url = getOpenUrl(item);
    if (!url) {
      setCopyStatus(t('openUnavailable', 'No URL to open.'));
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySelected = async () => {
    await handleCopyItems(
      selectedItems,
      t('copySuccess', `Copied ${selectedItems.length} items.`, [String(selectedItems.length)]),
    );
  };

  const openDeleteDialog = (targetItems: SavedItem[]) => {
    if (!targetItems.length) {
      setCopyStatus(t('deleteNoneSelected', 'No items selected.'));
      return;
    }

    if (targetItems.length === 1) {
      setDeleteState({
        ids: [targetItems[0].id],
        itemLabel: targetItems[0].content,
        message: t('confirmDelete', 'Delete this item?'),
      });
      return;
    }

    setDeleteState({
      ids: targetItems.map((item) => item.id),
      itemLabel: t('selectedCount', '$1 selected', [String(targetItems.length)]),
      message: t('confirmDeleteMultiple', 'Delete $1 items?', [String(targetItems.length)]),
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteState?.ids.length) {
      setDeleteState(null);
      return;
    }

    const idsToDelete = [...deleteState.ids];
    await removeItems(idsToDelete);

    setSelectedIds((previous) => {
      const nextSelected = new Set(previous);
      idsToDelete.forEach((id) => nextSelected.delete(id));
      return nextSelected;
    });

    setDeleteState(null);
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-transparent px-3 py-3 text-zinc-950 transition-colors dark:text-zinc-50">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[460px] flex-col pb-24">
        <Header
          languageSelectValue={languageSelectValue}
          resolvedLocaleLabel={getLocaleLabel(resolvedLocale)}
          totalCount={items.length}
          onLanguageChange={(value) => {
            void setLanguagePreference(value);
          }}
        />

        <div className="mb-3">
          <FilterBar
            activeFilter={activeFilter}
            allFilteredSelected={allFilteredSelected}
            filteredCount={filteredItems.length}
            hasActiveFilters={hasActiveFilters}
            hasFilteredItems={filteredItems.length > 0}
            hasPartialSelection={someFilteredSelected}
            query={query}
            searchInputRef={searchInputRef}
            selectedCount={selectedCount}
            onClearQuery={() => setQuery('')}
            onFilterChange={setActiveFilter}
            onQueryChange={setQuery}
            onResetFilters={handleResetFilters}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </div>

        <main className="min-h-0 flex-1 overflow-hidden rounded-lg border border-zinc-200 bg-white px-2 py-2 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-950">
          {filteredItems.length === 0 ? (
            <EmptyState
              hasActiveFilters={hasActiveFilters}
              hasItems={items.length > 0}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <ItemList
              items={filteredItems}
              selectedIds={selectedIds}
              onCopyItem={handleCopySingle}
              onDeleteItem={(item) => openDeleteDialog([item])}
              onOpenItem={handleOpenItem}
              onToggleItem={handleToggleItem}
            />
          )}
        </main>
      </div>

      <SelectionBar
        selectedCount={selectedCount}
        visible={selectedCount > 0}
        onClear={() => setSelectedIds(new Set())}
        onCopy={handleCopySelected}
        onDelete={() => openDeleteDialog(selectedItems)}
      />

      <StatusToast message={copyStatus} raised={selectedCount > 0} />

      <ConfirmDialog
        description={deleteState?.message ?? t('confirmDelete', 'Delete this item?')}
        open={deleteState !== null}
        title={t('confirmTitle', 'Delete item')}
        value={deleteState?.itemLabel ?? ''}
        onConfirm={handleConfirmDelete}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteState(null);
          }
        }}
      />
    </div>
  );
}
