'use client'

import { useSearchParams } from 'next/navigation'
import ApolloWrapper from '@/lib/ApolloWrapper'
import ClientSearchResults from '@/components/templates/ClientSearchResults'
import { SearchPostsQuery, SearchPostsDocument, useSearchPostsQuery } from '@/generated/graphql'

type ClientSearchPageProps = {
  initialData?: SearchPostsQuery
}

export default function ClientSearchPage({ initialData }: ClientSearchPageProps) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('q') || ''

  // Check if we're in a server-side environment
  const isSSR = typeof window === 'undefined'

  // If we're in a client-side environment, use the initialData
  // If we're in a server-side environment or initialData is not available, fetch data client-side
  const dataToUse = !isSSR && initialData ? initialData : undefined

  return (
    <ApolloWrapper>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search Results for: {searchTerm}</h1>
        <ClientSearchResults initialData={dataToUse} />
      </div>
    </ApolloWrapper>
  )
}
