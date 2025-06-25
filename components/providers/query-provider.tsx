'use client'

import { type ReactNode, useState } from 'react'
import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from '@tanstack/react-query'

interface QueryProviderProps {
    children: ReactNode
    /** The dehydrated state from the server. */
    state?: DehydratedState
}

export function QueryProvider({ children, state }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minute
                        retry: 2,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={state}>{children}</HydrationBoundary>
        </QueryClientProvider>
    )
}
