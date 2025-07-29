import { getClient } from '@/lib/apolloClient'
import { TagsDocument, TagsQuery } from '@/generated/graphql'
import CategoryItem from '../atoms/CategoryItem'

// This function fetches data during SSR
async function fetchTags() {
    const { data } = await getClient().query<TagsQuery>({
        query: TagsDocument,
    })
    return data
}

const CategoryList = async () => {
    // Fetch data during SSR
    const data = await fetchTags()

    // Determine the content based on data availability
    const content =
        !data || !data.tags || data.tags.length === 0 ? (
            <p>No categories</p>
        ) : (
            <div>
                {data.tags.map(
                    (tag) =>
                        tag && (
                            <CategoryItem
                                key={tag.documentId}
                                name={tag.name}
                                slug={tag.slug}
                                postCount={tag.posts.length}
                            />
                        )
                )}
            </div>
        )

    // Return with common wrapper and title
    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">categories</h3>
            {content}
        </div>
    )
}

export default CategoryList
