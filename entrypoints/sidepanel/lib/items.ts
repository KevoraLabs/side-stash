import type { ItemFilter, SavedItem } from '../types';

export function getCopyValue(item: SavedItem) {
  if (item.type === 'link') {
    return item.linkUrl || item.content;
  }

  if (item.type === 'image') {
    return item.imageUrl || item.content;
  }

  return item.content;
}

export function getOpenUrl(item: SavedItem) {
  if (item.type === 'link') {
    return item.linkUrl || item.pageUrl || '';
  }

  if (item.type === 'image') {
    return item.imageUrl || item.pageUrl || '';
  }

  return item.pageUrl || '';
}

function getHostname(url?: string) {
  if (!url) {
    return '';
  }

  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

export function getSourceDomain(item: SavedItem) {
  return getHostname(item.pageUrl) || getHostname(item.linkUrl) || getHostname(item.imageUrl);
}

export function getFilteredItems(
  items: SavedItem[],
  activeFilter: ItemFilter,
  queryText: string,
) {
  return items.filter((item) => {
    if (activeFilter !== 'all' && item.type !== activeFilter) {
      return false;
    }

    if (!queryText) {
      return true;
    }

    const haystack = [item.content, item.pageTitle, item.pageUrl, item.linkUrl, item.imageUrl]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(queryText);
  });
}
