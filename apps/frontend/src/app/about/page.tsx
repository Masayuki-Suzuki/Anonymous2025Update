import { getClient } from '@/lib/apolloClient'
import { AboutDocument, AboutQuery } from '@/generated/graphql'
import AboutLoader from '@/components/loaders/AboutLoader'

export default async function AboutPage() {
    const { data } = await getClient().query<AboutQuery>({
        query: AboutDocument,
    })

    return <AboutLoader initialAboutData={data} />
}
