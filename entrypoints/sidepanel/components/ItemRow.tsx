import React from 'react';
import { Copy, Image as ImageIcon, Link2, Trash2, Type } from 'lucide-react';
import { formatTime } from '../lib/format';
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

  return (
    <li className={`item-row${selected ? ' is-selected' : ''}`}>
      <div className="item-row-header">
        <div className="item-row-meta">
          <Checkbox checked={selected} onCheckedChange={(checked) => onToggle(checked === true)} />
          <span className={`item-badge item-badge--${item.type}`}>
            {item.type === 'text' ? <Type aria-hidden="true" /> : null}
            {item.type === 'link' ? <Link2 aria-hidden="true" /> : null}
            {item.type === 'image' ? <ImageIcon aria-hidden="true" /> : null}
            <span>{typeLabel}</span>
          </span>
        </div>

        <div className="item-row-actions">
          <time className="item-time">{formatTime(item.createdAt)}</time>
          <Button
            aria-label={t('actionCopy', 'Copy')}
            size="icon"
            type="button"
            variant="ghost"
            onClick={onCopy}
          >
            <Copy aria-hidden="true" />
          </Button>
          <Button
            aria-label={t('actionDelete', 'Delete')}
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
        className="item-row-bodybutton"
        type="button"
        onClick={() => onToggle(!selected)}
      >
        <div className="item-row-body">
          {item.type === 'image' && item.imageUrl ? (
            <img
              alt={item.imageAlt || item.content || ''}
              className="item-thumb"
              loading="lazy"
              src={item.imageUrl}
            />
          ) : null}

          <div className="item-copy">
            <p className="item-content">{item.content}</p>
            {sourceDomain ? (
              <p className="item-source">
                {t('sourceLabel', 'Source')}: {sourceDomain}
              </p>
            ) : null}
          </div>
        </div>
      </button>
    </li>
  );
}
