import BlogCard from '../molecules/BlogCard'
import Pagination from '../molecules/Pagination'
import { PostListProps } from '@/types/posts'

export default function PostsList<T>({ initialPostData, page, title, baseUrl }: PostListProps<T>) {
    const { posts_connection } = initialPostData

    // Number of posts to display per page - configurable
    // You can change this value to adjust the number of posts per page
    const postsPerPage = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10

    // Get the current archive from the state
    const posts = initialPostData && 'posts' in initialPostData ? initialPostData.posts : []

    // Calculate total posts and pages for client-side pagination
    const totalPosts = posts_connection?.pageInfo?.total || 1
    const totalPages = posts_connection?.pageInfo.pageCount || Math.ceil(totalPosts / postsPerPage)

    if (!posts || !Array.isArray(posts)) {
        return <div>This category doesn't have any posts yet.</div>
    }

    return (
        <div>
            {title && (
                <h1 className="archive-title font-lato text-primary font-semibold text-2xl w-95pct mt-10 lg:mt-16">
                    Category: <span className="capitalize font-normal">{title}</span>
                </h1>
            )}
            <div className={`flex flex-wrap md:w-95pct lg:gap-[5%] mt-10 ${!title && 'lg:mt-16'}`}>
                {posts.map((post, index) => post && <BlogCard key={post.documentId} post={post} index={index} />)}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} baseUrl={baseUrl} />
        </div>
    )
}
