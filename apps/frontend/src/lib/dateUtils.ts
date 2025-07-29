import { format, parseISO, differenceInHours, parse } from 'date-fns';

/**
 * Formats a date string to a human-readable format
 * @param dateString ISO date string to format
 * @returns Formatted date string in 'Month day, year' format (e.g., 'June 5, 2025')
 */
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  // Parse the ISO date string and format it to 'MMMM d, yyyy' style
  return format(parseISO(dateString), 'MMMM d, yyyy');
};

/**
 * Gets the full month name from a month number (1-12)
 * @param monthNumber Month number (1-12)
 * @returns Full month name (e.g., 'January', 'February', etc.)
 */
export const getMonthName = (monthNumber: number): string => {
  if (monthNumber < 1 || monthNumber > 12) return '';
  // Create a date object for the given month (using 2000-01-01 as a base date)
  const date = new Date(2000, monthNumber - 1, 1);
  // Format the date to get the full month name
  return format(date, 'MMMM');
};

/**
 * Gets the month number (1-12) from a month name
 * @param monthName Month name (e.g., 'January', 'February', etc.)
 * @returns Month number (1-12)
 */
export const getMonthNumber = (monthName: string): number => {
  try {
    // Parse the month name into a date object (using '1 January 2000' as a template)
    const date = parse(monthName, 'MMMM', new Date(2000, 0, 1));
    // Get the month number (0-11) and add 1 to make it 1-12
    return date.getMonth() + 1;
  } catch (error) {
    // Return NaN if parsing fails
    return NaN;
  }
};

/**
 * Returns formatted created and updated dates along with a flag indicating whether to show the updated date
 * @param createdAt ISO date string for creation date
 * @param updatedAt ISO date string for update date
 * @returns Object containing formattedCreatedAt, formattedUpdatedAt, and showUpdatedDate
 */
export const getFormattedDates = (
  createdAt: string | null | undefined,
  updatedAt: string | null | undefined
): {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
  showUpdatedDate: boolean;
} => {
  const formattedCreatedAt = formatDate(createdAt);
  const formattedUpdatedAt = formatDate(updatedAt);

  // Only show updated date if both dates exist and the difference is at least 24 hours
  let showUpdatedDate = false;

  if (createdAt && updatedAt) {
    const createdDate = parseISO(createdAt);
    const updatedDate = parseISO(updatedAt);
    const hoursDifference = differenceInHours(updatedDate, createdDate);

    // Show updated date if the difference is at least 24 hours (1 day)
    showUpdatedDate = hoursDifference >= 24;
  }

  return {
    formattedCreatedAt,
    formattedUpdatedAt,
    showUpdatedDate,
  };
};
