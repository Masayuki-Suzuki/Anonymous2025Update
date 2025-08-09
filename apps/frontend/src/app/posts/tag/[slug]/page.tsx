import { getClient } from '@/lib/apolloClient'
import {
    GetOneTagNameDocument,
    GetOneTagNameQuery,
    GetPostByTagSlugDocument,
    GetPostByTagSlugQuery,
} from '@/generated/graphql'
import CategoryPostsList from '@/components/templates/CategoryPostsList'

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ p?: string }>
}) {
    const searchParamsData = await searchParams
    const paramsData = await params

    const page = searchParamsData.p ? parseInt(searchParamsData.p, 10) : 1
    const slug = paramsData.slug
    const pagination = {
        page,
        pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 2,
    }
    const filters = {
        publishedAt: {
            ne: null,
        },
        tags: {
            slug: {
                in: slug,
            },
        },
    }

    // Use getClient to fetch the initial data
    // Note: We're not changing this function as per requirements
    const { data } = await getClient().query<GetPostByTagSlugQuery>({
        query: GetPostByTagSlugDocument,
        variables: {
            filters,
            pagination,
            sort: ['createdAt:desc'],
        },
    })

    const {
        data: { tags },
    } = await getClient().query<GetOneTagNameQuery>({
        query: GetOneTagNameDocument,
        variables: { slug },
    })

    const tagName = (tags && tags[0] && tags[0].name) || 'Uncategorized'

    return <CategoryPostsList initialPostData={data} page={page} tagName={tagName} slug={slug} />
}
