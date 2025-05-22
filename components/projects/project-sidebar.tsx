'use client'

import type { ComponentProps } from 'react'
import { HomeIcon, BookOpen, Bot, GalleryVerticalEnd, FolderIcon, Settings2 } from 'lucide-react'

import { Sidebar } from '@/components/ui/sidebar'
import { WithPageSidebar } from '@/components/WithPageSidebar'

// This is sample data.
const data = {
    user: {
        name: 'Norush',
        email: 'm@example.com',
        avatar: '',
    },
    teams: [
        {
            name: 'Codeing Repository',
            logo: GalleryVerticalEnd,
            plan: 'free',
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

export function ProjectSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return (
        <WithPageSidebar
            data={data}
            sidebarProps={{
                collapsible: 'icon',
                ...props,
            }}
        />
    )
}
