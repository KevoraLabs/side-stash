import React from 'react';
import { Archive, ChevronDown, Inbox } from 'lucide-react';
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
    <header className="sticky top-0 z-30 mb-3 flex flex-col gap-4 rounded-[26px] border border-slate-200/80 bg-white/82 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl min-[421px]:flex-row min-[421px]:items-start min-[421px]:justify-between">
      <div className="flex min-w-0 gap-3.5">
        <div className="grid size-11 shrink-0 place-items-center rounded-[18px] border border-blue-200/60 bg-linear-to-b from-blue-50 to-slate-50 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <Archive className="size-[18px]" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[19px] font-semibold tracking-[-0.03em] text-slate-950">
              {t('panelTitle', 'Side Stash')}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-blue-700 uppercase">
              <Inbox className="size-3" aria-hidden="true" />
              {t('panelMode', 'Inbox')}
            </span>
          </div>
          <p className="mt-1.5 text-[12px] leading-5 text-slate-500">
            {t('panelSubtitle', 'Quickly stash text, links, and images')}
          </p>
        </div>
      </div>

      <div className="grid gap-3 min-[421px]:justify-items-end">
        <div className="grid gap-1 min-[421px]:justify-items-end">
          <span className="text-[28px] leading-none font-semibold tracking-[-0.07em] text-slate-950 max-[420px]:text-[24px]">
            {totalCount}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
            {t('countLabel', 'items')}
          </span>
        </div>

        <label className="grid gap-1.5 max-[420px]:justify-items-stretch min-[421px]:justify-items-end">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
            {t('languageLabel', 'Language')}
          </span>
          <span className="relative block w-full min-[421px]:w-[172px]">
            <select
              className="h-10 w-full appearance-none rounded-[14px] border border-slate-200/80 bg-white/92 pr-10 pl-3 text-[12px] font-semibold text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10"
              value={languageSelectValue}
              onChange={(event) => onLanguageChange(event.target.value as LanguageSelectValue)}
            >
              <option value="auto">
                {t('languageAuto', 'Auto')} · {resolvedLocaleLabel}
              </option>
              <option value="en">English</option>
              <option value="zh_CN">简体中文</option>
              <option value="ja">日本語</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          </span>
        </label>
      </div>
    </header>
  );
}
