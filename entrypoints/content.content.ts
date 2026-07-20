import { browser } from 'wxt/browser';

type ContextData = {
  pageTitle: string;
  linkText: string;
  linkUrl: string;
  imageAlt: string;
  imageUrl: string;
  selectionText: string;
};

const TOAST_ID = 'side-stash-page-toast';
const TOAST_STYLE_ID = 'side-stash-page-toast-style';

const getLinkText = (anchor: HTMLAnchorElement | null) => {
  if (!anchor) {
    return '';
  }

  const text = (anchor.textContent || '').trim();
  if (text) {
    return text;
  }

  const aria = (anchor.getAttribute('aria-label') || '').trim();
  if (aria) {
    return aria;
  }

  const title = (anchor.getAttribute('title') || '').trim();
  if (title) {
    return title;
  }

  return anchor.href || '';
};

const getImageAlt = (image: HTMLImageElement | null) => {
  if (!image) {
    return '';
  }
  const alt = (image.getAttribute('alt') || '').trim();
  if (alt) {
    return alt;
  }
  const aria = (image.getAttribute('aria-label') || '').trim();
  if (aria) {
    return aria;
  }
  const title = (image.getAttribute('title') || '').trim();
  if (title) {
    return title;
  }
  return '';
};

const getSelectionText = () => {
  try {
    return (window.getSelection()?.toString() || '').trim();
  } catch {
    return '';
  }
};

const ensureToastStyles = () => {
  if (document.getElementById(TOAST_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = TOAST_STYLE_ID;
  style.textContent = `
    #${TOAST_ID} {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 2147483646;
      max-width: min(360px, calc(100vw - 32px));
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid transparent;
      font: 600 12px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
      box-shadow: 0 12px 32px rgba(24, 24, 27, 0.18);
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 160ms ease, transform 160ms ease;
      pointer-events: none;
    }
    #${TOAST_ID}[data-visible="true"] {
      opacity: 1;
      transform: translateY(0);
    }
    #${TOAST_ID}[data-type="success"] {
      background: #ecfdf5;
      border-color: #a7f3d0;
      color: #065f46;
    }
    #${TOAST_ID}[data-type="warning"] {
      background: #fffbeb;
      border-color: #fde68a;
      color: #92400e;
    }
    #${TOAST_ID}[data-type="error"] {
      background: #fef2f2;
      border-color: #fecaca;
      color: #991b1b;
    }
    #${TOAST_ID}[data-type="info"] {
      background: #fafafa;
      border-color: #e4e4e7;
      color: #3f3f46;
    }
  `;
  document.documentElement.appendChild(style);
};

const showPageToast = (message: string, toastType = 'success') => {
  if (!message || !document?.body) {
    return;
  }

  ensureToastStyles();

  let toast = document.getElementById(TOAST_ID);
  if (!toast) {
    toast = document.createElement('div');
    toast.id = TOAST_ID;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.documentElement.appendChild(toast);
  }

  toast.dataset.type = toastType;
  toast.textContent = message;
  toast.dataset.visible = 'false';

  requestAnimationFrame(() => {
    toast?.setAttribute('data-visible', 'true');
  });

  window.clearTimeout((toast as HTMLElement & { _sideStashTimer?: number })._sideStashTimer);
  (toast as HTMLElement & { _sideStashTimer?: number })._sideStashTimer = window.setTimeout(() => {
    toast?.setAttribute('data-visible', 'false');
  }, toastType === 'warning' || toastType === 'error' ? 4200 : 2200);
};

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main() {
    let lastContextData: ContextData = {
      pageTitle: document.title || '',
      linkText: '',
      linkUrl: '',
      imageAlt: '',
      imageUrl: '',
      selectionText: '',
    };

    const updateContextData = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null;
      const image = target?.closest?.('img') as HTMLImageElement | null;

      lastContextData = {
        pageTitle: document.title || '',
        linkText: anchor ? getLinkText(anchor) : '',
        linkUrl: anchor?.href || '',
        imageAlt: getImageAlt(image),
        imageUrl: image?.currentSrc || image?.src || '',
        selectionText: getSelectionText(),
      };
    };

    document.addEventListener('contextmenu', updateContextData, true);
    document.addEventListener('mouseup', () => {
      lastContextData = {
        ...lastContextData,
        pageTitle: document.title || lastContextData.pageTitle,
        selectionText: getSelectionText(),
      };
    }, true);

    browser.runtime.onMessage.addListener((message) => {
      if (message?.type === 'side-stash-get-context') {
        return Promise.resolve({
          ...lastContextData,
          pageTitle: document.title || lastContextData.pageTitle,
          selectionText: getSelectionText() || lastContextData.selectionText,
        });
      }

      if (message?.type === 'side-stash-page-toast') {
        showPageToast(String(message.message || ''), String(message.toastType || 'success'));
      }

      return undefined;
    });
  },
});
