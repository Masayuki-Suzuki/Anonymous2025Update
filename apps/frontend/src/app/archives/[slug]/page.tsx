import { getClient } from '@/lib/apolloClient'
import { GetArchiveBySlugDocument, GetArchiveBySlugQuery } from '@/generated/graphql'
import { notFound } from 'next/navigation'
import ArchivePostsLoader from '@/components/loaders/ArchivePostsLoader'

export default async function ArchivePage({ params }: { params: { slug: string } }) {
    console.log('slug:', params.slug)
    const { data } = await getClient().query<GetArchiveBySlugQuery>({
        query: GetArchiveBySlugDocument,
        variables: { slug: params.slug },
    })

    // Get the first archive from the result (should be the only one since we filtered by slug)
    const archive = data?.archives?.[0]

    // If no archive is found, return a 404
    if (!archive) {
        notFound()
    }

    return <ArchivePostsLoader archive={archive} />
}
