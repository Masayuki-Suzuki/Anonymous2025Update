import { getClient } from '@/lib/apolloClient'
import { GetOneArticleDocument, GetOneArticleQuery } from '@/generated/graphql'
import { notFound } from 'next/navigation'
import PostDetail from '@/components/templates/PostDetail'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Fetch the post data using the getClient function for server-side rendering
    const { data } = await getClient().query<GetOneArticleQuery>({
        query: GetOneArticleDocument,
        variables: { slug: slug },
    })

    // Get the first post from the result (should be the only one since we filtered by slug)
    const post = data?.posts?.[0]

    // If no post is found, return a 404
    if (!post) {
        notFound()
    }

    return <PostDetail initialPostData={data} slug={slug} />
}
