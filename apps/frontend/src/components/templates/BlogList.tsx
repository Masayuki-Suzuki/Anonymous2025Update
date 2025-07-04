'use client'

import ApolloWrapper from '@/lib/ApolloWrapper'
import { PostsQuery, SearchPostsQuery } from '@/generated/graphql'
import { BlogListProps } from '@/types/posts'
import BlogCard from '../molecules/BlogCard'

export default function BlogList({ initialPostData }: BlogListProps) {
    console.log('BlogList posts:', initialPostData)
    return (
        <ApolloWrapper>
            <div>
                <div className="blog-list">
                    {initialPostData.posts.map((post) => post && <BlogCard key={post.documentId} post={post} />)}
                </div>
            </div>
        </ApolloWrapper>
    )
}
