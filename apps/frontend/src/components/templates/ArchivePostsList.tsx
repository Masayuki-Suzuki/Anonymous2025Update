'use client'

import { useState } from 'react'
import { GetArchiveBySlugQuery, PostsQuery } from '@/generated/graphql'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'

// Define the props type for the component
interface ArchivePostsListProps {
    archive: NonNullable<GetArchiveBySlugQuery['archives'][number]>
    currentPage: number
}

export default function ArchivePostsList({ archive, currentPage: initialPage }: ArchivePostsListProps) {
    // State to store the current page
    const [currentPage, setCurrentPage] = useState(initialPage)

    // Since we don't have pagination data from the GraphQL query,
    // we'll implement client-side pagination
    const postsPerPage = 10 // Define how many posts to show per page
    const totalPosts = archive.posts.length
    const totalPages = Math.ceil(totalPosts / postsPerPage)

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts)

    // Get the posts for the current page
    const currentPosts = archive.posts.slice(startIndex, endIndex)

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    return (
        <div>
            <h1 className="archive-title">{archive.title}</h1>
            <div className="blog-list">
                {currentPosts.map((post) => post && <BlogCard key={post.documentId} post={post} />)}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    )
}
