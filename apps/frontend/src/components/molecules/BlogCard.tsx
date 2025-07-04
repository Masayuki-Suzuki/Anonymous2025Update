'use client'

import { PostsQuery, SearchPostsQuery } from '@/generated/graphql'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { getFormattedDates } from '@/lib/dateUtils'

// Union type to handle both query types
type PostType = NonNullable<PostsQuery['posts'][number]> | NonNullable<SearchPostsQuery['posts'][number]>

type BlogCardProps = {
    post: PostType
}

const BlogCard = ({ post }: BlogCardProps) => {
    // Use optional chaining to handle potentially missing fields
    const { title, thumbnail, excerpt, tags, createdAt, updatedAt, documentId, slug } = post

    // Strapi base URL - can be changed when deployed to Google Compute Engine
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

    const { formattedCreatedAt, formattedUpdatedAt, showUpdatedDate } = getFormattedDates(createdAt, updatedAt)

    // Truncate title if it's too long (approximately 100 characters)
    const truncatedTitle = title.length > 100 ? `${title.substring(0, 100)}...` : title

    // Truncate excerpt if it's too long (approximately 300 characters)
    // Handle case where excerpt might be undefined in SearchPostsQuery
    const truncatedExcerpt = excerpt && excerpt.length > 300 ? `${excerpt.substring(0, 300)}...` : excerpt

    return (
        <div className="blog-card">
            {/* Thumbnail image */}
            {thumbnail && thumbnail.url && (
                <div className="blog-card-thumbnail">
                    <Image
                        src={`${strapiBaseUrl}${thumbnail.url}`}
                        alt={thumbnail.alternativeText || title}
                        width={thumbnail.width}
                        height={thumbnail.height}
                    />
                </div>
            )}

            {/* Title */}
            <h2 className="blog-card-title">{truncatedTitle}</h2>

            {/* Date information */}
            <div className="blog-card-date">
                {formattedCreatedAt}
                {showUpdatedDate ? ' (Updated: ' + formattedUpdatedAt + ')' : ''}
            </div>

            {/* Excerpt */}
            {truncatedExcerpt && (
                <div className="blog-card-excerpt">
                    <p>{truncatedExcerpt}</p>
                </div>
            )}

            {/* Read more link */}
            <div className="blog-card-read-more">
                <Link href={slug ? `/post/${slug}` : `/post/${documentId}`}>READ MORE</Link>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="blog-card-tags">
                    <FontAwesomeIcon icon={faTag} />
                    <div className="blog-card-tags-list">
                        {tags.map((tag, index) =>
                            tag ? (
                                <span key={tag.slug} className="blog-card-tag">
                                    {tag.name}
                                </span>
                            ) : null
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default BlogCard
