import BlogListLoader from '@/components/loaders/BlogListLoader'
import { getClient } from '@/lib/apolloClient'
import { PostsDocument, PostsQuery } from '@/generated/graphql'
import BlogList from '@/components/templates/BlogList'

export default async function Home() {
    const { data, loading, error } = await getClient().query<PostsQuery>({ query: PostsDocument })

    console.log(data)

    return <BlogListLoader initialPostData={data} />
}
