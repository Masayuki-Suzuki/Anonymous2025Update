'use client'

import ApolloWrapper from '@/lib/ApolloWrapper'
import { useArchivesQuery } from '@/generated/graphql'
import ArchiveItem from '../atoms/ArchiveItem'

const ClientArchiveListContent = () => {
    const { data, loading, error } = useArchivesQuery()
    const currentYear = new Date().getFullYear()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data || !data.archives || data.archives.length === 0) {
        return <p>No archives found</p>
    }

    // Process archives to group by year and month
    const processedArchives = data.archives
        .map((archive) => {
            if (!archive) return null

            // Extract year and month from the title (format like "June 2025")
            const titleParts = archive.title.split(' ')
            const monthName = titleParts[0]
            const year = parseInt(titleParts[1], 10)
            const month = getMonthNumber(monthName)

            return {
                documentId: archive.documentId,
                title: archive.title,
                slug: archive.slug,
                postCount: archive.posts.length,
                year,
                // Only include month if it's the current year
                month: year === currentYear ? month : undefined,
            }
        })
        .filter(Boolean)

    return (
        <div>
            {processedArchives.map(
                (archive) =>
                    archive && (
                        <ArchiveItem
                            key={archive.documentId}
                            title={archive.title}
                            slug={archive.slug}
                            postCount={archive.postCount}
                            year={archive.year}
                            month={archive.month}
                        />
                    )
            )}
        </div>
    )
}

const ClientArchiveList = () => {
    return (
        <ApolloWrapper>
            <ClientArchiveListContent />
        </ApolloWrapper>
    )
}

// Helper function to get month number from month name
function getMonthNumber(monthName: string): number {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const index = monthNames.findIndex((name) => name.toLowerCase() === monthName.toLowerCase())
    return index !== -1 ? index + 1 : NaN // Return NaN if month name is not found
}

export default ClientArchiveList
