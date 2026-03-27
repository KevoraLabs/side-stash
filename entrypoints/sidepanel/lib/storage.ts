import { browser } from 'wxt/browser';
import type { SavedItem } from '../types';

const STORAGE_KEY = 'items';

export async function getItems(): Promise<SavedItem[]> {
  if (!browser?.storage?.local) {
    return [];
  }

  const stored = await browser.storage.local.get(STORAGE_KEY);
  return Array.isArray(stored[STORAGE_KEY]) ? (stored[STORAGE_KEY] as SavedItem[]) : [];
}

export async function saveItems(items: SavedItem[]) {
  if (!browser?.storage?.local) {
    return;
  }

  await browser.storage.local.set({ [STORAGE_KEY]: items });
}

export async function removeItems(ids: string[]) {
  if (!ids.length) {
    return;
  }

  const currentItems = await getItems();
  const idSet = new Set(ids);
  await saveItems(currentItems.filter((item) => !idSet.has(item.id)));
}

export function subscribeToItems(listener: (items: SavedItem[]) => void) {
  if (!browser?.storage?.onChanged) {
    return () => undefined;
  }

  const handleChange = (
    changes: Record<string, browser.Storage.StorageChange>,
    areaName: string,
  ) => {
    if (areaName !== 'local' || !changes[STORAGE_KEY]) {
      return;
    }

    listener(Array.isArray(changes[STORAGE_KEY].newValue) ? changes[STORAGE_KEY].newValue : []);
  };

  browser.storage.onChanged.addListener(handleChange);

  return () => {
    browser.storage.onChanged.removeListener(handleChange);
  };
}
