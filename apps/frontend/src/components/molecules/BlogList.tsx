'use client'
import { PostsQuery, useGetArchiveBySlugLazyQuery, usePostsLazyQuery } from '@/generated/graphql'
import { useEffect, useState } from 'react'
import BlogCard from '@/components/molecules/BlogCard'
import BlogPostPagination from '@/components/molecules/BlogPostPagination'
import ApolloWrapper from '@/lib/ApolloWrapper'

interface BlogListProps {
    initialPostData: PostsQuery | null
}

type PageInfo = NonNullable<PostsQuery['posts_connection']>['pageInfo']

function BlogList({ initialPostData }: BlogListProps) {
    const [postData, setPostData] = useState<PostsQuery | null>(initialPostData)
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (initialPostData) {
            if ('posts_connection' in initialPostData && initialPostData.posts_connection) {
                setPageInfo(initialPostData.posts_connection.pageInfo)
                setCurrentPage(initialPostData.posts_connection.pageInfo.page)
                const pageSize = initialPostData.posts_connection.pageInfo.pageSize || 1
                const totalPosts = initialPostData.posts_connection.pageInfo.total || 1
                setTotalPages(Math.ceil(totalPosts / pageSize))
            }
        }
    }, [initialPostData])

    return (
        <>
            <div className="flex flex-wrap w-full md:w-95pct lg:gap-[5%] mt-10 lg:mt-16">
                {postData &&
                    postData.posts.map(
                        (post, index) => post && <BlogCard key={post.documentId} post={post} index={index} />
                    )}
            </div>
            {pageInfo && (
                <ApolloWrapper>
                    <BlogPostPagination currentPage={currentPage} totalPages={totalPages} setPostData={setPostData} />
                </ApolloWrapper>
            )}
        </>
    )
}

export default BlogList
