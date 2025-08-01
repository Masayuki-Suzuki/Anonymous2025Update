'use client'

import { useEffect, useState } from 'react'
import PaginationButton from '../atoms/PaginationButton'
import usePagination from '@/lib/usePagination'
import { PostsQuery, usePostsLazyQuery } from '@/generated/graphql'
import { useSearchParams } from 'next/navigation'

interface BlogPostPaginationProps {
    currentPage: number
    totalPages: number
    setPostData: (data: PostsQuery | null) => void
}

export default function BlogPostPagination({ currentPage, totalPages, setPostData }: BlogPostPaginationProps) {
    const updateUrlWithoutNavigation = usePagination()
    const [fetchPosts] = usePostsLazyQuery()
    const searchParams = useSearchParams()

    // Local state to track current page
    const [page, setPage] = useState(currentPage)

    const updatePage = (newPage: number, withURL = true) => {
        setPage(newPage)
        if (withURL) {
            updateUrlWithoutNavigation(newPage)
        }
        void onPageChange(newPage)
    }

    useEffect(() => {
        const newPage = Number(searchParams.get('p')) || 1
        updatePage(newPage, false)
    }, [searchParams])

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage === page || newPage < 1 || newPage > totalPages) return
        updatePage(newPage)
    }

    async function onPageChange(newPage: number) {
        const { data } = await fetchPosts({
            variables: {
                pagination: {
                    page: newPage,
                    pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10, // You can adjust this value as needed
                },
            },
        })

        if (data) {
            setPostData(data)
        }
    }

    return (
        <div className="pagination mt-12 flex items-center justify-end py-5 px-3 w-95pct border-y border-gray gap-4">
            <PaginationButton direction="left" onClick={() => handlePageChange(page - 1)} disabled={page <= 1} />
            <span className="font-lato text-mid-gray text-xl leading-none tracking-widest">
                {page}/{totalPages}
            </span>
            <PaginationButton
                direction="right"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
            />
        </div>
    )
}
