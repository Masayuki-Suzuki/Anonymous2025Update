'use client'

import Link from 'next/link'
import { FC } from 'react'

type ArchiveItemProps = {
    title: string
    slug: string
    postCount: number
    year: number
    month?: number
}

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

// Helper function to get month name from month number
function getMonthName(month: number): string {
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

    // Month is 1-indexed in our props, but array is 0-indexed
    return monthNames[month - 1]
}

export default ArchiveItem
