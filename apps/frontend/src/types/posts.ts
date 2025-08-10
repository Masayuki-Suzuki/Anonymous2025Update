export type PostListPostsConnection = {
    posts_connection?:
        | {
              __typename?: string | undefined
              pageInfo: {
                  __typename?: string | undefined
                  page?: number
                  pageSize?: number
                  pageCount?: number
                  total?: number
              }
          }
        | null
        | undefined
}

export type PostListProps<T> = {
    initialPostData: T & PostListPostsConnection
    page: number
    title: string
    baseUrl: string
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
