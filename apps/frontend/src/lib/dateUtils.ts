import { format, parseISO, differenceInHours } from 'date-fns';

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
