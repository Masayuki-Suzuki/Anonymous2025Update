'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const CategoryListPlaceholder = () => {
    return <p className="text-center py-4">Loading categories...</p>
}

// Dynamically import the actual CategoryList component with ssr: false
// This ensures that both ApolloWrapper and Apollo hooks are only used on the client side
const ClientCategoryList = dynamic(() => import('./ClientCategoryList'), {
    ssr: false,
    loading: () => <CategoryListPlaceholder />,
})

const CategoryList = () => {
    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">categories</h3>
            {/*<CategoryListPlaceholder />*/}
            <ClientCategoryList />
        </div>
    )
}

export default CategoryList
