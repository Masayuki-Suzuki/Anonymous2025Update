import { getClient } from '@/lib/apolloClient'
import { SearchPostsDocument, SearchPostsQuery } from '@/generated/graphql'
import SearchResultsList from '@/components/templates/SearchResultsList'

// This component handles the server-side part of the search functionality
export default async function SearchPage({ searchParams }: { searchParams: { q: string; p: string } }) {
    const searchTerm = searchParams.q || ''
    const page = Number(searchParams.p) || 1

    const pagination = {
        page,
        pageSize: 2,
    }

    const { data } = await getClient().query<SearchPostsQuery>({
        query: SearchPostsDocument,
        variables: {
            searchTerm,
            pagination,
        },
    })

    // This code will never execute in a server component,
    // but we include it for completeness
    return <SearchResultsList initialPostData={data} searchTerm={searchTerm} />
}
