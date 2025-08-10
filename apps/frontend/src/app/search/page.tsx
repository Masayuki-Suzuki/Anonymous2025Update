import { getClient } from '@/lib/apolloClient'
import { SearchPostsDocument, SearchPostsQuery } from '@/generated/graphql'
import SearchResultsList from '@/components/templates/SearchResultsList'

type SearchPageProps = {
    searchParams: Promise<{
        q: string
        p: string
    }>
}

// This component handles the server-side part of the search functionality
export default async function SearchPage({ searchParams }: SearchPageProps) {
    const paramsData = await searchParams
    const searchTerm = paramsData.q || ''
    const page = Number(paramsData.p) || 1
    const baseUrl = `/search?q=${searchTerm}&p=`

    const pagination = {
        page,
        pageSize: 2,
    }

    const { data } = await getClient().query<SearchPostsQuery>({
        query: SearchPostsDocument,
        variables: {
            searchTerm,
            pagination,
            sort: ['createdAt:desc'],
        },
    })

    // This code will never execute in a server component,
    // but we include it for completeness
    return <SearchResultsList initialPostData={data} searchTerm={searchTerm} page={page} baseUrl={baseUrl} />
}
