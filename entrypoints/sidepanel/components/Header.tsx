import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import type { LanguageSelectValue } from '../lib/i18n';
import { t } from '../lib/i18n';

type HeaderProps = {
  languageSelectValue: LanguageSelectValue;
  resolvedLocaleLabel: string;
  totalCount: number;
  onLanguageChange: (value: LanguageSelectValue) => void;
};

export function Header({
  languageSelectValue,
  resolvedLocaleLabel,
  totalCount,
  onLanguageChange,
}: HeaderProps) {
  return (
    <header className="mb-3 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <img
          alt=""
          aria-hidden="true"
          className="size-10 shrink-0 rounded-xl shadow-sm"
          src="/icon-48.png"
        />
        <div className="min-w-0">
          <h1 className="truncate text-[17px] font-semibold text-zinc-950 transition-colors dark:text-zinc-50">
            {t('panelTitle', 'Side Stash')}
          </h1>
          <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
            {totalCount} {t('countLabel', 'items')}
          </p>
        </div>
      </div>

      <label className="relative block shrink-0" title={resolvedLocaleLabel}>
        <Globe className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-zinc-400 transition-colors" aria-hidden="true" />
        <select
          aria-label={t('languageLabel', 'Language')}
          className="h-8 w-[112px] appearance-none rounded-lg border border-zinc-200 bg-white pr-7 pl-7 text-left text-xs font-medium text-zinc-700 outline-none transition-colors hover:bg-zinc-50 focus:ring-2 focus:ring-sky-500/25 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
          value={languageSelectValue}
          onChange={(event) => onLanguageChange(event.target.value as LanguageSelectValue)}
        >
          <option value="auto">{t('languageAuto', 'Auto')}</option>
          <option value="en">English</option>
          <option value="zh_CN">简体中文</option>
          <option value="zh_TW">繁體中文</option>
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="pt_BR">Português</option>
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-zinc-400 transition-colors" aria-hidden="true" />
      </label>
    </header>
  );
}
