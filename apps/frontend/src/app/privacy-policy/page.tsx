import { getClient } from '@/lib/apolloClient'
import { GetPrivacyPolicyContentDocument, GetPrivacyPolicyContentQuery } from '@/generated/graphql'
import PrivacyPolicyLoader from '@/components/loaders/PrivacyPolicyLoader'

export default async function PrivacyPolicyPage() {
    const { data } = await getClient().query<GetPrivacyPolicyContentQuery>({
        query: GetPrivacyPolicyContentDocument
    })

    return <PrivacyPolicyLoader initialPrivacyPolicyData={data} />
}
