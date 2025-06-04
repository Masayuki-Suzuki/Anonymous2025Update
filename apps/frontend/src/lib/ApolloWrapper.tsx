'use client'

import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs'
import { createApolloClient } from '@/lib/apolloClient'
import React from 'react'

export default function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={createApolloClient}>{children}</ApolloNextAppProvider>
}
