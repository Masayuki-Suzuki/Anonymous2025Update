'use client'

import ApolloWrapper from '@/lib/ApolloWrapper'
import { GetArchiveBySlugQuery, PostsQuery } from '@/generated/graphql'
import BlogCard from '../molecules/BlogCard'

// Define the props type for the component
interface ArchivePostsListProps {
    archive: NonNullable<GetArchiveBySlugQuery['archives'][number]>
}

export default function ArchivePostsList({ archive }: ArchivePostsListProps) {
    return (
        // <ApolloWrapper>
        <div>
            <h1 className="archive-title">{archive.title}</h1>
            <div className="blog-list">
                {archive.posts.map((post) => post && <BlogCard key={post.documentId} post={post} />)}
            </div>
        </div>
        // </ApolloWrapper>
    )
}
