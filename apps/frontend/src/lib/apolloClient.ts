import { HttpLink } from '@apollo/client'
import { registerApolloClient, ApolloClient, InMemoryCache, SSRMultipartLink } from '@apollo/client-integration-nextjs'

export const { getClient, query } = registerApolloClient(() => {
    const uri = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:1337/graphql'

	console.log('=====================================')
	console.log('=====================================')
	console.log(process.env.NEXT_PUBLIC_GRAPHQL_API_URL)
	console.log('=====================================')
	console.log('=====================================')


    const httpLink = new HttpLink({
        uri,
        fetchOptions: {
            mode: 'cors',
        },
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''}`,
        },
    })

    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Archive: {
                    fields: {
                        posts: {
                            merge(existing = [], incoming) {
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
        link:
            typeof window === 'undefined'
                ? new SSRMultipartLink({
                      stripDefer: true,
                      cutoffDelay: 5000,
                  }).split(() => true, httpLink)
                : httpLink,
    })
})
