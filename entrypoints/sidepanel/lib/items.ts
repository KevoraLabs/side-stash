import type { CopyFormat, DateFilter, ItemFilter, SavedItem } from '../types';

export function getPlainCopyValue(item: SavedItem) {
  if (item.type === 'link') {
    return item.linkUrl || item.content;
  }

  if (item.type === 'image') {
    return item.imageUrl || item.content;
  }

  return item.content;
}

export function getCopyValue(item: SavedItem, format: CopyFormat = 'plain') {
  const plain = getPlainCopyValue(item);
  const source = getSourceDomain(item);
  const pageTitle = (item.pageTitle || '').trim();
  const openUrl = getOpenUrl(item);

  if (format === 'markdown') {
    if (item.type === 'link') {
      const label = item.content || plain;
      return `[${escapeMarkdownLabel(label)}](${plain})`;
    }
    if (item.type === 'image') {
      const alt = item.imageAlt || item.content || 'image';
      return `![${escapeMarkdownLabel(alt)}](${plain})`;
    }
    if (openUrl) {
      return `> ${plain.replace(/\n/g, '\n> ')}\n>\n> — [${escapeMarkdownLabel(pageTitle || source || openUrl)}](${openUrl})`;
    }
    return plain;
  }

  if (format === 'source') {
    const bits = [plain];
    if (pageTitle) {
      bits.push(pageTitle);
    }
    if (source) {
      bits.push(source);
    } else if (item.pageUrl) {
      bits.push(item.pageUrl);
    }
    return bits.join(' · ');
  }

  return plain;
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

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function matchesDateFilter(item: SavedItem, dateFilter: DateFilter) {
  if (dateFilter === 'all') {
    return true;
  }

  if (!item.createdAt) {
    return false;
  }

  const created = new Date(item.createdAt);
  if (Number.isNaN(created.getTime())) {
    return false;
  }

  const todayStart = startOfLocalDay(new Date());
  const createdStart = startOfLocalDay(created);
  const dayMs = 24 * 60 * 60 * 1000;

  if (dateFilter === 'today') {
    return createdStart === todayStart;
  }

  if (dateFilter === 'yesterday') {
    return createdStart === todayStart - dayMs;
  }

  // week: last 7 days including today
  return created.getTime() >= todayStart - 6 * dayMs;
}

function escapeMarkdownLabel(value: string) {
  return value.replace(/[\[\]]/g, '\\$&');
}

export function getDomainOptions(items: SavedItem[]) {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    const domain = getSourceDomain(item);
    if (!domain) {
      return;
    }
    counts.set(domain, (counts.get(domain) || 0) + 1);
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([domain, count]) => ({ domain, count }));
}

export function sortItems(items: SavedItem[]) {
  return [...items].sort((a, b) => {
    const pinDiff = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
    if (pinDiff !== 0) {
      return pinDiff;
    }

    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
    return bTime - aTime;
  });
}

export function getFilteredItems(
  items: SavedItem[],
  activeFilter: ItemFilter,
  queryText: string,
  dateFilter: DateFilter = 'all',
  domainFilter = '',
) {
  const filtered = items.filter((item) => {
    if (activeFilter !== 'all' && item.type !== activeFilter) {
      return false;
    }

    if (!matchesDateFilter(item, dateFilter)) {
      return false;
    }

    if (domainFilter && getSourceDomain(item) !== domainFilter) {
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

  return sortItems(filtered);
}

export function itemsToMarkdown(items: SavedItem[]) {
  return items
    .map((item) => {
      const line = getCopyValue(item, 'markdown');
      const pin = item.pinned ? ' 📌' : '';
      return `- ${line}${pin}`;
    })
    .join('\n');
}

export function itemsToJson(items: SavedItem[]) {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      items,
    },
    null,
    2,
  );
}

export function parseImportPayload(raw: string): SavedItem[] {
  const trimmed = raw.trim();
  if (!trimmed) {
    return [];
  }

  const parsed = JSON.parse(trimmed) as
    | SavedItem[]
    | {
        items?: SavedItem[];
      };

  const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed.items) ? parsed.items : [];

  return list
    .filter((item) => item && typeof item === 'object')
    .map((item) => {
      const type =
        item.type === 'link' || item.type === 'image' || item.type === 'text' ? item.type : 'text';
      return {
        id: String(item.id || `import-${Date.now()}-${Math.random().toString(16).slice(2)}`),
        type,
        content: String(item.content || ''),
        linkUrl: item.linkUrl ? String(item.linkUrl) : undefined,
        imageUrl: item.imageUrl ? String(item.imageUrl) : undefined,
        imageAlt: item.imageAlt ? String(item.imageAlt) : undefined,
        pageTitle: item.pageTitle ? String(item.pageTitle) : undefined,
        pageUrl: item.pageUrl ? String(item.pageUrl) : undefined,
        createdAt: item.createdAt ? String(item.createdAt) : new Date().toISOString(),
        pinned: Boolean(item.pinned),
      } satisfies SavedItem;
    })
    .filter((item) => item.content || item.linkUrl || item.imageUrl);
}
