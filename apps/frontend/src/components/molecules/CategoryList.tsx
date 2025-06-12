'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const CategoryListPlaceholder = () => {
  return (
    <div>
      <h3>categories</h3>
      <div>
        <p>Loading categories...</p>
      </div>
    </div>
  )
}

// Dynamically import the actual CategoryList component with ssr: false
// This ensures that both ApolloWrapper and Apollo hooks are only used on the client side
const ClientCategoryList = dynamic(
  () => import('./ClientCategoryList'),
  {
    ssr: false,
    loading: () => <CategoryListPlaceholder />
  }
)

const CategoryList = () => {
  return <ClientCategoryList />
}

export default CategoryList
