import { getClient } from '@/lib/apolloClient'
import { AboutDocument, AboutQuery } from '@/generated/graphql'
import About from '@/components/templates/About'

export default async function AboutPage() {
    const { data } = await getClient().query<AboutQuery>({
        query: AboutDocument,
    })

    return <About initialAboutData={data} />
}
