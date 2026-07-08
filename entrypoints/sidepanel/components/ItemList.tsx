import React from 'react';
import type { SavedItem } from '../types';
import { ItemRow } from './ItemRow';

type ItemListProps = {
  items: SavedItem[];
  selectedIds: Set<string>;
  onCopyItem: (item: SavedItem) => void;
  onCutItem: (item: SavedItem) => void;
  onDeleteItem: (item: SavedItem) => void;
  onOpenItem: (item: SavedItem) => void;
  onToggleItem: (id: string, checked: boolean) => void;
};

export function ItemList({
  items,
  selectedIds,
  onCopyItem,
  onCutItem,
  onDeleteItem,
  onOpenItem,
  onToggleItem,
}: ItemListProps) {
  return (
    <ul
      className="m-0 grid h-full list-none content-start gap-1.5 overflow-y-auto px-1 py-1 pr-2 pb-1"
      aria-live="polite"
    >
      {items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          selected={selectedIds.has(item.id)}
          onCopy={() => onCopyItem(item)}
          onCut={() => onCutItem(item)}
          onDelete={() => onDeleteItem(item)}
          onOpen={() => onOpenItem(item)}
          onToggle={(checked) => onToggleItem(item.id, checked)}
        />
      ))}
    </ul>
  );
}
