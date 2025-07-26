'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const ArchiveListPlaceholder = () => {
    return <p className="text-center py-4">Loading archives...</p>
}

// Dynamically import the actual ArchiveList component with ssr: false
// This ensures that both ApolloWrapper and Apollo hooks are only used on the client side
const ClientArchiveList = dynamic(() => import('./ClientArchiveList'), {
    ssr: false,
    loading: () => <ArchiveListPlaceholder />,
})

const ArchiveList = () => {
    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">archives</h3>
            <ClientArchiveList />
        </div>
    )
}

export default ArchiveList
