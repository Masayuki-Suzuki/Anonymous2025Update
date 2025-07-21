import { GetArchiveBySlugQuery, PostsQuery, SearchPostsQuery } from '@/generated/graphql'

export type BlogListProps = {
    initialPostData: PostsQuery
}

export type ArchivePostsLoaderProps = {
    initialArchiveData: GetArchiveBySlugQuery
}

export type PageInfo = {
    page: number
    pageCount: number
    pageSize: number
    total: number
}
