export function formatTime(iso?: string, locale?: string) {
  if (!iso) {
    return '';
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const resolvedLocale = (locale || navigator.language).replace('_', '-');
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 1) {
    return new Intl.RelativeTimeFormat(resolvedLocale, { numeric: 'auto' }).format(0, 'minute');
  }
  if (diffMinutes < 60) {
    return new Intl.RelativeTimeFormat(resolvedLocale, { numeric: 'auto' }).format(
      -diffMinutes,
      'minute',
    );
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return new Intl.RelativeTimeFormat(resolvedLocale, { numeric: 'auto' }).format(
      -diffHours,
      'hour',
    );
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) {
    return new Intl.RelativeTimeFormat(resolvedLocale, { numeric: 'auto' }).format(-diffDays, 'day');
  }

  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString(resolvedLocale, {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
}
