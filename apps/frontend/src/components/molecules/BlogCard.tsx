'use client'

import { PostsQuery, SearchPostsQuery } from '@/generated/graphql'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { getFormattedDates } from '@/lib/dateUtils'

// Union type to handle both query types with proper type safety
// Create a merged type that makes properties only in PostsQuery optional
type PostType = {
    // Common properties in both query types
    documentId: string
    title: string
    slug: string
    createdAt?: any | null
    updatedAt?: any | null
    tags: Array<{ name: string; slug: string } | null>

    // Properties only in PostsQuery that need to be optional
    excerpt?: string | null
    thumbnail?: {
        url: string
        alternativeText?: string | null
        width?: number | null
        height?: number | null
    } | null
}

type BlogCardProps = {
    post: PostType
}

const BlogCard = ({ post }: BlogCardProps) => {
    // Use optional chaining to handle potentially missing fields
    const { title, thumbnail, excerpt, tags, createdAt, updatedAt, slug } = post

    // Strapi base URL - can be changed when deployed to Google Compute Engine
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

    const { formattedCreatedAt, formattedUpdatedAt, showUpdatedDate } = getFormattedDates(createdAt, updatedAt)

    // Truncate title if it's too long (approximately 100 characters)
    const truncatedTitle = title.length > 100 ? `${title.substring(0, 100)}...` : title

    // Truncate excerpt if it's too long (approximately 300 characters)
    // Handle case where excerpt might be undefined in SearchPostsQuery
    const truncatedExcerpt = excerpt && excerpt.length > 300 ? `${excerpt.substring(0, 300)}...` : excerpt

    return (
        <div className="blog-card mt-10 md:mt-16 w-95pct lg:w-45pct">
            {/* Thumbnail image */}
            {thumbnail && thumbnail.url && (
                <div className="blog-card-thumbnail aspect-[16/10] overflow-hidden">
                    <Image
                        src={`${strapiBaseUrl}${thumbnail.url}`}
                        alt={thumbnail.alternativeText || title}
                        width={thumbnail.width || 0}
                        height={thumbnail.height || 0}
                        className="max-w-full mx-auto w-full h-full object-cover object-center"
                    />
                </div>
            )}

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
            {tags.length > 0 && (
                <div className="blog-card-tags border-t border-gray flex items-center leading-0 py-2.5">
                    <FontAwesomeIcon icon={faTag} color="#777" />
                    <div className="blog-card-tags-list flex items-center flex-wrap text-xs ml-2.5 gap-2.5">
                        {tags.map((tag) =>
                            tag ? (
                                <Link
                                    href={`/posts/tags/${tag.slug}`}
                                    key={tag.slug}
                                    className="text-mid-gray hover:text-secondary transition-colors duration-300"
                                >
                                    <span className="blog-card-tag uppercase leading-none">{tag.name}</span>
                                </Link>
                            ) : null
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default BlogCard
