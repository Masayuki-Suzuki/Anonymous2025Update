'use client'

import Link from 'next/link'
import { FC } from 'react'

type CategoryItemProps = {
    name: string
    slug: string
    postCount: number
}

const CategoryItem: FC<CategoryItemProps> = ({ name, slug, postCount }) => {
    return (
        <div className="border-b border-[#999]">
            <Link
                href={`/posts/tag/${slug}`}
                className="flex items-center justify-between py-5 w-full uppercase text-sm hover:bg-light-gray transition-all duration-300 ease-in-out"
            >
                <span>{name}</span>
                <span className="text-xs bg-light-gray px-2.5 py-1 rounded-[100%]">{postCount}</span>
            </Link>
        </div>
    )
}

export default CategoryItem
