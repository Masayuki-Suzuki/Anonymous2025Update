'use client'

import ApolloWrapper from '@/lib/ApolloWrapper'
import { useGetRecentArticlesQuery } from '@/generated/graphql'
import RecentPostItem from '../atoms/RecentPostItem'

const RecentPostsListContent = () => {
    const { data, loading, error } = useGetRecentArticlesQuery()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data || !data.posts || data.posts.length === 0) {
        return <p>No recent posts found</p>
    }

    return (
        <div className="mt-5">
            {data.posts.map(
                (post) =>
                    post &&
                    post.thumbnail && (
                        <RecentPostItem
                            key={post.documentId}
                            title={post.title}
                            slug={post.slug}
                            createdAt={post.createdAt || ''}
                            thumbnailUrl={post.thumbnail.url}
                            thumbnailAlt={post.thumbnail.alternativeText || undefined}
                            thumbnailWidth={post.thumbnail.width}
                            thumbnailHeight={post.thumbnail.height}
                        />
                    )
            )}
        </div>
    )
}

const ClientRecentPostsList = () => {
    return (
        <ApolloWrapper>
            <RecentPostsListContent />
        </ApolloWrapper>
    )
}

export default ClientRecentPostsList
