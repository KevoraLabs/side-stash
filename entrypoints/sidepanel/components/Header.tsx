import React from 'react';
import { Archive, Inbox } from 'lucide-react';
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
    <header className="panel-header">
      <div className="panel-brand">
        <div className="panel-brand-mark">
          <Archive className="panel-brand-icon" aria-hidden="true" />
        </div>

        <div className="panel-brand-copy">
          <div className="panel-brand-title-row">
            <h1>{t('panelTitle', 'Side Stash')}</h1>
            <span className="panel-brand-chip">
              <Inbox aria-hidden="true" />
              {t('panelMode', 'Inbox')}
            </span>
          </div>
          <p>{t('panelSubtitle', 'Quickly stash text, links, and images')}</p>
        </div>
      </div>

      <div className="panel-side">
        <div className="panel-total">
          <span className="panel-total-value">{totalCount}</span>
          <span className="panel-total-label">{t('countLabel', 'items')}</span>
        </div>

        <label className="language-control">
          <span className="language-control-label">{t('languageLabel', 'Language')}</span>
          <select
            className="language-control-select"
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
        </label>
      </div>
    </header>
  );
}
