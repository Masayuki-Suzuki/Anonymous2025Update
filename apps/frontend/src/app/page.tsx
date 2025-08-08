import { getClient } from '@/lib/apolloClient'
import { PostsDocument, PostsQuery } from '@/generated/graphql'
import BlogList from '@/components/molecules/BlogList'

export default async function Home({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
    const params = await searchParams
    const page = params.p ? parseInt(params.p, 10) : 1
    const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE)

    // Fetch data on the server
    const { data } = await getClient().query<PostsQuery>({
        query: PostsDocument,
        variables: { pagination: { page, pageSize } },
    })

    return <BlogList initialPostData={data} />
}
