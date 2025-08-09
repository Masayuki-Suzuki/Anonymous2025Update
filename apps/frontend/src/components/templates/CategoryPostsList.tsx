'use client'

import { useState } from 'react'
import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { CategoryPostListProps } from '@/types/posts'
import { useRouter } from 'next/navigation'

export default function CategoryPostsList({ initialPostData, page, tagName, slug }: CategoryPostListProps) {
    // State to store the current archive data, page, loading state, and component mount state
    const router = useRouter()
    const { posts_connection } = initialPostData

    // Number of posts to display per page - configurable
    // You can change this value to adjust the number of posts per page
    const postsPerPage = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10

    console.log(initialPostData)

    // Get the current archive from the state
    const posts = initialPostData?.posts || []

    // Calculate total posts and pages for client-side pagination
    const totalPosts = posts_connection?.pageInfo?.total || 0
    const totalPages = posts_connection?.pageInfo.pageCount || Math.ceil(totalPosts / postsPerPage)

    // Handle page change
    // const handlePageChange = (newPage: number) => {
    //     void router.push(`/posts/tag/${slug}?p=${newPage}`)
    // }

    if (!posts) {
        return <div>This category doesn't have any posts yet.</div>
    }

    return (
        <div>
            <h1 className="archive-title font-lato text-primary font-semibold text-2xl w-95pct mt-10 lg:mt-16">
                Category: <span className="capitalize font-normal">{tagName}</span>
            </h1>
            <div className="flex flex-wrap w-95pct lg:gap-[5%] mt-10">
                {posts.map((post, index) => post && <BlogCard key={post.documentId} post={post} index={index} />)}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} baseUrl={`/posts/tag/${slug}?p=`} />
        </div>
    )
}
