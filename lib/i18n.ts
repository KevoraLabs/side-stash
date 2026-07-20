import { browser } from 'wxt/browser';
import deMessages from '../locales/de/messages.json';
import enMessages from '../locales/en/messages.json';
import esMessages from '../locales/es/messages.json';
import frMessages from '../locales/fr/messages.json';
import jaMessages from '../locales/ja/messages.json';
import koMessages from '../locales/ko/messages.json';
import ptBrMessages from '../locales/pt_BR/messages.json';
import zhMessages from '../locales/zh_CN/messages.json';
import zhTwMessages from '../locales/zh_TW/messages.json';

export type SupportedLocale = 'en' | 'ja' | 'zh_CN' | 'zh_TW' | 'ko' | 'fr' | 'de' | 'es' | 'pt_BR';
export type LanguageMode = 'auto' | 'manual';
export type LanguagePreference = {
  mode: LanguageMode;
  locale: SupportedLocale;
};
export type LanguageSelectValue = 'auto' | SupportedLocale;

type MessageDictionary = Record<string, { message: string }>;

const LANGUAGE_PREFERENCE_KEY = 'languagePreference';
const DEFAULT_LANGUAGE_PREFERENCE: LanguagePreference = {
  mode: 'auto',
  locale: 'en',
};

const dictionaries: Record<SupportedLocale, MessageDictionary> = {
  en: enMessages,
  ja: jaMessages,
  zh_CN: zhMessages,
  zh_TW: zhTwMessages,
  ko: koMessages,
  fr: frMessages,
  de: deMessages,
  es: esMessages,
  pt_BR: ptBrMessages,
};

const listeners = new Set<() => void>();

let currentPreference: LanguagePreference = DEFAULT_LANGUAGE_PREFERENCE;
let currentResolvedLocale: SupportedLocale = 'en';
let currentMessages: MessageDictionary = dictionaries.en;

function formatMessage(message: string, substitutions?: string | string[]) {
  if (!substitutions) {
    return message;
  }

  const values = Array.isArray(substitutions) ? substitutions : [substitutions];
  return values.reduce(
    (result, value, index) => result.replace(new RegExp(`\\$${index + 1}`, 'g'), value),
    message,
  );
}

const SUPPORTED_LOCALES = new Set<SupportedLocale>(['en', 'ja', 'zh_CN', 'zh_TW', 'ko', 'fr', 'de', 'es', 'pt_BR']);

function sanitizeLocale(value: unknown): SupportedLocale {
  return SUPPORTED_LOCALES.has(value as SupportedLocale) ? (value as SupportedLocale) : 'en';
}

function sanitizePreference(value: unknown): LanguagePreference {
  if (!value || typeof value !== 'object') {
    return DEFAULT_LANGUAGE_PREFERENCE;
  }

  const candidate = value as Partial<LanguagePreference>;
  return {
    mode: candidate.mode === 'manual' ? 'manual' : 'auto',
    locale: sanitizeLocale(candidate.locale),
  };
}

function normalizeLocale(value?: string | null): SupportedLocale {
  const normalized = (value || '').toLowerCase().replace(/-/g, '_');

  if (normalized.startsWith('ja')) return 'ja';
  if (normalized.startsWith('ko')) return 'ko';
  if (normalized.startsWith('fr')) return 'fr';
  if (normalized.startsWith('de')) return 'de';
  if (normalized.startsWith('es')) return 'es';
  if (normalized.startsWith('pt')) return 'pt_BR';

  // zh_TW / zh_HK must be checked before the generic zh → zh_CN fallback
  if (
    normalized.startsWith('zh_tw') ||
    normalized.startsWith('zh_hk') ||
    normalized.startsWith('zh_mo') ||
    normalized.startsWith('zh_hant')
  ) {
    return 'zh_TW';
  }

  if (normalized.startsWith('zh')) return 'zh_CN';

  return 'en';
}

function getBrowserLocale(): SupportedLocale {
  const browserLocale = browser?.i18n?.getUILanguage?.();
  const navigatorLocale =
    typeof navigator !== 'undefined'
      ? navigator.languages?.[0] || navigator.language
      : undefined;

  return normalizeLocale(browserLocale || navigatorLocale || 'en');
}

function resolveLocale(preference: LanguagePreference): SupportedLocale {
  return preference.mode === 'manual' ? preference.locale : getBrowserLocale();
}

function applyPreference(preference: LanguagePreference) {
  currentPreference = preference;
  currentResolvedLocale = resolveLocale(preference);
  currentMessages = dictionaries[currentResolvedLocale];
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

async function readStoredPreference(): Promise<LanguagePreference> {
  if (!browser?.storage?.local) {
    return DEFAULT_LANGUAGE_PREFERENCE;
  }

  const stored = await browser.storage.local.get(LANGUAGE_PREFERENCE_KEY);
  return sanitizePreference(stored[LANGUAGE_PREFERENCE_KEY]);
}

async function persistPreference(preference: LanguagePreference) {
  if (!browser?.storage?.local) {
    return;
  }

  await browser.storage.local.set({
    [LANGUAGE_PREFERENCE_KEY]: preference,
  });
}

export async function initializeI18n() {
  const preference = await readStoredPreference();
  applyPreference(preference);
  notifyListeners();
}

export function getLanguagePreference() {
  return currentPreference;
}

export function getResolvedLocale() {
  return currentResolvedLocale;
}

export function getLanguagePreferenceKey() {
  return LANGUAGE_PREFERENCE_KEY;
}

export function getLocaleLabel(locale: SupportedLocale) {
  const labels: Record<SupportedLocale, string> = {
    en: 'English',
    zh_CN: '简体中文',
    zh_TW: '繁體中文',
    ja: '日本語',
    ko: '한국어',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    pt_BR: 'Português',
  };
  return labels[locale] ?? 'English';
}

export function getLanguageSelectValue(): LanguageSelectValue {
  return currentPreference.mode === 'auto' ? 'auto' : currentPreference.locale;
}

export async function setLanguagePreference(value: LanguageSelectValue) {
  const nextPreference =
    value === 'auto'
      ? { ...currentPreference, mode: 'auto' as const }
      : { mode: 'manual' as const, locale: value };

  applyPreference(nextPreference);
  notifyListeners();
  await persistPreference(nextPreference);
}

export function subscribeToLanguageChange(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function t(key: string, fallback: string, substitutions?: string | string[]) {
  const translated = currentMessages[key]?.message;
  return formatMessage(translated || fallback, substitutions);
}
