'use client'

import * as React from 'react'
import type { FC } from 'react'

import { NavMain } from '@/components/navigation/nav-main'
import { NavUser } from '@/components/navigation/nav-user'
import { TeamSwitcher } from '@/components/navigation/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { PageSidebarType } from '@/types/navigation'

interface WithPageSidebarProps {
    data: PageSidebarType
    sidebarProps?: React.ComponentProps<typeof Sidebar>
}

export const WithPageSidebar: FC<WithPageSidebarProps> = ({ data, sidebarProps }) => {
    return (
        <Sidebar {...sidebarProps}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
