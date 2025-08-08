'use client'

import { useState } from 'react'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { ArchivePostsLoaderProps } from '@/types/posts'

export default function ArchivePostsList({ initialArchiveData, page }: ArchivePostsLoaderProps) {
    // State to store the current archive data, page, loading state, and component mount state
    const [currentPage, setCurrentPage] = useState(page)

    // Number of posts to display per page - configurable
    // You can change this value to adjust the number of posts per page
    const postsPerPage = 2

    // Get the current archive from the state
    const archive =
        initialArchiveData.archives && initialArchiveData.archives[0] ? initialArchiveData.archives[0] : undefined

    // Calculate total posts and pages for client-side pagination
    const totalPosts = archive && archive.posts ? archive.posts.length : 0
    const totalPages = Math.ceil(totalPosts / postsPerPage)

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts)

    // Get the posts for the current page
    const currentPosts = archive && archive.posts ? archive.posts.slice(startIndex, endIndex) : []

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    if (!archive) {
        return <div>Archive not found</div>
    }

    return (
        <div>
            <h1 className="archive-title font-lato text-primary font-semibold text-2xl w-95pct lg:w-full mt-10 lg:mt-16">
                Archive: <span className="capitalize font-normal">{archive && archive.title}</span>
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
