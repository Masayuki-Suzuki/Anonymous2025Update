import { GetArchiveBySlugQuery, GetPostByTagSlugQuery, PostsQuery, SearchPostsQuery } from '@/generated/graphql'

export type BlogListProps = {
    initialPostData: PostsQuery | null
    initialPage?: number
}

export type PostsData = PostsQuery['posts']

export type ArchivePostsLoaderProps = {
    initialArchiveData: GetArchiveBySlugQuery
    page: number
}

export type CategoryPostListProps = {
    initialPostData: GetPostByTagSlugQuery
    page: number
    slug: string
}

export type PostTag = { name: string; slug: string } | null
export type PostTags = PostTag[]

export type PostThumbnailType =
    | {
          url: string
          alternativeText?: string | null
          width?: number | null
          height?: number | null
      }
    | undefined
    | null
