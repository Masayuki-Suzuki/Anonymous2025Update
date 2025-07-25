'use client'

import { useState, useEffect } from 'react'
import { BlogListProps } from '@/types/posts'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { usePostsQuery, PostsQuery, PostsQueryVariables } from '@/generated/graphql'

export default function BlogList({ initialPostData }: BlogListProps) {
    // Get pagination data from posts_connection
    const pageInfo = initialPostData.posts_connection?.pageInfo
    const initialPage = pageInfo?.page || 1
    const totalPages = pageInfo?.pageCount || 1
    console.log('initialPostData:', initialPostData)
    console.log('totalPages:', totalPages)

    // State to store the current page
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [isMounted, setIsMounted] = useState(false)

    // State to track if we're on the initial client-side render
    const [isInitialRender, setIsInitialRender] = useState(true)

    // Use usePostsQuery with variables that include the current page
    const { loading, error, data } = usePostsQuery({
        variables: {
            pagination: {
                page: currentPage,
                pageSize: 3,
            },
        },
        // Skip the query if:
        // 1. We're in SSR (window is undefined)
        // 2. The component is not mounted yet
        // 3. We're on the initial client-side render (to preserve server-side data)
        skip: typeof window === 'undefined' || !isMounted || isInitialRender,
        // Use the initial data for the first render
        notifyOnNetworkStatusChange: true,
    })

    // Log errors if they occur and the component is mounted
    useEffect(() => {
        if (error && isMounted) {
            console.error('Error fetching posts:', error)
        }
    }, [error, isMounted])

    // Use the fetched data or the initial data if no data is available yet
    const postsData = data || initialPostData

    // Set isMounted to true after the component mounts
    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
            setIsInitialRender(true) // Reset to true when unmounting
        }
    }, [])

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (!isMounted) return // Don't do anything if not mounted yet

        // Set isInitialRender to false to allow client-side fetching
        // This ensures we fetch new data when the user navigates to a different page
        if (isInitialRender) {
            setIsInitialRender(false)
        }

        // Update the currentPage state
        // This will cause usePostsQuery to re-execute with the new variables
        setCurrentPage(newPage)
    }

    return (
        <>
            <div className="flex flex-wrap w-full lg:gap-[5%]">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    postsData.posts.map((post) => post && <BlogCard key={post.documentId} post={post} />)
                )}
            </div>
            {pageInfo && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </>
    )
}
