import { getClient } from '@/lib/apolloClient'
import { GetRecentArticlesDocument, GetRecentArticlesQuery } from '@/generated/graphql'
import RecentPostsListContent from './RecentPostsListContent'

// This function fetches data during SSR
async function fetchRecentPosts() {
    const { data } = await getClient().query<GetRecentArticlesQuery>({
        query: GetRecentArticlesDocument,
    })
    return data
}

const RecentPostsList = async () => {
    // Fetch data during SSR
    const data = await fetchRecentPosts()

    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">recent posts</h3>
            <RecentPostsListContent data={data} />
        </div>
    )
}

export default RecentPostsList
