'use client'

import dynamic from 'next/dynamic'
import { BlogListProps } from '@/types/posts'
const BlogList = dynamic(() => import('../templates/BlogList'), { ssr: false })

export default function BlogListLoader({ initialPostData }: BlogListProps) {
    return <BlogList initialPostData={initialPostData} />
}
