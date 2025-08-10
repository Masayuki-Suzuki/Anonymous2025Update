import SearchResultCard from '../molecules/SearchResultCard'
import Pagination from '@/components/molecules/Pagination'
import { PostListPostsConnection } from '@/types/posts'

type SearchResultsListProps<T> = {
    initialPostData: T & PostListPostsConnection
    searchTerm: string
    page: number
    baseUrl: string
}

export default function SearchResultsList<T>({
    initialPostData,
    searchTerm,
    page,
    baseUrl,
}: SearchResultsListProps<T>) {
    const { posts_connection } = initialPostData

    // Number of posts to display per page - configurable
    // You can change this value to adjust the number of posts per page
    const postsPerPage = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 10

    // Get the current archive from the state
    const posts = initialPostData && 'posts' in initialPostData ? initialPostData.posts : []

    // Calculate total posts and pages for client-side pagination
    const totalPosts = posts_connection?.pageInfo?.total || 0
    const totalPages = posts_connection?.pageInfo.pageCount || Math.ceil(totalPosts / postsPerPage)

    if (!posts || !Array.isArray(posts)) {
        return (
            <div className="w-full md:w-95pct lg:gap-[5%] mt-10 lg:mt-16">
                <p className="text-center text-lg text-primary font-normal">
                    No results found for your search. Please try a different words.
                </p>
            </div>
        )
    }

    return (
        <>
            <h1 className="archive-title font-lato text-primary font-semibold text-2xl w-95pct mt-10 lg:mt-16">
                Search: <span className="capitalize font-normal">{searchTerm}</span>
            </h1>
            <div className="w-95pct lg:gap-[5%] mt-10">
                {posts.map((post) => post && <SearchResultCard key={post.documentId} post={post} />)}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} baseUrl={baseUrl} />
        </>
    )
}
