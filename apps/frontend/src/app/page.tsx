import { getClient } from '@/lib/apolloClient'
import { PostsDocument, PostsQuery } from '@/generated/graphql'
import BlogList from '@/components/molecules/BlogList'

export default async function Home({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
    const params = await searchParams
    const page = params.p ? parseInt(params.p, 10) : 1

    // Fetch data on the server
    const { data } = await getClient().query<PostsQuery>({
        query: PostsDocument,
        variables: { pagination: { page, pageSize: 2 } },
    })

    return <BlogList initialPostData={data} />
}
