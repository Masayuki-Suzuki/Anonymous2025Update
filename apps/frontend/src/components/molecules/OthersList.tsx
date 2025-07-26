'use client'

import dynamic from 'next/dynamic'

// Create a placeholder component for SSR
const OthersListPlaceholder = () => {
    return <p className="text-center py-4">Loading others...</p>
}

// Dynamically import the actual OthersList component with ssr: false
const ClientOthersList = dynamic(() => import('./ClientOthersList'), {
    ssr: false,
    loading: () => <OthersListPlaceholder />,
})

const OthersList = () => {
    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">others</h3>
            <ClientOthersList />
        </div>
    )
}

export default OthersList
