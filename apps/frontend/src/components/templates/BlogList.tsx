'use client'

import { useState, useEffect } from 'react'
import { BlogListProps } from '@/types/posts'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { usePostsLazyQuery } from '@/generated/graphql'

export default function BlogList({ initialPostData }: BlogListProps) {
    // Get pagination data from posts_connection
    const pageInfo = initialPostData.posts_connection?.pageInfo
    const initialPage = pageInfo?.page || 1
    const totalPages = pageInfo?.pageCount || 1

    // State to store the current posts data
    const [postsData, setPostsData] = useState(initialPostData)
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [loading, setLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Initialize the lazy query function, but only use it after component is mounted
    const [fetchPosts] = usePostsLazyQuery({
        onCompleted: (data) => {
            if (data && isMounted) {
                setPostsData(data)
                setLoading(false)
            }
        },
        onError: (error) => {
            if (isMounted) {
                console.error('Error fetching posts:', error)
                setLoading(false)
            }
        },
    })

    // Set isMounted to true after the component mounts
    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (!isMounted) return // Don't do anything if not mounted yet

        setCurrentPage(newPage)
        setLoading(true)
        fetchPosts({
            variables: {
                pagination: {
                    page: newPage,
                    pageSize: 2,
                },
            },
        })
    }

    return (
        <div>
            <div className="blog-list">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    postsData.posts.map((post) => post && <BlogCard key={post.documentId} post={post} />)
                )}
            </div>
            {pageInfo && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    )
}
