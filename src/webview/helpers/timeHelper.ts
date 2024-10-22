// timeHelper.ts

import { useDictionary } from '../hooks/useDictionary';

/**
 * Converts a timestamp to a human-readable time period from now.
 * @param timestamp - The timestamp to convert (ISO 8601 format)
 * @returns A string representing the time period from now
 */
export function getTimePeriodFromNow(timestamp: string): string {
  const d = useDictionary();
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return d('ui.time.now');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${
      diffInMinutes !== 1 ? `${d('ui.time.minutes')}` : `${d('ui.time.minute')}`
    } ${d('ui.time.suffix')}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${
      diffInHours !== 1 ? `${d('ui.time.hours')}` : `${d('ui.time.hour')}`
    } ${d('ui.time.suffix')}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ${diffInDays !== 1 ? `${d('ui.time.days')}` : `${d('ui.time.day')}`} ${d(
    'ui.time.suffix'
  )}`;
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
