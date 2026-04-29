export function formatTime(iso?: string, locale?: string) {
  if (!iso) {
    return '';
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const resolvedLocale = locale || navigator.language;

  return date.toLocaleString(resolvedLocale.replace('_', '-'), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
