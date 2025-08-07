import { getClient } from '@/lib/apolloClient'
import { GetPostByTagSlugDocument, GetPostByTagSlugQuery } from '@/generated/graphql'
import ArchivePostsList from '@/components/templates/ArchivePostsList'
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

    // Use getClient to fetch the initial data
    // Note: We're not changing this function as per requirements
    const { data } = await getClient().query<GetPostByTagSlugQuery>({
        query: GetPostByTagSlugDocument,
        variables: { slug },
    })

    return <CategoryPostsList initialPostData={data} page={page} />
}
