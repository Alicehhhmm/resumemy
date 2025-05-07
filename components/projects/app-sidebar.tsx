'use client'

import * as React from 'react'
import { HomeIcon, BookOpen, Bot, GalleryVerticalEnd, FolderIcon, Settings2 } from 'lucide-react'

import { NavMain } from '@/components/projects/nav-main'
import { NavUser } from '@/components/projects/nav-user'
import { TeamSwitcher } from '@/components/projects/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

// This is sample data.
const data = {
    user: {
        name: 'Norush',
        email: 'm@example.com',
        avatar: '/file.svg',
    },
    teams: [
        {
            name: 'Resume My',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
    ],
    navMain: [
        {
            title: 'Home',
            url: '/',
            icon: HomeIcon,
        },
        {
            title: 'Blog',
            url: '/blog',
            icon: Bot,
        },
        {
            title: 'Booklet',
            url: '/booklet',
            icon: BookOpen,
        },
        {
            title: 'Projects',
            url: '/projects',
            icon: FolderIcon,
            isActive: true,
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#',
                },
                {
                    title: 'Limits',
                    url: '#',
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='icon' {...props}>
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
