import { getClient } from '@/lib/apolloClient'
import {
    GetOneTagNameDocument,
    GetOneTagNameQuery,
    GetPostByTagSlugDocument,
    GetPostByTagSlugQuery,
} from '@/generated/graphql'
import PostsList from '@/components/templates/PostsList'

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ p?: string }>
}) {
    const searchParamsData = await searchParams
    const paramsData = await params

    const page = searchParamsData.p ? Number(searchParamsData.p) : 1
    const slug = paramsData.slug
    const pagination = {
        page,
        pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 2,
    }
    const filters = {
        tags: {
            slug: {
                in: [slug],
            },
        },
    }

    const baseUrl = `/posts/tag/${slug}?p=`

    // Use getClient to fetch the initial data
    // Note: We're not changing this function as per requirements
    const { data } = await getClient().query<GetPostByTagSlugQuery>({
        query: GetPostByTagSlugDocument,
        variables: {
            filters,
            pagination,
            sort: ['createdAt:desc'],
            status: 'PUBLISHED',
        },
    })

    const {
        data: { tags },
    } = await getClient().query<GetOneTagNameQuery>({
        query: GetOneTagNameDocument,
        variables: { slug },
    })

    const tagName = (tags && tags[0] && tags[0].name) || 'Uncategorized'

    return <PostsList<GetPostByTagSlugQuery> initialPostData={data} page={page} title={tagName} baseUrl={baseUrl} />
}
