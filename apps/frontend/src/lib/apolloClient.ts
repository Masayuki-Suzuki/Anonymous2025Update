import { HttpLink } from '@apollo/client'
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Archive: {
                    fields: {
                        posts: {
                            merge(existing = [], incoming, { readField }) {
                                if (incoming && incoming.length > 0) {
                                    return incoming
                                }

                                return existing
                            },
                        },
                    },
                },
            },
        }),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:1337/graphql',
            fetchOptions: {
                mode: 'cors',
            },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''}`,
            },
        }),
    })
})
