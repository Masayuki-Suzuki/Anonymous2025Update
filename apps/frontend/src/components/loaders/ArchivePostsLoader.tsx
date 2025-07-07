'use client'

import dynamic from 'next/dynamic'
import { GetArchiveBySlugQuery } from '@/generated/graphql'

// Define the props type for the loader
interface ArchivePostsLoaderProps {
    archive: NonNullable<GetArchiveBySlugQuery['archives'][number]>
    currentPage: number
}

// Dynamically import both components with SSR disabled
const ArchivePostsList = dynamic(() => import('../templates/ArchivePostsList'), { ssr: false })
const ApolloWrapperClient = dynamic(() => import('@/lib/ApolloWrapper'), { ssr: false })

export default function ArchivePostsLoader({ archive, currentPage }: ArchivePostsLoaderProps) {
    return (
        <>
            <ApolloWrapperClient>
                <ArchivePostsList archive={archive} currentPage={currentPage} />
            </ApolloWrapperClient>
        </>
    )
}
