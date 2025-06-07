'use client'

import ApolloWrapper from '@/lib/ApolloWrapper'
import { SearchPostsQuery } from '@/generated/graphql'
import SearchResultCard from '../molecules/SearchResultCard'

type SearchResultsListProps = {
    initialPostData: SearchPostsQuery
}

export default function SearchResultsList({ initialPostData }: SearchResultsListProps) {
    console.log('SearchResultsList posts:', initialPostData)
    return (
        <ApolloWrapper>
            <div>
                <div className="search-results-list">
                    {initialPostData.posts.map((post) =>
                        post && <SearchResultCard key={post.documentId} post={post} />
                    )}
                </div>
            </div>
        </ApolloWrapper>
    )
}
