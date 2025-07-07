import { getClient } from '@/lib/apolloClient'
import { GetArchiveBySlugDocument, GetArchiveBySlugQuery } from '@/generated/graphql'
import { notFound } from 'next/navigation'
import ArchivePostsLoader from '@/components/loaders/ArchivePostsLoader'
import ArchivesEmptyState from '@/components/molecules/ArchivesEmptyState'

export default async function ArchivePage({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { p?: string }
}) {
    console.log('slug:', params.slug)
    console.log('page:', searchParams.p)

    const page = searchParams.p ? parseInt(searchParams.p, 10) : 1

    const { data } = await getClient().query<GetArchiveBySlugQuery>({
        query: GetArchiveBySlugDocument,
        variables: { slug: params.slug, pagination: { page, pageSize: 2 } },
    })

    // Get the first archive from the result (should be the only one since we filtered by slug)
    const archive = data?.archives?.[0]

    // If no archive is found, return a 404
    if (!archive) {
        return <ArchivesEmptyState />
    }

    // Since we can't paginate at the GraphQL level, we'll paginate at the component level
    // We'll pass the current page to the ArchivePostsLoader
    return <ArchivePostsLoader archive={archive} currentPage={page} />
}
