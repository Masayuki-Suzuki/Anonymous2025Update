'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { GetArchiveBySlugQuery, useGetArchiveBySlugLazyQuery } from '@/generated/graphql'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { ArchivePostsLoaderProps } from '@/types/posts'

export default function ArchivePostsList({ initialArchiveData }: ArchivePostsLoaderProps) {
    // Get the initial archive data
    const initialArchive =
        initialArchiveData.archives && initialArchiveData.archives[0] ? initialArchiveData.archives[0] : undefined

    // Get the current page from URL query parameter "p"
    const searchParams = useSearchParams()
    const pageParam = searchParams ? searchParams.get('p') : null
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1

    // State to store the current archive data, page, loading state, and component mount state
    const [archiveData, setArchiveData] = useState(initialArchiveData)
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [loading, setLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Number of posts to display per page - configurable
    // You can change this value to adjust the number of posts per page
    const postsPerPage = 2

    // Get the current archive from the state
    const archive = archiveData.archives && archiveData.archives[0] ? archiveData.archives[0] : undefined

    // Calculate total posts and pages for client-side pagination
    const totalPosts = archive && archive.posts ? archive.posts.length : 0
    const totalPages = Math.ceil(totalPosts / postsPerPage)

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts)

    // Get the posts for the current page
    const currentPosts = archive && archive.posts ? archive.posts.slice(startIndex, endIndex) : []

    // Initialize the lazy query function, but only use it after a component is mounted
    const [fetchArchive, { data: archiveQueryData, loading: archiveQueryLoading, error: archiveQueryError }] =
        useGetArchiveBySlugLazyQuery()

    // Set isMounted to true after the component mounts
    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    // Handle data and error from the query
    useEffect(() => {
        if (isMounted) {
            if (archiveQueryData) {
                setArchiveData(archiveQueryData)
                setLoading(false)
            }
            if (archiveQueryError) {
                console.error('Error fetching archive:', archiveQueryError)
                setLoading(false)
            }
        }
    }, [archiveQueryData, archiveQueryError, isMounted])

    // Update loading state based on archiveQueryLoading
    useEffect(() => {
        if (isMounted) {
            setLoading(archiveQueryLoading)
        }
    }, [archiveQueryLoading, isMounted])

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (!isMounted) return // Don't do anything if not mounted yet

        setCurrentPage(newPage)

        // Only fetch new data if initialArchiveData doesn't have posts
        // This is because initialState already contains all posts, so we don't need to fetch again
        const hasInitialPosts =
            initialArchiveData.archives &&
            initialArchiveData.archives[0] &&
            initialArchiveData.archives[0].posts &&
            initialArchiveData.archives[0].posts.length > 0

        if (!hasInitialPosts && archive && archive.slug) {
            setLoading(true)
            void fetchArchive({
                variables: {
                    slug: archive.slug,
                },
            })
        }
    }

    if (!archive) {
        return <div>Archive not found</div>
    }

    return (
        <div>
            <h1 className="archive-title">{archive && archive.title}</h1>
            <div className="blog-list">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    currentPosts.map((post) => post && <BlogCard key={post.documentId} post={post} />)
                )}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    )
}
