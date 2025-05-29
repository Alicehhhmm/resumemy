'use client'

import type { ComponentProps } from 'react'

import { Sidebar } from '@/components/ui/sidebar'
import { WithPageSidebar } from '@/components/WithPageSidebar'

export function ProjectSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return (
        <WithPageSidebar
            modelKey={['project']}
            sidebarProps={{
                collapsible: 'icon',
                ...props,
            }}
        />
    )
}
