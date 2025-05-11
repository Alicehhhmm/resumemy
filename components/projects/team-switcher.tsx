'use client'

import * as React from 'react'
import { ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react'
import { Logon } from '@/components/icons'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'

export function TeamSwitcher({
    teams,
}: {
    teams: {
        name: string
        logo: React.ElementType
        plan: string
    }[]
}) {
    const [activeTeam, setActiveTeam] = React.useState(teams[0])

    if (!activeTeam) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size='lg'
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                        <Logon />
                    </div>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>{activeTeam.name}</span>
                        <span className='truncate text-xs'>{activeTeam.plan}</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
