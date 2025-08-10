import { getClient } from '@/lib/apolloClient'
import { PostsDocument, PostsQuery } from '@/generated/graphql'
import PostsList from '@/components/templates/PostsList'

export default async function Home({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
    const params = await searchParams
    const page = params.p ? Number(params.p) : 1
    const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10

    // Fetch data on the server
    const { data } = await getClient().query<PostsQuery>({
        query: PostsDocument,
        variables: { pagination: { page, pageSize } },
    })

    const baseUrl = `?p=`

    return <PostsList<PostsQuery> initialPostData={data} title="" baseUrl={baseUrl} page={page} />
}
