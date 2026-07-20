import React from 'react';
import { Copy, ExternalLink, Image as ImageIcon, Link2, Pin, Scissors, Trash2, Type } from 'lucide-react';
import { formatTime } from '../lib/format';
import { cn } from '../lib/cn';
import { getResolvedLocale, t } from '../../../lib/i18n';
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
  onTogglePin: () => void;
};

export function ItemRow({
  item,
  selected,
  onCopy,
  onCut,
  onDelete,
  onOpen,
  onToggle,
  onTogglePin,
}: ItemRowProps) {
  const sourceDomain = getSourceDomain(item);
  const openUrl = getOpenUrl(item);
  const TypeIcon = item.type === 'link' ? Link2 : item.type === 'image' ? ImageIcon : Type;
  const typeLabel =
    item.type === 'link'
      ? t('badgeLink', 'Link')
      : item.type === 'image'
        ? t('badgeImage', 'Image')
        : t('badgeText', 'Text');

  return (
    <li
      className={cn(
        'group relative rounded-lg border bg-white transition-colors dark:bg-zinc-950',
        selected
          ? 'border-zinc-900/15 bg-zinc-50 dark:border-zinc-100/15 dark:bg-zinc-900/70'
          : 'border-zinc-200/90 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700',
        item.pinned && !selected ? 'border-amber-200/80 dark:border-amber-900/40' : '',
      )}
    >
      <div className="flex gap-2 p-2.5">
        <div className="pt-0.5">
          <Checkbox
            checked={selected}
            aria-label={selected ? t('deselectItem', 'Deselect item') : t('selectItem', 'Select item')}
            onCheckedChange={(checked) => onToggle(checked === true)}
          />
        </div>

        <button
          type="button"
          className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
          aria-pressed={selected}
          onClick={() => onToggle(!selected)}
          onDoubleClick={() => {
            if (openUrl) {
              onOpen();
            }
          }}
        >
          <div className="flex min-w-0 gap-2.5">
            {item.type === 'image' && item.imageUrl ? (
              <img
                alt={item.imageAlt || item.content || ''}
                className="size-11 shrink-0 rounded-md border border-zinc-200 bg-zinc-100 object-cover dark:border-zinc-800 dark:bg-zinc-900"
                loading="lazy"
                src={item.imageUrl}
              />
            ) : (
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                <TypeIcon className="size-3.5" aria-hidden="true" />
              </span>
            )}

            <div className="min-w-0 flex-1">
              <p className="m-0 line-clamp-2 break-words text-[13px] font-medium leading-snug text-zinc-900 dark:text-zinc-100">
                {item.pinned ? (
                  <Pin className="mr-1 inline size-3 -translate-y-px text-amber-600 dark:text-amber-400" aria-hidden="true" />
                ) : null}
                {item.content}
              </p>
              <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="font-medium text-zinc-600 dark:text-zinc-300">{typeLabel}</span>
                {sourceDomain ? (
                  <>
                    <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                      ·
                    </span>
                    <span className="truncate">{sourceDomain}</span>
                  </>
                ) : null}
                {item.createdAt ? (
                  <>
                    <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                      ·
                    </span>
                    <time dateTime={item.createdAt}>{formatTime(item.createdAt, getResolvedLocale())}</time>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </button>

        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex items-center gap-0.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <Button
              aria-label={item.pinned ? t('actionUnpin', 'Unpin') : t('actionPin', 'Pin')}
              className={cn(
                'size-7',
                item.pinned
                  ? 'text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300'
                  : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white',
              )}
              size="icon"
              title={item.pinned ? t('actionUnpin', 'Unpin') : t('actionPin', 'Pin')}
              type="button"
              variant="ghost"
              onClick={onTogglePin}
            >
              <Pin className="size-3.5" aria-hidden="true" />
            </Button>
            {openUrl ? (
              <Button
                aria-label={t('actionOpen', 'Open')}
                className="size-7 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                size="icon"
                title={t('actionOpen', 'Open')}
                type="button"
                variant="ghost"
                onClick={onOpen}
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </Button>
            ) : null}
            <Button
              aria-label={t('actionCopy', 'Copy')}
              className="size-7 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              size="icon"
              title={t('actionCopy', 'Copy')}
              type="button"
              variant="ghost"
              onClick={onCopy}
            >
              <Copy className="size-3.5" aria-hidden="true" />
            </Button>
            <Button
              aria-label={t('actionCut', 'Cut')}
              className="size-7 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              size="icon"
              title={t('actionCut', 'Cut')}
              type="button"
              variant="ghost"
              onClick={onCut}
            >
              <Scissors className="size-3.5" aria-hidden="true" />
            </Button>
            <Button
              aria-label={t('actionDelete', 'Delete')}
              className="size-7 text-zinc-500 hover:bg-red-50 hover:text-red-700 dark:text-zinc-400 dark:hover:bg-red-950/40 dark:hover:text-red-200"
              size="icon"
              title={t('actionDelete', 'Delete')}
              type="button"
              variant="ghost"
              onClick={onDelete}
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
