'use client'

import { ReactNode, useRef } from 'react'
import { QueryClient, QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'

interface QueryProviderProps {
    children: ReactNode
    /** 服务器 dehydrate(queryClient) 生成的状态*/
    state?: DehydratedState
}

export function QueryProvider({ children, state }: QueryProviderProps) {
    const queryClientRef = useRef<QueryClient>(null)

    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 60_000,
                    retry: 2,
                    refetchOnWindowFocus: false,
                },
            },
        })
    }

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <HydrationBoundary state={state}>{children}</HydrationBoundary>
        </QueryClientProvider>
    )
}
