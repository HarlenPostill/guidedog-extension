// timeHelper.ts

/**
 * Converts a timestamp to a human-readable time period from now.
 * @param timestamp - The timestamp to convert (ISO 8601 format)
 * @returns A string representing the time period from now
 */
export function getTimePeriodFromNow(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
}

/**
 * Checks if a given date is today.
 * @param date - The date to check
 * @returns True if the date is today, false otherwise
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Formats a date as a string in the format "MMM D, YYYY".
 * @param date - The date to format
 * @returns A formatted date string
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Converts a timestamp to a human-readable time period or date.
 * @param timestamp - The timestamp to convert (ISO 8601 format)
 * @returns A string representing either the time period from now or the formatted date
 */
export function getTimeOrDate(timestamp: string): string {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return getTimePeriodFromNow(timestamp);
  } else {
    return formatDate(date);
  }
}
