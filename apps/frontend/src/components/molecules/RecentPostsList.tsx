import { GetRecentArticlesDocument, GetRecentArticlesQuery } from '@/generated/graphql'
import { fetchData } from '@/lib/dataFetcher'
import ListWrapper from '../atoms/ListWrapper'
import RecentPostsListContent from './RecentPostsListContent'

const RecentPostsList = async () => {
    // Fetch data using the common data fetcher
    const data = await fetchData<GetRecentArticlesQuery>(GetRecentArticlesDocument)

    return (
        <ListWrapper title="recent posts">
            <RecentPostsListContent data={data} />
        </ListWrapper>
    )
}

export default RecentPostsList
