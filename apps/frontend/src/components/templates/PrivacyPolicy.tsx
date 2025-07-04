'use client'

import { useState, useEffect } from 'react'
import ApolloWrapper from '@/lib/ApolloWrapper'
import { GetPrivacyPolicyContentQuery, useGetPrivacyPolicyContentQuery } from '@/generated/graphql'
import Markdown from 'markdown-to-jsx'

interface PrivacyPolicyProps {
    initialPrivacyPolicyData: GetPrivacyPolicyContentQuery
}

// Markdown components configuration
const markdownOptions = {
    overrides: {
        // You can customize the rendering of specific HTML elements here
        h1: {
            component: (props: any) => <h1 className="text-2xl font-bold my-4" {...props} />
        },
        h2: {
            component: (props: any) => <h2 className="text-xl font-bold my-3" {...props} />
        },
        h3: {
            component: (props: any) => <h3 className="text-lg font-bold my-2" {...props} />
        },
        p: {
            component: (props: any) => <p className="my-2" {...props} />
        },
        ul: {
            component: (props: any) => <ul className="list-disc ml-5 my-2" {...props} />
        },
        ol: {
            component: (props: any) => <ol className="list-decimal ml-5 my-2" {...props} />
        },
        li: {
            component: (props: any) => <li className="my-1" {...props} />
        },
        a: {
            component: (props: any) => <a className="text-blue-500 hover:underline" {...props} />
        }
    }
}

export default function PrivacyPolicy({ initialPrivacyPolicyData }: PrivacyPolicyProps) {
    const [isClient, setIsClient] = useState(false)
    const initialContent = initialPrivacyPolicyData?.privacyPolicy?.content || null

    // Only set isClient to true on the client side
    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div>
            <h2>Privacy Policy</h2>
            {initialContent ? (
                <Markdown options={markdownOptions}>
                    {initialContent}
                </Markdown>
            ) : (
                <div>Loading content...</div>
            )}

            {/* Only render ApolloWrapper on the client side to avoid SSR issues */}
            {isClient && (
                <ApolloWrapper>
                    <ClientSideUpdater initialContent={initialContent} />
                </ApolloWrapper>
            )}
        </div>
    )
}

// This component only runs on the client side to check for updated content
function ClientSideUpdater({ initialContent }: { initialContent: string | null }) {
    const { data } = useGetPrivacyPolicyContentQuery({
        // Skip the query if we already have content from SSR
        skip: !!initialContent
    })

    // If we have new data from the client side that's different from the initial data,
    // we could update the UI here, but for now we'll just return null
    // This prevents unnecessary API calls while still supporting client-side updates if needed

    return null
}
