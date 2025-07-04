'use client'

import dynamic from 'next/dynamic'
import { GetArchiveBySlugQuery } from '@/generated/graphql'

// Define the props type for the loader
interface ArchivePostsLoaderProps {
    archive: NonNullable<GetArchiveBySlugQuery['archives'][number]>
}

// Dynamically import the ArchivePostsList component with SSR disabled
const ArchivePostsList = dynamic(() => import('../templates/ArchivePostsList'), { ssr: false })

export default function ArchivePostsLoader({ archive }: ArchivePostsLoaderProps) {
    return <ArchivePostsList archive={archive} />
}
