import React from 'react';
import { Copy, Image as ImageIcon, Link2, Trash2, Type } from 'lucide-react';
import { formatTime } from '../lib/format';
import { cn } from '../lib/cn';
import { t } from '../lib/i18n';
import { getSourceDomain } from '../lib/items';
import type { SavedItem } from '../types';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

type ItemRowProps = {
  item: SavedItem;
  selected: boolean;
  onCopy: () => void;
  onDelete: () => void;
  onToggle: (checked: boolean) => void;
};

export function ItemRow({ item, selected, onCopy, onDelete, onToggle }: ItemRowProps) {
  const sourceDomain = getSourceDomain(item);
  const typeLabel =
    item.type === 'link'
      ? t('badgeLink', 'LINK')
      : item.type === 'image'
        ? t('badgeImage', 'IMAGE')
        : t('badgeText', 'TEXT');
  const badgeClassName =
    item.type === 'link'
      ? 'border-blue-200/70 bg-blue-50 text-blue-700'
      : item.type === 'image'
        ? 'border-sky-200/70 bg-sky-50 text-sky-700'
        : 'border-slate-200/80 bg-slate-100/80 text-slate-600';

  return (
    <li
      className={cn(
        'grid gap-3 rounded-[18px] border p-3.5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition',
        selected
          ? 'border-blue-200 bg-blue-50/70 shadow-[0_16px_30px_rgba(37,99,235,0.12)]'
          : 'border-slate-200/80 bg-white/88 hover:border-blue-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]',
      )}
    >
      <div className="flex flex-col gap-2 min-[421px]:flex-row min-[421px]:items-center min-[421px]:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <Checkbox checked={selected} onCheckedChange={(checked) => onToggle(checked === true)} />
          <span
            className={cn(
              'inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-bold tracking-[0.12em] uppercase',
              badgeClassName,
            )}
          >
            {item.type === 'text' ? <Type aria-hidden="true" /> : null}
            {item.type === 'link' ? <Link2 aria-hidden="true" /> : null}
            {item.type === 'image' ? <ImageIcon aria-hidden="true" /> : null}
            <span>{typeLabel}</span>
          </span>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-1.5">
          <time className="mr-1 text-[11px] text-slate-400">{formatTime(item.createdAt)}</time>
          <Button
            aria-label={t('actionCopy', 'Copy')}
            className="text-slate-500 hover:text-blue-700"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onCopy}
          >
            <Copy aria-hidden="true" />
          </Button>
          <Button
            aria-label={t('actionDelete', 'Delete')}
            className="text-slate-500 hover:text-red-600"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onDelete}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </div>
      </div>

      <button
        aria-pressed={selected}
        className="w-full rounded-[14px] border-0 bg-transparent p-0 text-left text-inherit outline-none transition focus-visible:ring-4 focus-visible:ring-blue-500/15"
        type="button"
        onClick={() => onToggle(!selected)}
      >
        <div className="flex min-w-0 gap-3">
          {item.type === 'image' && item.imageUrl ? (
            <img
              alt={item.imageAlt || item.content || ''}
              className="size-[52px] shrink-0 rounded-[14px] border border-slate-200/80 bg-slate-100 object-cover"
              loading="lazy"
              src={item.imageUrl}
            />
          ) : null}

          <div className="grid min-w-0 gap-1.5">
            <p className="line-clamp-2 text-[14px] leading-5 font-medium text-slate-900 break-words">
              {item.content}
            </p>
            {sourceDomain ? (
              <p className="truncate text-[12px] text-slate-500">
                {t('sourceLabel', 'Source')}: {sourceDomain}
              </p>
            ) : null}
          </div>
        </div>
      </button>
    </li>
  );
}
