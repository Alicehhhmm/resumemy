'use client'

import type { ComponentProps } from 'react'

import { Sidebar } from '@/components/ui/sidebar'
import { WithPageSidebar } from '@/components/WithPageSidebar'

export function BookletSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return (
        <WithPageSidebar
            modelKey={['booklet']}
            sidebarProps={{
                collapsible: 'icon',
                ...props,
            }}
        />
    )
}
