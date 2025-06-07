'use client'

import { useSearchParams } from 'next/navigation'
import { SearchPostsQuery, useSearchPostsQuery } from '@/generated/graphql'
import SearchResultCard from '../molecules/SearchResultCard'

type ClientSearchResultsProps = {
  initialData?: SearchPostsQuery
}

export default function ClientSearchResults({ initialData }: ClientSearchResultsProps) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('q') || ''

  // If initialData is provided, use it
  // Otherwise, fetch data client-side
  const { data, loading, error } = useSearchPostsQuery({
    variables: {
      searchTerm
    },
    // Skip the query if we have initialData
    skip: !!initialData
  })

  // Use initialData if available, otherwise use data from the query
  const resultData = initialData || data

  if (!initialData && loading) return <div>Loading...</div>
  if (!initialData && error) return <div>Error: {error.message}</div>
  if (!resultData || !resultData.posts || resultData.posts.length === 0) {
    return <p>No results found for "{searchTerm}"</p>
  }

  return (
    <div className="search-results-list">
      {resultData.posts.map((post) =>
        post && <SearchResultCard key={post.documentId} post={post} />
      )}
    </div>
  )
}
