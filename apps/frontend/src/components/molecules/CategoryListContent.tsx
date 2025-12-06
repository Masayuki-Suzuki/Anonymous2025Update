import CategoryItem from '../atoms/CategoryItem'
import EmptyState from '../atoms/EmptyState'
import { TagsQuery } from '@/generated/graphql'

type CategoryListContentProps = {
    data: TagsQuery | undefined
}

/**
 * CategoryListContent component - displays the list of categories
 */
const CategoryListContent = ({ data }: CategoryListContentProps) => {
    if (!data || !data.tags || data.tags.length === 0) {
        return <EmptyState message="No categories" />
    }

    return (
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
}

export default CategoryListContent
