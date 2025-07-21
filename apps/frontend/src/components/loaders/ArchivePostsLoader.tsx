'use client'

import dynamic from 'next/dynamic'
import { ArchivePostsLoaderProps } from '@/types/posts'

// Dynamically import both components with SSR disabled
const ArchivePostsList = dynamic(() => import('../templates/ArchivePostsList'), { ssr: false })
const ApolloWrapperClient = dynamic(() => import('@/lib/ApolloWrapper'), { ssr: false })

export default function ArchivePostsLoader({ initialArchiveData }: ArchivePostsLoaderProps) {
    return (
        <>
            <ApolloWrapperClient>
                <ArchivePostsList initialArchiveData={initialArchiveData} />
            </ApolloWrapperClient>
        </>
    )
}
