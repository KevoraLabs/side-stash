import { browser } from 'wxt/browser';
import {
  getLanguagePreferenceKey,
  initializeI18n,
  t,
} from '../lib/i18n';

const MENU_TEXT_ID = 'side-stash-save-text';
const MENU_LINK_ID = 'side-stash-save-link';
const MENU_IMAGE_ID = 'side-stash-save-image';
const STORAGE_KEY = 'items';
const SAVE_SELECTION_COMMAND = 'save-selection';
const BADGE_CLEAR_MS = 2200;

type ContextData = {
  pageTitle: string;
  linkText: string;
  linkUrl: string;
  imageAlt: string;
  imageUrl: string;
  selectionText?: string;
};

type FeedbackKind = 'success' | 'duplicate' | 'empty';

const createMenus = () => {
  browser.contextMenus.create({
    id: MENU_TEXT_ID,
    title: t('menuSaveText', 'Save text to side panel'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: MENU_LINK_ID,
    title: t('menuSaveLink', 'Save link to side panel'),
    contexts: ['link'],
  });

  browser.contextMenus.create({
    id: MENU_IMAGE_ID,
    title: t('menuSaveImage', 'Save image to side panel'),
    contexts: ['image'],
  });
};

const refreshMenus = async () => {
  try {
    await browser.contextMenus.removeAll();
  } catch {
    // ignore
  }
  createMenus();
};

const setPanelBehavior = () => {
  const sidePanel = (
    browser as typeof browser & {
      sidePanel?: { setPanelBehavior: (options: { openPanelOnActionClick: boolean }) => Promise<void> };
    }
  ).sidePanel;

  if (sidePanel?.setPanelBehavior) {
    sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => undefined);
  }
};

const getContextData = async (tabId?: number): Promise<ContextData | null> => {
  if (typeof tabId !== 'number') {
    return null;
  }

  try {
    const data = await browser.tabs.sendMessage(tabId, {
      type: 'side-stash-get-context',
    });
    return (data as ContextData) ?? null;
  } catch {
    return null;
  }
};

const buildId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const normalizeText = (value: string) =>
  value.trim().replace(/\s+/g, ' ');

const normalizeUrl = (value: string) => {
  const raw = value.trim();
  if (!raw) {
    return '';
  }

  try {
    const url = new URL(raw);
    url.hash = '';
    const hostname = url.hostname.toLowerCase();
    const protocol = url.protocol.toLowerCase();
    const pathname =
      url.pathname.length > 1 && url.pathname.endsWith('/')
        ? url.pathname.slice(0, -1)
        : url.pathname;
    return `${protocol}//${hostname}${pathname}${url.search}`;
  } catch {
    return raw;
  }
};

const buildDedupKey = (item: Record<string, unknown>) => {
  const type = String(item.type || '');
  if (type === 'text') {
    return `text:${normalizeText(String(item.content || ''))}`;
  }
  if (type === 'link') {
    return `link:${normalizeUrl(String(item.linkUrl || item.content || ''))}`;
  }
  if (type === 'image') {
    return `image:${normalizeUrl(String(item.imageUrl || item.content || ''))}`;
  }
  return '';
};

const getImageLabel = (imageUrl: string, imageAlt: string) => {
  if (imageAlt) {
    return imageAlt;
  }
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    const filename = parts[parts.length - 1];
    if (filename) {
      return decodeURIComponent(filename);
    }
  } catch {
    // ignore invalid url
  }
  return imageUrl;
};

const addItem = async (item: Record<string, unknown>): Promise<'success' | 'duplicate'> => {
  const stored = await browser.storage.local.get(STORAGE_KEY);
  const items = Array.isArray(stored[STORAGE_KEY]) ? stored[STORAGE_KEY] : [];
  const nextKey = buildDedupKey(item);
  if (nextKey) {
    const exists = items.some((storedItem: Record<string, unknown>) => {
      return buildDedupKey(storedItem) === nextKey;
    });
    if (exists) {
      return 'duplicate';
    }
  }
  items.unshift(item);
  await browser.storage.local.set({ [STORAGE_KEY]: items });
  return 'success';
};

const clearBadgeSoon = () => {
  setTimeout(() => {
    void browser.action.setBadgeText({ text: '' });
  }, BADGE_CLEAR_MS);
};

const flashBadge = async (kind: FeedbackKind) => {
  try {
    const color =
      kind === 'success' ? '#059669' : kind === 'duplicate' ? '#d97706' : '#71717a';
    await browser.action.setBadgeBackgroundColor({ color });
    await browser.action.setBadgeText({
      text: kind === 'success' ? 'OK' : kind === 'duplicate' ? '!' : '·',
    });
    clearBadgeSoon();
  } catch {
    // ignore when action API is unavailable
  }
};

