import { TagsDocument, TagsQuery } from '@/generated/graphql'
import { fetchData } from '@/lib/dataFetcher'
import ListWrapper from '../atoms/ListWrapper'
import CategoryListContent from './CategoryListContent'

const CategoryList = async () => {
    // Fetch data using the common data fetcher
    const data = await fetchData<TagsQuery>(TagsDocument)

    return (
        <ListWrapper title="categories">
            <CategoryListContent data={data} />
        </ListWrapper>
    )
}

export default CategoryList
