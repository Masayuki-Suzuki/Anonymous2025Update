'use client'

import ApolloWrapper from '@/lib/ApolloWrapper'
import { useTagsQuery } from '@/generated/graphql'
import CategoryItem from '../atoms/CategoryItem'

const CategoryListContent = () => {
    const { data, loading, error } = useTagsQuery()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data || !data.tags || data.tags.length === 0) {
        return <p>No categories found</p>
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

const ClientCategoryList = () => {
    return (
        <ApolloWrapper>
            <CategoryListContent />
        </ApolloWrapper>
    )
}

export default ClientCategoryList
