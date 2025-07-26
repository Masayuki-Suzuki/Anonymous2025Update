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
        <div className="mb-5 pb-4 border-b border-[#999]">
            <Link
                href={`/posts/${slug}`}
                className="text-primary hover:text-secondary transition-colors duration-300 ease-in-out"
            >
                <div className="flex w-full">
                    {/* Thumbnail */}
                    <Image
                        src={`${strapiBaseUrl}${thumbnailUrl}`}
                        alt={thumbnailAlt || title}
                        width={thumbnailWidth || 60}
                        height={thumbnailHeight || 60}
                        className="object-cover object-center w-1/3 max-w-[60px] aspect-square rounded-[100%]"
                    />

                    {/* Text content */}
                    <div className="pl-4 font-lato w-full">
                        <h4 className="text-base font-light mb-2.5 leading-tight">{title}</h4>
                        <time className="text-right text-sm w-full block">{formattedDate}</time>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RecentPostItem
