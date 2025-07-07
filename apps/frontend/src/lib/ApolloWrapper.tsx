'use client'
import { HttpLink } from '@apollo/client'
import { ApolloClient, ApolloNextAppProvider, InMemoryCache, SSRMultipartLink } from '@apollo/client-integration-nextjs'
import React from 'react'

export default function ApolloWrapper({ children }: React.PropsWithChildren) {
    const createApolloClient = () => {
        const httpLink = new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:1337/graphql',
            fetchOptions: {
                mode: 'cors',
            },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''}`,
            },
        })

        return new ApolloClient({
            cache: new InMemoryCache(),
            link: typeof window === 'undefined'
                ? new SSRMultipartLink({
                    stripDefer: true,
                    cutoffDelay: 5000,
                  }).split(
                    () => true,
                    httpLink,
                  )
                : httpLink,
        })
    }

    return <ApolloNextAppProvider makeClient={createApolloClient}>{children}</ApolloNextAppProvider>
}
