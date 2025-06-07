import { getClient } from '@/lib/apolloClient'
import { SearchPostsDocument, SearchPostsQuery } from '@/generated/graphql'
import ClientSearchPageLoader from '@/components/loaders/ClientSearchPageLoader'

// This component handles the server-side part of the search functionality
export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
    const searchTerm = searchParams.q || ''

    // In Next.js, server components always run on the server
    // This means typeof window === 'undefined' will always be true here
    // We can use this to determine that we should fetch data server-side
    if (typeof window === 'undefined') {
        // We're in SSR mode, fetch data server-side
        const { data } = await getClient().query<SearchPostsQuery>({
            query: SearchPostsDocument,
            variables: {
                searchTerm,
            },
        })

        // Return the client component loader with the server-fetched data
        return <ClientSearchPageLoader initialData={data} />
    }

    // This code will never execute in a server component,
    // but we include it for completeness
    return <ClientSearchPageLoader />
}
