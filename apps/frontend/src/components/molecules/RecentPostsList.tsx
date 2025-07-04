'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const RecentPostsListPlaceholder = () => {
  return (
    <div>
      <h3>recent posts</h3>
      <div>
        <p>Loading recent posts...</p>
      </div>
    </div>
  )
}

// Dynamically import the actual RecentPostsList component with ssr: false
// This ensures that both ApolloWrapper and Apollo hooks are only used on the client side
const ClientRecentPostsList = dynamic(
  () => import('./ClientRecentPostsList'),
  {
    ssr: false,
    loading: () => <RecentPostsListPlaceholder />
  }
)

const RecentPostsList = () => {
  return <ClientRecentPostsList />
}

export default RecentPostsList
