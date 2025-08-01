'use client'

import dynamic from 'next/dynamic'
import { BlogListProps } from '@/types/posts'

// Dynamically import components with SSR enabled for BlogList to improve initial rendering
const BlogList = dynamic(() => import('../templates/BlogList'), { ssr: true })
const ApolloWrapperClient = dynamic(() => import('@/lib/ApolloWrapper'), { ssr: false })

export default function BlogListLoader({ initialPostData, initialPage }: BlogListProps) {
    return (
        <>
            <ApolloWrapperClient>
                <BlogList initialPostData={initialPostData} initialPage={initialPage} />
            </ApolloWrapperClient>
        </>
    )
}
