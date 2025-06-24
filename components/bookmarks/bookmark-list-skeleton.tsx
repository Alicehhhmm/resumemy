'use client'

import { FC } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MasonryGrid } from '@/components/common'

export const BookmarkListSkeleton: FC = () => {
    return (
        <MasonryGrid columns='3' gap='md' padding='md'>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className='space-y-2'>
                    <Skeleton className='h-44 rounded-lg' />
                    <Skeleton className='h-4 w-3/4 rounded ' />
                    <Skeleton className='h-3 w-1/2  rounded ' />
                </div>
            ))}
        </MasonryGrid>
    )
}
