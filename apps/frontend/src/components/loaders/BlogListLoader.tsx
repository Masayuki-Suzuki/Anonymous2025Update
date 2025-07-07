'use client'

import dynamic from 'next/dynamic'
import { BlogListProps } from '@/types/posts'

// Dynamically import both components with SSR disabled
const BlogList = dynamic(() => import('../templates/BlogList'), { ssr: false })
const ApolloWrapperClient = dynamic(() => import('@/lib/ApolloWrapper'), { ssr: false })

export default function BlogListLoader({ initialPostData }: BlogListProps) {
    return (
        <>
            <ApolloWrapperClient>
                <BlogList initialPostData={initialPostData} />
            </ApolloWrapperClient>
        </>
    )
}
