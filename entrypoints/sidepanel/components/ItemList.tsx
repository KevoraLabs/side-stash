import React from 'react';
import type { SavedItem } from '../types';
import { ItemRow } from './ItemRow';

type ItemListProps = {
  items: SavedItem[];
  selectedIds: Set<string>;
  onCopyItem: (item: SavedItem) => void;
  onDeleteItem: (item: SavedItem) => void;
  onToggleItem: (id: string, checked: boolean) => void;
};

export function ItemList({
  items,
  selectedIds,
  onCopyItem,
  onDeleteItem,
  onToggleItem,
}: ItemListProps) {
  return (
    <ul className="m-0 grid list-none gap-2.5 p-0" aria-live="polite">
      {items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          selected={selectedIds.has(item.id)}
          onCopy={() => onCopyItem(item)}
          onDelete={() => onDeleteItem(item)}
          onToggle={(checked) => onToggleItem(item.id, checked)}
        />
      ))}
    </ul>
  );
}
