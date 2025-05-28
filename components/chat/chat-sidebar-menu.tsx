import * as React from 'react'
import type { FC } from 'react'

import { NavUser } from '@/components/navigation/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar'

import type { ChatSidebarType, TeamType } from '@/types'
import { ChatSidebarTools } from './chat-sidebar-tools'
import { ChatTeamSwitcher } from './chat-team-switcher'
import { ChatNavMain } from './chat-nav-main'

interface ChatSidebarMenuProps {
    data: Pick<ChatSidebarType, 'navMain' | 'user' | 'teams'>
    onMenuClick?: (item: ChatSidebarType['navMain'][0]) => void
    onTeamChange?: (team: TeamType) => void
}

export const ChatSidebarMenu: FC<ChatSidebarMenuProps> = ({ 
    data, 
    onMenuClick,
    onTeamChange 
}) => {
    return (
        <Sidebar collapsible='none' className='!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r'>
            <SidebarHeader>
                {/* 侧边栏菜单栏：ChatTeamSwitcher,头部LOGO组件, 点击后跳转至首页, 显示LOGO图标和公司名称 */}
                <ChatTeamSwitcher 
                    data={data.teams} 
                    onTeamChange={onTeamChange}
                />
            </SidebarHeader>
            <SidebarContent>
                {/* 侧边栏菜单栏：ChatNavMain, 通用导航栏组件, 显示导航栏 */}
                <ChatNavMain 
                    navMain={data.navMain}
                    onMenuClick={onMenuClick}
                />

                {/* 侧边栏菜单栏：ChatSidebarTools, 工具栏组件, 显示工具栏 */}
                <ChatSidebarTools className='mt-auto' />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
} 