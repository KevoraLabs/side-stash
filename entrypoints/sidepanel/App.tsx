import React, { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { browser } from 'wxt/browser';
import { ConfirmDialog } from './components/ConfirmDialog';
import { EmptyState } from './components/EmptyState';
import { FilterBar } from './components/FilterBar';
import { ItemList } from './components/ItemList';
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
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'warning' | 'error' | 'info';
    action?: {
      label: string;
      onClick: () => void;
    };
  } | null>(null);
  const [deleteState, setDeleteState] = useState<DeleteState>(null);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const filteredItems = useMemo(
    () => getFilteredItems(items, activeFilter, deferredQuery),
    [activeFilter, deferredQuery, items],
  );
  const selectedItems = useMemo(
    () => filteredItems.filter((item) => selectedIds.has(item.id)),
    [filteredItems, selectedIds],
  );
  const selectedCount = selectedItems.length;
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
    const handleMessage = (message: any) => {
      if (message && message.type === 'side-stash-toast') {
        setToast({
          message: message.message,
          type: message.toastType || 'warning',
        });
      }
    };

    browser.runtime.onMessage.addListener(handleMessage);
    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

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
      const availableIds = new Set(filteredItems.map((item) => item.id));
      const nextSelected = new Set<string>();

      previous.forEach((id) => {
        if (availableIds.has(id)) {
          nextSelected.add(id);
        }
      });

      return nextSelected;
    });
  }, [filteredItems]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    // Warnings and errors stay longer (5s) for better readability, successes stay 2s (or 4s if they have an Undo action)
    const duration = toast.action
      ? 4000
      : toast.type === 'warning' || toast.type === 'error'
        ? 5000
        : 2000;

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [toast]);

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

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'x' && selectedItems.length > 0 && !isTypingTarget && deleteState === null) {
        event.preventDefault();
        void handleCutSelected();
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

  const handleUndoItems = async (itemsToRestore: SavedItem[], indicesToRestore: number[]) => {
    const currentItems = await getItems();
    const nextItems = [...currentItems];

    const pairs = itemsToRestore.map((item, i) => ({
      item,
      index: indicesToRestore[i],
    }));

    pairs.sort((a, b) => a.index - b.index);

    pairs.forEach(({ item, index }) => {
      const targetIndex = Math.min(Math.max(0, index), nextItems.length);
      nextItems.splice(targetIndex, 0, item);
    });

    await saveItems(nextItems);
    setToast(null);
  };

  const handleDeleteSingle = async (item: SavedItem) => {
    const idsToDelete = [item.id];
    const index = items.findIndex((i) => i.id === item.id);
    const indices = index !== -1 ? [index] : [];

    await removeItems(idsToDelete);

    setSelectedIds((previous) => {
      const nextSelected = new Set(previous);
      nextSelected.delete(item.id);
      return nextSelected;
    });

    setToast({
      message: t('deleteSuccess', 'Item deleted.'),
      type: 'success',
      action: {
        label: t('actionUndo', 'Undo'),
        onClick: () => {
          void handleUndoItems([item], indices);
        },
      },
    });
  };

  const handleCopyItems = async (targetItems: SavedItem[], successMessage: string) => {
    if (!targetItems.length) {
      setToast({
        message: t('copyNoneSelected', 'No items selected.'),
        type: 'warning',
      });
      return;
    }

    const lines = targetItems.map(getCopyValue).filter(Boolean);
    if (!lines.length) {
      setToast({
        message: t('copyEmpty', 'No items to copy.'),
        type: 'warning',
      });
      return;
    }

    const success = await copyTextToClipboard(lines.join('\n'));
    setToast({
      message: success ? successMessage : t('copyFailed', 'Copy failed.'),
      type: success ? 'success' : 'error',
    });
  };

  const handleCutItems = async (targetItems: SavedItem[], successMessage: string) => {
    if (!targetItems.length) {
      setToast({
        message: t('copyNoneSelected', 'No items selected.'),
        type: 'warning',
      });
      return;
    }

    const lines = targetItems.map(getCopyValue).filter(Boolean);
    if (!lines.length) {
      setToast({
        message: t('copyEmpty', 'No items to copy.'),
        type: 'warning',
      });
      return;
    }

    const success = await copyTextToClipboard(lines.join('\n'));
    if (!success) {
      setToast({
        message: t('copyFailed', 'Copy failed.'),
        type: 'error',
      });
      return;
    }

    const idsToDelete = targetItems.map((item) => item.id);
    const deletedItems: SavedItem[] = [];
    const deletedIndices: number[] = [];
    items.forEach((item, index) => {
      if (idsToDelete.includes(item.id)) {
        deletedItems.push(item);
        deletedIndices.push(index);
      }
    });

    await removeItems(idsToDelete);
    setSelectedIds((previous) => {
      const nextSelected = new Set(previous);
      idsToDelete.forEach((id) => nextSelected.delete(id));
      return nextSelected;
    });

    setToast({
      message: successMessage,
      type: 'success',
      action: {
        label: t('actionUndo', 'Undo'),
        onClick: () => {
          void handleUndoItems(deletedItems, deletedIndices);
        },
      },
    });
  };

  const handleCopySingle = async (item: SavedItem) => {
    const text = getCopyValue(item);
    if (!text) {
      setToast({
        message: t('copyFailed', 'Copy failed.'),
        type: 'error',
      });
      return;
    }

    const success = await copyTextToClipboard(text);
    setToast({
      message: success ? t('copySingleSuccess', 'Copied.') : t('copyFailed', 'Copy failed.'),
      type: success ? 'success' : 'error',
    });
  };

  const handleCutSingle = async (item: SavedItem) => {
    await handleCutItems([item], t('cutSingleSuccess', 'Cut.'));
  };

  const handleOpenItem = (item: SavedItem) => {
    const url = getOpenUrl(item);
    if (!url) {
      setToast({
        message: t('openUnavailable', 'No URL to open.'),
        type: 'warning',
      });
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

  const handleCutSelected = async () => {
    await handleCutItems(
      selectedItems,
      t('cutSuccess', `Cut ${selectedItems.length} items.`, [String(selectedItems.length)]),
    );
  };

  const openDeleteDialog = (targetItems: SavedItem[]) => {
    if (!targetItems.length) {
      setToast({
        message: t('deleteNoneSelected', 'No items selected.'),
        type: 'warning',
      });
      return;
    }

    if (targetItems.length === 1) {
      void handleDeleteSingle(targetItems[0]);
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
    const deletedItems: SavedItem[] = [];
    const deletedIndices: number[] = [];
    items.forEach((item, index) => {
      if (idsToDelete.includes(item.id)) {
        deletedItems.push(item);
        deletedIndices.push(index);
      }
    });

    await removeItems(idsToDelete);

    setSelectedIds((previous) => {
      const nextSelected = new Set(previous);
      idsToDelete.forEach((id) => nextSelected.delete(id));
      return nextSelected;
    });

    setDeleteState(null);

    setToast({
      message: idsToDelete.length === 1
        ? t('deleteSuccess', 'Item deleted.')
        : t('deleteMultipleSuccess', `Deleted ${idsToDelete.length} items.`, [String(idsToDelete.length)]),
      type: 'success',
      action: {
        label: t('actionUndo', 'Undo'),
        onClick: () => {
          void handleUndoItems(deletedItems, deletedIndices);
        },
      },
    });
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-transparent px-3 py-3 text-zinc-950 transition-colors dark:text-zinc-50">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[460px] flex-col">
        <div className="mb-3">
          <FilterBar
            activeFilter={activeFilter}
            allFilteredSelected={allFilteredSelected}
            filteredCount={filteredItems.length}
            hasFilteredItems={filteredItems.length > 0}
            hasPartialSelection={someFilteredSelected}
            query={query}
            searchInputRef={searchInputRef}
            selectedCount={selectedCount}
            onClearQuery={() => setQuery('')}
            onFilterChange={setActiveFilter}
            onQueryChange={setQuery}
            onToggleSelectAll={handleToggleSelectAll}
            onCopy={handleCopySelected}
            onCut={handleCutSelected}
            onDelete={() => openDeleteDialog(selectedItems)}
            languageSelectValue={languageSelectValue}
            resolvedLocaleLabel={getLocaleLabel(resolvedLocale)}
            onLanguageChange={(value) => {
              void setLanguagePreference(value);
            }}
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
              onCutItem={handleCutSingle}
              onDeleteItem={handleDeleteSingle}
              onOpenItem={handleOpenItem}
              onToggleItem={handleToggleItem}
            />
          )}
        </main>
      </div>

      <StatusToast message={toast?.message ?? ''} type={toast?.type} action={toast?.action} raised={false} />

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
