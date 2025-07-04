'use client'

import dynamic from 'next/dynamic'
import { GetPrivacyPolicyContentQuery } from '@/generated/graphql'

interface PrivacyPolicyLoaderProps {
    initialPrivacyPolicyData: GetPrivacyPolicyContentQuery
}

const PrivacyPolicy = dynamic(() => import('../templates/PrivacyPolicy'), { ssr: true })

export default function PrivacyPolicyLoader({ initialPrivacyPolicyData }: PrivacyPolicyLoaderProps) {
    return <PrivacyPolicy initialPrivacyPolicyData={initialPrivacyPolicyData} />
}
