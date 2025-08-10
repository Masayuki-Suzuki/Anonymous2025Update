import { GetOneArticleQuery } from '@/generated/graphql'
import { getFormattedDates } from '@/lib/dateUtils'
import { notFound } from 'next/navigation'
import SocialShares from '@/components/molecules/SocialShares'
import MarkDownWrapper from '@/components/atoms/MarkDownWrapper'
import PostTags from '@/components/molecules/PostTags'
import PostThumbnail from '@/components/atoms/PostThumbnail'
import { PostThumbnailType } from '@/types/posts'

// Define the props type for the component
interface PostDetailProps {
    initialPostData?: GetOneArticleQuery
    url: string
}

export default function PostDetail({ initialPostData, url }: PostDetailProps) {
    const post = initialPostData?.posts?.[0] || null

    if (!post) {
        // If post is not found, return a 404 page
        notFound()
    }

    const thumbnail: PostThumbnailType = post.thumbnail

    // Format dates
    const { formattedCreatedAt, formattedUpdatedAt, showUpdatedDate } = getFormattedDates(
        post.createdAt,
        post.updatedAt
    )

    return (
        <article className="post-detail mt-10 sm:mt-14 md:mt-10 lg:mt-16 mx-auto md:mx-0 w-95pct">
            <PostThumbnail thumbnail={thumbnail} />

            {/* Title */}
            <h1 className="post-title mt-6 text-2xl lg:text-3xl leading-[1.2] font-semibold text-primary">
                {post.title}
            </h1>

            {/* Date and Tags */}
            <div className="post-meta flex items-center justify-between flex-wrap text-mid-gray border-b border-gray pb-4 mb-2.5 mt-2 gap-4">
                <div className="post-date text-sm leading-none capitalize">
                    {formattedCreatedAt.toUpperCase()}
                    {showUpdatedDate ? ` (updated: ${formattedUpdatedAt.toUpperCase()})` : ''}
                </div>

                {/* Tags */}
                <PostTags post={post} />
            </div>

            {/* Content */}
            {post.content ? (
                <div className="post-content min-h-20">
                    <MarkDownWrapper>{post.content}</MarkDownWrapper>
                </div>
            ) : (
                <p>No content exist...</p>
            )}

            <SocialShares url={url} title={post.title} />
        </article>
    )
}
