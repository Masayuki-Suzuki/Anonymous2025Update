import RecentPostItem from '../atoms/RecentPostItem'
import { GetRecentArticlesQuery } from '@/generated/graphql'

type RecentPostsListContentProps = {
    data: GetRecentArticlesQuery
}

/**
 * RecentPostsListContent component - displays the list of recent posts
 */
const RecentPostsListContent = ({ data }: RecentPostsListContentProps) => {
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

export default RecentPostsListContent
