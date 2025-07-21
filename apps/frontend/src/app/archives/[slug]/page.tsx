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

    // Use getClient to fetch the initial data
    // Note: We're not changing this function as per requirements
    const { data } = await getClient().query<GetArchiveBySlugQuery>({
        query: GetArchiveBySlugDocument,
        variables: { slug: params.slug },
    })

    // If no archive is found, return a 404
    if (!data?.archives?.[0]) {
        return <ArchivesEmptyState />
    }

    // Pass the entire data object to the ArchivePostsLoader as initialArchiveData
    return <ArchivePostsLoader initialArchiveData={data} />
}
