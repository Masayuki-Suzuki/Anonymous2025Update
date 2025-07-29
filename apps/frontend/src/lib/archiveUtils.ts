import { getMonthNumber } from './dateUtils';
import { getClient } from './apolloClient';
import { ArchivesDocument, ArchivesQuery } from '@/generated/graphql';

// Use the generated GraphQL type for archive data
export type ArchiveData = NonNullable<ArchivesQuery['archives'][number]>;

/**
 * Fetches archives from the API
 * @returns Array of archive objects
 */
export async function getArchives(): Promise<ArchiveData[]> {
  const { data } = await getClient().query<ArchivesQuery>({
    query: ArchivesDocument,
  });

  return (data?.archives.filter(Boolean) as ArchiveData[]) || [];
}

// Define the type for processed archive items
export type ProcessedArchive = {
  documentId: string
  title: string
  slug: string
  postCount: number
  year: number
  month?: number
}

/**
 * Process archives to group by year and month
 * @param archives Array of archive objects from the API
 * @returns Processed archives with year and month information
 */
export function processArchives(archives: ArchiveData[]): ProcessedArchive[] {
  const currentYear = new Date().getFullYear();

  return archives
    .map((archive) => {
      // Extract year and month from the title (format like "June 2025")
      const titleParts = archive.title.split(' ');
      const monthName = titleParts[0];
      const year = parseInt(titleParts[1], 10);
      const month = getMonthNumber(monthName);

      return {
        documentId: archive.documentId,
        title: archive.title,
        slug: archive.slug,
        postCount: archive.posts.filter(Boolean).length,
        year,
        // Only include month if it's the current year
        month: year === currentYear ? month : undefined,
      };
    });
}
