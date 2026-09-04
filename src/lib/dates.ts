/**
 * Formats a `YYYY-MM` range as a human-readable label, e.g. "Jul 2024 - Present".
 * `endDate` may be the literal string "Present".
 */
const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function parse(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
}

export function formatMonth(value: string): string {
  const date = parse(value);
  return date ? monthFormatter.format(date) : value;
}

export function formatRange(startDate: string, endDate: string): string {
  return `${formatMonth(startDate)} - ${formatMonth(endDate)}`;
}

/** Duration between two `YYYY-MM` dates, e.g. "1 yr 6 mos". */
export function formatDuration(startDate: string, endDate: string, now = new Date()): string {
  const start = parse(startDate);
  const end = parse(endDate) ?? (endDate === 'Present' ? now : null);
  if (!start || !end) return '';

  const months = Math.max(
    0,
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
      (end.getUTCMonth() - start.getUTCMonth())
  );

  const years = Math.floor(months / 12);
  const remainder = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years === 1 ? '' : 's'}`);
  if (remainder > 0) parts.push(`${remainder} mo${remainder === 1 ? '' : 's'}`);
  return parts.join(' ') || '< 1 mo';
}
