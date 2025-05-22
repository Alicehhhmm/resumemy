'use client'

import { memo } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContentMainProps {
    children: ReactNode
}

export const BookletContentMain = memo(({ children }: ContentMainProps) => {
    return (
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0 content-wrapper'>
            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>{children}</div>
        </div>
    )
})
