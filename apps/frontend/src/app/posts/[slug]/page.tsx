import { getClient } from '@/lib/apolloClient'
import { GetOneArticleDocument, GetOneArticleQuery } from '@/generated/graphql'
import { notFound } from 'next/navigation'
import PostLoader from '@/components/loaders/PostLoader'

export default async function PostPage({ params }: { params: { slug: string } }) {
    // Fetch the post data using the getClient function for server-side rendering
    const { data } = await getClient().query<GetOneArticleQuery>({
        query: GetOneArticleDocument,
        variables: { slug: params.slug },
    })

    // Get the first post from the result (should be the only one since we filtered by slug)
    const post = data?.posts?.[0]

    // If no post is found, return a 404
    if (!post) {
        notFound()
    }

    // Pass the data to the PostLoader component for client-side rendering
    return <PostLoader initialPostData={data} slug={params.slug} />
    // return <div>unko</div>
}
