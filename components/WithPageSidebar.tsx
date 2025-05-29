'use client'

import { useState } from 'react'
import type { FC, ComponentProps } from 'react'

import type { RichTranslationValues } from 'next-intl'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { NavTeam, NavMain, NavUser } from '@/components/navigation'
import { ChatSidebarIconMap } from '@/components/icons'

import type { TeamType, NavigationKeys, PageSidebarType } from '@/types'

import { useSiteNavigation } from '@/hooks/server'
import { getCurrentPathname } from '@/lib/next-router'

interface WithPageSidebarProps {
    modelKey: Array<NavigationKeys>
    sidebarProps?: ComponentProps<typeof Sidebar>
    context?: Record<string, RichTranslationValues>
}

export const WithPageSidebar: FC<WithPageSidebarProps> = ({ modelKey, context, sidebarProps }) => {
    const pathname = usePathname()!
    const locale = useLocale()

    const { getSideNavigation, chatNavigationItems } = useSiteNavigation()

    let navKeys = (modelKey as Array<NavigationKeys>) || []
    let currentPathname = getCurrentPathname(locale, pathname)

    // get side navigation items based on model keys
    // const mappedSidebarItems = getSideNavigation(navKeys, context).map(([_, { label, items }]) => ({
    //     groupName: label,
    //     items: items.map(([, item]) => item),
    // }))

    let navMain: PageSidebarType['navMain'] = []
    if (chatNavigationItems) {
        // TODO: merge with mappedSidebarItems to navMain.items
        navMain = chatNavigationItems.map(([key, item]) => ({
            ...item,
            icon: ChatSidebarIconMap[key] || '',
            isActive: item.link ? currentPathname === item.link : false,
        }))
    }

    // TODO: get user and teams info from FeachtAPI or context
    const data: PageSidebarType = {
        user: {
            name: 'Norush',
            email: 'm@example.com',
            avatar: '',
        },
        teams: [
            {
                name: 'Codeing Repository',
                logo: '',
                plan: 'free',
            },
        ],
        navMain,
    }

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
