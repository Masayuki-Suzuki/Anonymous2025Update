'use client'

import React from 'react'
import ApolloWrapper from '@/lib/ApolloWrapper'

export default function ApolloClientProvider({ children }: React.PropsWithChildren) {
    return <ApolloWrapper>{children}</ApolloWrapper>
}
