import { GetPrivacyPolicyContentQuery } from '@/generated/graphql'
import MarkDownWrapper from '@/components/atoms/MarkDownWrapper'
import { notFound } from 'next/navigation'

interface PrivacyPolicyProps {
    initialPrivacyPolicyData: GetPrivacyPolicyContentQuery
}

export default function PrivacyPolicy({ initialPrivacyPolicyData }: PrivacyPolicyProps) {
    const content = initialPrivacyPolicyData?.privacyPolicy?.content || null

    if (!content) {
        notFound()
    }

    return (
        <article className="post-detail mt-10 sm:mt-14 md:mt-10 lg:mt-16 mx-auto md:mx-0 w-full md:w-95pct">
            <h1 className="text-2xl lg:text-3xl font-normal mt-10 mb-1 text-primary leading-ex-tight tracking-wide uppercase border-b border-gray pb-2 mb-6">
                Privacy Policy & Disclaimer
            </h1>
            <MarkDownWrapper>{content}</MarkDownWrapper>
        </article>
    )
}
