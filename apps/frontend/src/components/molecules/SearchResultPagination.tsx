import { SearchPostsQuery, useSearchPostsLazyQuery } from '@/generated/graphql'
import ApolloWrapper from '@/lib/ApolloWrapper'
import PostPagination from '@/components/molecules/PostPagination'

interface SearchResultPaginationProps {
    currentPage: number
    totalPages: number
    searchTerm: string
    setPostData: (data: SearchPostsQuery | null) => void
}

export default function SearchResultPagination({
    currentPage,
    totalPages,
    setPostData,
    searchTerm,
}: SearchResultPaginationProps) {
    const [fetchPosts] = useSearchPostsLazyQuery()

    async function onPageChange(newPage: number) {
        const { data } = await fetchPosts({
            variables: {
                searchTerm,
                pagination: {
                    page: newPage,
                    pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10,
                },
                sort: 'createdAt:DESC', // Adjust the sort order as needed
            },
        })

        if (data) {
            setPostData(data)
        }
    }

    return (
        <ApolloWrapper>
            <PostPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </ApolloWrapper>
    )
}