const notifySaveFeedback = async (kind: FeedbackKind, tabId?: number) => {
  const message =
    kind === 'success'
      ? t('saveSuccess', 'Saved to Side Stash.')
      : kind === 'duplicate'
        ? t('duplicateNotice', 'Item already saved.')
        : t('saveEmptySelection', 'Select text first, then press the shortcut.');
  const toastType =
    kind === 'success' ? 'success' : kind === 'duplicate' ? 'warning' : 'info';

  void flashBadge(kind);

  try {
    await browser.runtime.sendMessage({
      type: 'side-stash-toast',
      toastType,
      message,
    });
  } catch {
    // side panel may be closed
  }

  if (typeof tabId === 'number') {
    try {
      await browser.tabs.sendMessage(tabId, {
        type: 'side-stash-page-toast',
        toastType,
        message,
      });
    } catch {
      // content script may be unavailable on restricted pages
    }
  }
};

const openWelcomePage = async () => {
  try {
    await browser.tabs.create({
      url: browser.runtime.getURL('/welcome.html'),
    });
  } catch {
    // ignore
  }
};

const saveSelectionFromTab = async (tab?: browser.Tabs.Tab) => {
  const tabId = tab?.id;
  const contextData = await getContextData(tabId);
  const selectedText = (contextData?.selectionText || '').trim();
  if (!selectedText) {
    await notifySaveFeedback('empty', tabId);
    return;
  }

  const result = await addItem({
    id: buildId(),
    type: 'text',
    content: selectedText,
    pageTitle: contextData?.pageTitle || tab?.title || '',
    pageUrl: tab?.url || '',
    createdAt: new Date().toISOString(),
    pinned: false,
  });
  await notifySaveFeedback(result, tabId);
};

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener((details) => {
    void initializeI18n().then(() => refreshMenus());
    setPanelBehavior();

    if (details.reason === 'install') {
      void openWelcomePage();
    }
  });

  browser.runtime.onStartup.addListener(() => {
    void initializeI18n().then(() => refreshMenus());
    setPanelBehavior();
  });

  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local' || !changes[getLanguagePreferenceKey()]) {
      return;
    }

    void initializeI18n().then(() => refreshMenus());
  });

  void initializeI18n().then(() => refreshMenus());
  setPanelBehavior();

  browser.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== 'side-stash-open-panel') {
      return undefined;
    }

    const sidePanel = (
      browser as typeof browser & {
        sidePanel?: {
          open?: (options: { windowId?: number; tabId?: number }) => Promise<void>;
        };
      }
    ).sidePanel;

    void (async () => {
      try {
        if (!sidePanel?.open) {
          return;
        }

        if (typeof sender.tab?.windowId === 'number') {
          await sidePanel.open({ windowId: sender.tab.windowId });
          return;
        }

        if (typeof sender.tab?.id === 'number') {
          await sidePanel.open({ tabId: sender.tab.id });
          return;
        }

        const currentWindow = await browser.windows.getCurrent();
        if (typeof currentWindow.id === 'number') {
          await sidePanel.open({ windowId: currentWindow.id });
        }
      } catch {
        // ignore
      }
    })();

    return true;
  });

  browser.commands?.onCommand.addListener((command) => {
    if (command !== SAVE_SELECTION_COMMAND) {
      return;
    }

    void browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      void saveSelectionFromTab(tabs[0]);
    });
  });

  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    const contextData = await getContextData(tab?.id);
    const pageTitle = contextData?.pageTitle || '';
    const pageUrl = info.pageUrl || tab?.url || '';
    const createdAt = new Date().toISOString();
    let newItem: Record<string, unknown> | null = null;

    if (info.menuItemId === MENU_TEXT_ID) {
      const selectedText = (info.selectionText || '').trim();
      if (selectedText) {
        newItem = {
          id: buildId(),
          type: 'text',
          content: selectedText,
          pageTitle,
          pageUrl,
          createdAt,
          pinned: false,
        };
      }
    } else if (info.menuItemId === MENU_LINK_ID) {
      const linkUrl = info.linkUrl || contextData?.linkUrl || '';
      if (linkUrl) {
        const linkText =
          (contextData?.linkText || '').trim() || info.selectionText || linkUrl;
        newItem = {
          id: buildId(),
          type: 'link',
          content: linkText,
          linkUrl,
          pageTitle,
          pageUrl,
          createdAt,
          pinned: false,
        };
      }
    } else if (info.menuItemId === MENU_IMAGE_ID) {
      const imageUrl = info.srcUrl || contextData?.imageUrl || '';
      if (imageUrl) {
        const imageAlt = (contextData?.imageAlt || '').trim();
        newItem = {
          id: buildId(),
          type: 'image',
          content: getImageLabel(imageUrl, imageAlt),
          imageUrl,
          imageAlt,
          pageTitle,
          pageUrl,
          createdAt,
          pinned: false,
        };
      }
    }

    if (newItem) {
      const result = await addItem(newItem);
      await notifySaveFeedback(result, tab?.id);
    }
  });
});
