'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'
import { format } from 'date-fns'

type RecentPostItemProps = {
    title: string
    slug: string
    createdAt: string
    thumbnailUrl: string
    thumbnailWidth: number | null | undefined
    thumbnailHeight: number | null | undefined
    thumbnailAlt?: string
}

const RecentPostItem: FC<RecentPostItemProps> = ({
    title,
    slug,
    createdAt,
    thumbnailUrl,
    thumbnailAlt,
    thumbnailWidth,
    thumbnailHeight,
}) => {
    // Format the date to dd.mm.yyyy
    const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy')
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

    return (
        <div>
            <Link href={`/posts/${slug}`}>
                <div>
                    {/* Thumbnail */}
                    <div>
                        <Image
                            src={`${strapiBaseUrl}${thumbnailUrl}`}
                            alt={thumbnailAlt || title}
                            width={thumbnailWidth || 60}
                            height={thumbnailHeight || 60}
                            className="object-cover object-center w-1/3 max-w-[120px] aspect-square rounded-[100%]"
                        />
                    </div>

                    {/* Text content */}
                    <div>
                        <div>{title}</div>
                        <div>{formattedDate}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RecentPostItem
