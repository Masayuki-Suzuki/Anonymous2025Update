'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const ArchiveListPlaceholder = () => {
  return (
    <div>
      <h3>archives</h3>
      <div>
        <p>Loading archives...</p>
      </div>
    </div>
  )
}

// Dynamically import the actual ArchiveList component with ssr: false
// This ensures that both ApolloWrapper and Apollo hooks are only used on the client side
const ClientArchiveList = dynamic(
  () => import('./ClientArchiveList'),
  {
    ssr: false,
    loading: () => <ArchiveListPlaceholder />
  }
)

const ArchiveList = () => {
  return <ClientArchiveList />
}

export default ArchiveList
