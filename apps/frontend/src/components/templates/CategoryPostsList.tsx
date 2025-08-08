'use client'

import { useState } from 'react'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { CategoryPostListProps } from '@/types/posts'

export default function CategoryPostsList({ initialPostData, page, slug }: CategoryPostListProps) {
    // State to store the current archive data, page, loading state, and component mount state
    const [currentPage, setCurrentPage] = useState(page)

    // Number of posts to display per page - configurable
    // You can change this value to adjust the number of posts per page
    const postsPerPage = 2

    console.log(initialPostData)

    // Get the current archive from the state
    const posts = initialPostData?.posts || []
    const categoryName = slug || 'Uncategorized'

    // Calculate total posts and pages for client-side pagination
    const totalPosts = posts ? posts.length : 0
    const totalPages = Math.ceil(totalPosts / postsPerPage)

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts)

    // Get the posts for the current page
    const currentPosts = posts ? posts.slice(startIndex, endIndex) : []

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    if (!posts) {
        return <div>This category doesn't have any posts yet.</div>
    }

    return (
        <div>
            <h1 className="archive-title font-lato text-primary font-semibold text-2xl w-95pct mt-10 lg:mt-16">
                Category: <span className="capitalize font-normal">{categoryName}</span>
            </h1>
            <div className="flex flex-wrap w-95pct lg:gap-[5%] mt-10">
                {currentPosts.map(
                    (post, index) => post && <BlogCard key={post.documentId} post={post} index={index} />
                )}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    )
}
