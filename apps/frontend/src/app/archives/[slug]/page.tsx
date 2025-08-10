import { getClient } from '@/lib/apolloClient'
import { GetArchiveBySlugDocument, GetArchiveBySlugQuery } from '@/generated/graphql'
import PostsList from '@/components/templates/PostsList'

export default async function ArchivePage({
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
        pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 2, // You can adjust this value as needed
    }
    const filters = {
        archive: {
            slug: {
                in: [slug],
            },
        },
    }

    const baseUrl = `/archives/${slug}?p=`

    const { data } = await getClient().query<GetArchiveBySlugQuery>({
        query: GetArchiveBySlugDocument,
        variables: {
            filters,
            pagination,
            sort: ['createdAt:desc'],
            status: 'PUBLISHED',
        },
    })

    const archiveName = slug.replace('-', ' ')

    return <PostsList<GetArchiveBySlugQuery> initialPostData={data} page={page} title={archiveName} baseUrl={baseUrl} />
}
