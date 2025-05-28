'use client'

import * as React from 'react'
import type { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Sidebar } from '@/components/ui/sidebar'
import type { ChatSidebarType, ChannelType } from '@/types'
import { ChatSidebarMenu } from './chat-sidebar-menu'
import { ChatSidebarChannels } from './chat-sidebar-channels'

interface ChatSidebarProps {
    data: ChatSidebarType
    sidebarProps?: React.ComponentProps<typeof Sidebar>
}

export const ChatSidebar: FC<ChatSidebarProps> = ({ data, sidebarProps }) => {
    const pathname = usePathname()
    const router = useRouter()
    const [channels, setChannels] = React.useState(data.messages?.channels || [])

    // 根据当前路由找到活动项
    const activeItem = React.useMemo(() => {
        return data.navMain.find(item => item.link === pathname) || data.navMain[0]
    }, [pathname, data.navMain])


    const handleMenuClick = React.useCallback((item: ChatSidebarType['navMain'][0]) => {
        if (data.messages?.channels) {
            const channel = [...data.messages.channels].sort(() => Math.random() - 0.5)
            setChannels(channel.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1)))
        }
    }, [data.messages?.channels])

    const handleChannelClick = React.useCallback((channel: ChannelType) => {
        if (channel.link) {
            // 使用 Next.js 的路由导航
            router.push(channel.link)
        }
    }, [router])

    return (
        <Sidebar collapsible='icon' className='overflow-hidden [&>[data-sidebar=sidebar]]:flex-row' {...sidebarProps}>
            {/* 第一个侧边栏: 菜单栏导航组件 */}
            <ChatSidebarMenu 
                data={data} 
                onMenuClick={handleMenuClick}
            />

            {/* 第二个侧边栏：不同类型的消息频道组件 */}
            <ChatSidebarChannels 
                activeItem={activeItem}
                channels={channels}
                onChannelClick={handleChannelClick}
            />
        </Sidebar>
    )
}
