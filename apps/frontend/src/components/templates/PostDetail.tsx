'use client'

import { GetOneArticleQuery, useGetOneArticleQuery } from '@/generated/graphql'
import { getFormattedDates } from '@/lib/dateUtils'
import ApolloWrapper from '@/lib/ApolloWrapper'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Markdown from 'markdown-to-jsx'
import {
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    BlueskyShareButton,
    FacebookIcon,
    LinkedinIcon,
    BlueskyIcon,
    XIcon,
} from 'react-share'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

// Define the props type for the component
interface PostDetailProps {
    initialPostData?: GetOneArticleQuery
    slug: string
}

export default function PostDetail({ initialPostData, slug }: PostDetailProps) {
    const [url, setUrl] = useState<string>('')

    // Set the URL for sharing once the component is mounted
    useEffect(() => {
        setUrl(window.location.href)
    }, [])

    // Get the first post from the result (should be the only one since we filtered by slug)
    let post = initialPostData?.posts?.[0]

    // Use the Apollo Client hook to fetch the post data if not provided
    if (!post) {
        const { data, loading, error } = useGetOneArticleQuery({
            variables: { slug },
            // skip: !!initialPostData, // Skip the query if initialPostData is provided
            // skip feature does not work.
        })

        if (error) {
            console.error('Error fetching post:', error)
            notFound()
        }

        post = data?.posts?.[0] // Get the first post from the fetched data

        if (!post) {
            notFound() // If no post is found, return a 404
        }
    }

    // Strapi base URL
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

    // Format dates
    const { formattedCreatedAt, formattedUpdatedAt, showUpdatedDate } = getFormattedDates(
        post.createdAt,
        post.updatedAt
    )

    return (
        <ApolloWrapper>
            <article className="post-detail">
                {/* Thumbnail */}
                {post.thumbnail && post.thumbnail.url && (
                    <div className="post-thumbnail">
                        <Image
                            src={`${strapiBaseUrl}${post.thumbnail.url}`}
                            alt={post.thumbnail.alternativeText || post.title}
                            width={Number(post.thumbnail.width)}
                            height={Number(post.thumbnail.height)}
                        />
                    </div>
                )}

                {/* Title */}
                <h1 className="post-title">{post.title}</h1>

                {/* Date and Tags */}
                <div className="post-meta">
                    <div className="post-date">
                        {formattedCreatedAt.toUpperCase()}
                        {showUpdatedDate ? ` (updated: ${formattedUpdatedAt.toUpperCase()})` : ''}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="post-tags">
                            <FontAwesomeIcon icon={faTag} />
                            <div className="post-tags-list">
                                {post.tags.slice(0, 3).map((tag) =>
                                    tag ? (
                                        <Link key={tag.slug} href={`/tags/${tag.slug}`} className="post-tag">
                                            {tag.name}
                                        </Link>
                                    ) : null
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                {post.content ? (
                    <div className="post-content">
                        <Markdown>{post.content}</Markdown>
                    </div>
                ) : (
                    <p>No content exist... </p>
                )}

                {/* Social Share Buttons */}
                <div className="social-share">
                    {/* X (Twitter) */}
                    <TwitterShareButton url={url} title={post.title}>
                        <XIcon size={32} round />
                    </TwitterShareButton>

                    {/* Facebook */}
                    <FacebookShareButton url={url} hashtag={post.title}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    {/* LinkedIn */}
                    <LinkedinShareButton url={url} title={post.title}>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>

                    {/* Bluesky */}
                    <BlueskyShareButton url={url} title={post.title}>
                        <BlueskyIcon size={32} round />
                    </BlueskyShareButton>
                </div>
            </article>
        </ApolloWrapper>
    )
}
