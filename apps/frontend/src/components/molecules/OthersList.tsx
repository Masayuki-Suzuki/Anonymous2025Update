'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const OthersListPlaceholder = () => {
  return (
    <div>
      <h3>others</h3>
      <div>
        <p>Loading others...</p>
      </div>
    </div>
  )
}

// Dynamically import the actual OthersList component with ssr: false
const ClientOthersList = dynamic(
  () => import('./ClientOthersList'),
  {
    ssr: false,
    loading: () => <OthersListPlaceholder />
  }
)

const OthersList = () => {
  return <ClientOthersList />
}

export default OthersList
