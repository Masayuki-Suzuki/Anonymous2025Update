import { PostConnection } from '@/types/posts'

export type GetPostCountsAndPages = (
    postConnection: PostConnection | undefined | null,
    postPerPage: number
) => {
    totalPosts: number
    totalPages: number
}

// Calculate total posts and pages for client-side pagination
export const getPostCountsAndPages: GetPostCountsAndPages = (postConnection, postsPerPage = 1) => {
    const totalPosts = postConnection?.pageInfo?.total || 1
    const totalPages = postConnection?.pageInfo?.pageCount || Math.ceil(totalPosts / postsPerPage)

    return {
        totalPages,
        totalPosts,
    }
}
