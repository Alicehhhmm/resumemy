'use client'

import type { FC } from 'react'

import { NavUser } from '@/components/navigation/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'

import type { ChatSidebarType } from '@/types'
import { ChatSidebarTools } from './chat-sidebar-tools'
import { ChatTeamSwitcher } from './chat-team-switcher'
import { ChatNavMain } from './chat-nav-main'

interface ChatSidebarMenuProps {
    data: Pick<ChatSidebarType, 'navMain' | 'user' | 'teams'>
    onMenuClick?: (item: ChatSidebarType['navMain'][0]) => void
}

export const ChatSidebarMenu: FC<ChatSidebarMenuProps> = ({ data, onMenuClick }) => {
    return (
        <Sidebar collapsible='none' className='!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r'>
            <SidebarHeader>
                <ChatTeamSwitcher data={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <ChatNavMain navMain={data.navMain} onMenuClick={onMenuClick} />
                <ChatSidebarTools className='mt-auto' />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
