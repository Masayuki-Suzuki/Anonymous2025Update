import Link from 'next/link'
import { getFormattedDates } from '@/lib/dateUtils'
import PostThumbnail from '@/components/atoms/PostThumbnail'
import { PostThumbnailType } from '@/types/posts'
import PostCardTags from '@/components/molecules/PostCardTags'

// Union type to handle both query types with proper type safety
// Create a merged type that makes properties only in PostsQuery optional
type PostType = {
    // Common properties in both query types
    documentId: string
    title: string
    slug: string
    createdAt?: string | null
    updatedAt?: string | null
    tags: Array<{ name: string; slug: string } | null>

    // Properties only in PostsQuery that need to be optional
    excerpt?: string | null
    thumbnail?: PostThumbnailType
}

type BlogCardProps = {
    post: PostType
    index: number
}

const BlogCard = ({ post, index }: BlogCardProps) => {
    // Use optional chaining to handle potentially missing fields
    const { title, thumbnail, excerpt, tags, createdAt, updatedAt, slug } = post

    const { formattedCreatedAt, formattedUpdatedAt, showUpdatedDate } = getFormattedDates(createdAt, updatedAt)

    // Truncate title if it's too long (approximately 100 characters)
    const truncatedTitle = title.length > 100 ? `${title.substring(0, 100)}...` : title

    // Truncate excerpt if it's too long (approximately 300 characters)
    // Handle case where excerpt might be undefined in SearchPostsQuery
    const truncatedExcerpt = excerpt && excerpt.length > 300 ? `${excerpt.substring(0, 300)}...` : excerpt

    let wrapperMargin = ''

    if (index > 1) {
        wrapperMargin = 'mt-10 md:mt-16'
    } else if (index === 1) {
        wrapperMargin = 'mt-10 md:mt-16 lg:mt-0'
    }

    return (
        <div className={`blog-card mx-auto lg:mx-0 w-full lg:w-[47.5%] ${wrapperMargin}`}>
            <PostThumbnail thumbnail={thumbnail} />

            {/* Title */}
            <h2 className="blog-card-title text-2xl font-semibold leading-[1.2] mt-6 text-primary">
                <Link href={`/posts/${slug}`} className="hover:text-secondary transition-colors duration-300">
                    {truncatedTitle}
                </Link>
            </h2>

            {/* Date information */}
            <div className="blog-card-date uppercase text-mid-gray text-sm mt-3 mb-5">
                {formattedCreatedAt}
                <span className="ml-1">{showUpdatedDate ? ' (Updated: ' + formattedUpdatedAt + ')' : ''}</span>
            </div>

            {/* Excerpt */}
            {truncatedExcerpt && (
                <div className="blog-card-excerpt text-sm tracking-wide">
                    <p className="text-primary">{truncatedExcerpt}</p>
                </div>
            )}

            {/* Read more link */}
            <div className="blog-card-read-more flex justify-end py-2.5">
                <Link
                    href={`/posts/${slug}`}
                    className="text-mid-gray font-semibold hover:text-secondary transition-colors duration-300 uppercase"
                >
                    read more
                </Link>
            </div>

            {/* Tags */}
            <PostCardTags tags={tags} />
        </div>
    )
}

export default BlogCard
