import { getClient } from '@/lib/apolloClient'
import { GetPrivacyPolicyContentDocument, GetPrivacyPolicyContentQuery } from '@/generated/graphql'
import PrivacyPolicy from '@/components/templates/PrivacyPolicy'

export default async function PrivacyPolicyPage() {
    const { data } = await getClient().query<GetPrivacyPolicyContentQuery>({
        query: GetPrivacyPolicyContentDocument,
    })

    return <PrivacyPolicy initialPrivacyPolicyData={data} />
}
