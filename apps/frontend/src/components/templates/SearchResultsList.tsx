'use client'

import ApolloWrapper from '@/lib/ApolloWrapper'
import { SearchPostsQuery } from '@/generated/graphql'
import SearchResultCard from '../molecules/SearchResultCard'
import { useEffect, useState } from 'react'
import SearchResultPagination from '@/components/molecules/SearchResultPagination'

type SearchResultsListProps = {
    initialPostData: SearchPostsQuery
    searchTerm: string
}

type PageInfo = NonNullable<SearchPostsQuery['posts_connection']>['pageInfo']

export default function SearchResultsList({ initialPostData, searchTerm }: SearchResultsListProps) {
    const [postData, setPostData] = useState<SearchPostsQuery | null>(initialPostData)
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (initialPostData) {
            if ('posts_connection' in initialPostData && initialPostData.posts_connection) {
                setPageInfo(initialPostData.posts_connection.pageInfo)
                setCurrentPage(initialPostData.posts_connection.pageInfo.page)
                setTotalPages(initialPostData.posts_connection.pageInfo.pageCount)
            }
        }
    }, [initialPostData])

    if (!postData) {
        return (
            <div className="w-full md:w-95pct lg:gap-[5%] mt-10 lg:mt-16">
                <p className="text-center text-lg text-primary font-normal">
                    No results found for your search. Please try a different words.
                </p>
            </div>
        )
    }

    return (
        <>
            <h1 className="archive-title font-lato text-primary font-semibold text-2xl w-95pct mt-10 lg:mt-16">
                Search: <span className="capitalize font-normal">{searchTerm}</span>
            </h1>
            <div className="w-95pct lg:gap-[5%] mt-10">
                {postData.posts.map((post) => post && <SearchResultCard key={post.documentId} post={post} />)}
            </div>
            {pageInfo && (
                <ApolloWrapper>
                    <SearchResultPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setPostData={setPostData}
                        searchTerm={searchTerm}
                    />
                </ApolloWrapper>
            )}
        </>
    )
}
