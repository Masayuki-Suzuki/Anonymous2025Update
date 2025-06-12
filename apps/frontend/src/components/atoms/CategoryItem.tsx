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
        <div>
            <Link href={`/posts/tag/${slug}`}>
                <span>{name}</span>
                <span>{postCount}</span>
            </Link>
        </div>
    )
}

export default CategoryItem
