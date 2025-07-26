'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const RecentPostsListPlaceholder = () => {
    return <p className="text-center py-4">Loading recent posts...</p>
}

// Dynamically import the actual RecentPostsList component with ssr: false
// This ensures that both ApolloWrapper and Apollo hooks are only used on the client side
const ClientRecentPostsList = dynamic(() => import('./ClientRecentPostsList'), {
    ssr: false,
    loading: () => <RecentPostsListPlaceholder />,
})

const RecentPostsList = () => {
    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">recent posts</h3>
            <ClientRecentPostsList />
        </div>
    )
}

export default RecentPostsList
