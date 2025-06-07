'use client'

import dynamic from 'next/dynamic'
import { SearchPostsQuery } from '@/generated/graphql'

// Dynamically import ClientSearchPage with ssr: false to prevent server-side rendering
const ClientSearchPage = dynamic(() => import('../../app/search/ClientSearchPage'), { ssr: false })

type ClientSearchPageLoaderProps = {
    initialData?: SearchPostsQuery
}

export default function ClientSearchPageLoader({ initialData }: ClientSearchPageLoaderProps) {
    return <ClientSearchPage initialData={initialData} />
}
