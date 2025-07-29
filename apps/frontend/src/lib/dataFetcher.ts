import { getClient } from './apolloClient'
import { DocumentNode } from '@apollo/client'

/**
 * Generic data fetcher function for GraphQL queries
 * @param query - GraphQL query document
 * @param variables - Query variables (optional)
 * @returns The query data
 */
export async function fetchData<T>(query: DocumentNode, variables = {}) {
    const { data } = await getClient().query<T>({
        query,
        variables,
    })
    return data
}
