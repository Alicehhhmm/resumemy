'use client'

import { useState } from 'react'
import type { FC, ComponentProps } from 'react'

import { NavMain } from '@/components/navigation/nav-main'
import { NavUser } from '@/components/navigation/nav-user'
import { NavTeam } from '@/components/navigation'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { PageSidebarType } from '@/types/navigation'
import type { TeamType } from '@/types'

interface WithPageSidebarProps {
    data: PageSidebarType
    sidebarProps?: ComponentProps<typeof Sidebar>
}

export const WithPageSidebar: FC<WithPageSidebarProps> = ({ data, sidebarProps }) => {
    const [currentTeam] = useState<TeamType>(data.teams[0])

    return (
        <Sidebar {...sidebarProps}>
            <SidebarHeader>
                <NavTeam title={currentTeam.name} subhead={currentTeam.plan} />
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
