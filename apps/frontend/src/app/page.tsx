import { gql, useQuery } from '@apollo/client'
import { getClient } from '@/lib/apolloClient'

const GET_ARTICLES = gql`
    query Posts {
        posts {
            documentId
            title
            excerpt
        }
    }
`

export default async function Home() {
    const { data, loading, error } = await getClient().query({ query: GET_ARTICLES })

    return (
        <div>
            <h1>Articles</h1>
            <ul>
                {data.posts.map((article: any) => (
                    <li key={article.documentId}>{article.title}</li>
                ))}
            </ul>
        </div>
    )
}
