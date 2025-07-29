import Link from 'next/link'
import { FC } from 'react'
import { getMonthName } from '@/lib/dateUtils'
import { ProcessedArchive } from '@/lib/archiveUtils'

// Use the properties from ProcessedArchive type
type ArchiveItemProps = Pick<ProcessedArchive, 'title' | 'slug' | 'postCount' | 'year' | 'month'>

const ArchiveItem: FC<ArchiveItemProps> = ({ title, slug, postCount, year, month }) => {
    // Format the display text based on whether it's current year or previous years
    // For current year, show "Month Year" format
    // For previous years, show only the year
    const displayText = month ? `${getMonthName(month)} ${year}` : `${year}`

    return (
        <div className="text-primary py-1">
            <Link
                href={`/archives/${slug}`}
                className="inline-flex items-center gap-3 hover:text-secondary transition-colors duration-300 ease-in-out"
            >
                <span className="bg-primary h-[1px] w-1.5"></span>
                <span className="text-sm">{displayText}</span>
                <span className="px-2 text-sm">{postCount}</span>
            </Link>
        </div>
    )
}

export default ArchiveItem
