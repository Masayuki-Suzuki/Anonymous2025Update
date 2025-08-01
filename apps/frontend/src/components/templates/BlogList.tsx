'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { BlogListProps } from '@/types/posts'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { usePostsQuery, PostsQuery, PostsQueryVariables } from '@/generated/graphql'

export default function BlogList({ initialPostData, initialPage }: BlogListProps) {
    // Get pagination data from posts_connection
    const pageInfo = initialPostData?.posts_connection?.pageInfo
    const pageFromProps = initialPage || pageInfo?.page || 1
    const totalPages = pageInfo?.pageCount || 1

    // Next.js navigation hooks
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // State to store the current page
    const [currentPage, setCurrentPage] = useState(pageFromProps)
    const [isMounted, setIsMounted] = useState(false)

    // State to track if we're on the initial client-side render
    const [isInitialRender, setIsInitialRender] = useState(true)

    // Use usePostsQuery with variables that include the current page
    const { loading, error, data } = usePostsQuery({
        variables: {
            pagination: {
                page: currentPage,
                pageSize: 2, // Use consistent page size with server-side query
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

    // Update URL without page reload when page changes
    useEffect(() => {
        if (!isMounted || (currentPage === pageFromProps && isInitialRender)) return

        // Create new URLSearchParams object
        const params = new URLSearchParams(searchParams.toString())

        // Update or add the page parameter
        params.set('p', currentPage.toString())

        // Update URL without causing a page reload
        window.history.replaceState(null, '', `${pathname}?${params.toString()}`)
    }, [currentPage, isMounted, isInitialRender, pathname, searchParams, pageFromProps])

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
                ) : error ? (
                    <div>Error loading posts. Please try again.</div>
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
