import BlogListLoader from '@/components/loaders/BlogListLoader'
import { getClient } from '@/lib/apolloClient'
import { PostsDocument, PostsQuery } from '@/generated/graphql'
import BlogList from '@/components/templates/BlogList'

export default async function Home({ searchParams }: { searchParams: { p?: string } }) {
    console.log(searchParams.p)
    const page = searchParams.p ? parseInt(searchParams.p, 10) : 1

    const { data, loading, error } = await getClient().query<PostsQuery>({
        query: PostsDocument,
        variables: { pagination: { page, pageSize: 10 } },
    })

    return <BlogListLoader initialPostData={data} />
}
