import React from 'react';
import { Copy, Image as ImageIcon, Link2, Scissors, Trash2, Type } from 'lucide-react';
import { formatTime } from '../lib/format';
import { cn } from '../lib/cn';
import { getResolvedLocale, t } from '../lib/i18n';
import { getOpenUrl, getSourceDomain } from '../lib/items';
import type { SavedItem } from '../types';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

type ItemRowProps = {
  item: SavedItem;
  selected: boolean;
  onCopy: () => void;
  onCut: () => void;
  onDelete: () => void;
  onOpen: () => void;
  onToggle: (checked: boolean) => void;
};

export function ItemRow({ item, selected, onCopy, onCut, onDelete, onOpen, onToggle }: ItemRowProps) {
  const sourceDomain = getSourceDomain(item);
  const openUrl = getOpenUrl(item);
  const typeLabel =
    item.type === 'link'
      ? t('badgeLink', 'LINK')
      : item.type === 'image'
        ? t('badgeImage', 'IMAGE')
        : t('badgeText', 'TEXT');
  const badgeClassName =
    item.type === 'link'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300'
      : item.type === 'image'
        ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300'
        : 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300';

  return (
    <li
      className={cn(
        'group grid gap-1.5 rounded-lg border bg-white p-2 transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-px hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/70',
        selected
          ? 'border-sky-400 bg-sky-50/70 shadow-[inset_3px_0_0_#0284c7,0_10px_28px_rgba(2,132,199,0.12)] dark:border-sky-700 dark:bg-sky-950/20 dark:shadow-[inset_3px_0_0_#38bdf8]'
          : 'border-zinc-200 dark:border-zinc-800',
      )}
    >
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <Checkbox
            checked={selected}
            aria-label={selected ? t('deselectItem', 'Deselect item') : t('selectItem', 'Select item')}
            onCheckedChange={(checked) => onToggle(checked === true)}
          />
          <span
            className={cn(
              'inline-flex min-h-4.5 items-center gap-1 rounded border px-1 text-[9px] font-semibold whitespace-nowrap transition-colors',
              badgeClassName,
            )}
          >
            {item.type === 'text' ? <Type className="size-2.5" aria-hidden="true" /> : null}
            {item.type === 'link' ? <Link2 className="size-2.5" aria-hidden="true" /> : null}
            {item.type === 'image' ? <ImageIcon className="size-2.5" aria-hidden="true" /> : null}
            <span>{typeLabel}</span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <time className="mr-0.5 text-[10px] font-medium text-zinc-400 transition-colors dark:text-zinc-500">{formatTime(item.createdAt, getResolvedLocale())}</time>
          <Button
            aria-label={t('actionCopy', 'Copy')}
            className="size-6 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            title={t('actionCopy', 'Copy')}
            size="icon"
            type="button"
            variant="ghost"
            onClick={onCopy}
          >
            <Copy className="size-3" aria-hidden="true" />
          </Button>
          <Button
            aria-label={t('actionCut', 'Cut')}
            className="size-6 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            title={t('actionCut', 'Cut')}
            size="icon"
            type="button"
            variant="ghost"
            onClick={onCut}
          >
            <Scissors className="size-3" aria-hidden="true" />
          </Button>
          <Button
            aria-label={t('actionDelete', 'Delete')}
            className="size-6 text-zinc-500 hover:bg-red-50 hover:text-red-700 dark:text-zinc-400 dark:hover:bg-red-950/50 dark:hover:text-red-200"
            size="icon"
            title={t('actionDelete', 'Delete')}
            type="button"
            variant="ghost"
            onClick={onDelete}
          >
            <Trash2 className="size-3" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <button
        aria-pressed={selected}
        className="w-full cursor-pointer rounded-md border-0 bg-transparent p-0 text-left text-inherit outline-none transition-colors hover:bg-white/65 focus-visible:ring-2 focus-visible:ring-sky-500/25 dark:hover:bg-zinc-950/60"
        type="button"
        onClick={() => onToggle(!selected)}
      >
        <div className="flex min-w-0 gap-2">
          {item.type === 'image' && item.imageUrl ? (
            <img
              alt={item.imageAlt || item.content || ''}
              className="size-10 shrink-0 rounded-md border border-zinc-200 bg-zinc-100 object-cover dark:border-zinc-800 dark:bg-zinc-900"
              loading="lazy"
              src={item.imageUrl}
            />
          ) : null}

          <div className="grid min-w-0 gap-0.5 content-start">
            <p className="line-clamp-2 break-words text-[13px] font-medium leading-snug text-zinc-950 transition-colors dark:text-zinc-100">
              {item.content}
            </p>
            {sourceDomain ? (
              openUrl ? (
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-medium text-zinc-500 hover:text-sky-600 hover:underline transition-colors dark:text-zinc-400 dark:hover:text-sky-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  {sourceDomain}
                </a>
              ) : (
                <p className="truncate text-[11px] font-medium text-zinc-500 transition-colors dark:text-zinc-400">
                  {sourceDomain}
                </p>
              )
            ) : null}
          </div>
        </div>
      </button>
    </li>
  );
}
