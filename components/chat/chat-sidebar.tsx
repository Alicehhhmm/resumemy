'use client'

import * as React from 'react'
import type { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Sidebar } from '@/components/ui/sidebar'
import type { ChatSidebarType, ChannelType } from '@/types'
import { ChatSidebarMenu } from './chat-sidebar-menu'
import { ChatSidebarChannels } from './chat-sidebar-channels'

import { useSidebarStore } from '@/hooks'
import { stripLangPrefixPath } from '@/utils/paths'

interface ChatSidebarProps {
    data: ChatSidebarType
    sidebarProps?: React.ComponentProps<typeof Sidebar>
}

export const ChatSidebar: FC<ChatSidebarProps> = ({ data, sidebarProps }) => {
    const pathname = usePathname()
    const router = useRouter()
    const [channels, setChannels] = React.useState(data.messages?.channels || [])

    const { setSelectChannel, setBreadcrumbLinks, clearBreadcrumbs } = useSidebarStore()

    // 根据当前路由找到活动项
    const activeItem = React.useMemo(() => {
        const currentPath = stripLangPrefixPath(pathname)
        return data.navMain.find(item => item.link === currentPath) || data.navMain[0]
    }, [pathname, data.navMain])

    const handleMenuClick = React.useCallback(
        (item: ChatSidebarType['navMain'][0]) => {
            if (data.messages?.channels) {
                clearBreadcrumbs()
            }
        },
        [data.messages?.channels]
    )

    const handleChannelClick = React.useCallback(
        (channel: ChannelType) => {
            if (channel.link) {
                setSelectChannel(channel)
                setBreadcrumbLinks({
                    href: channel.link,
                    label: channel.label,
                })
                router.push(channel.link)
            }
        },
        [router]
    )

    return (
        <Sidebar collapsible='icon' className='overflow-hidden [&>[data-sidebar=sidebar]]:flex-row' {...sidebarProps}>
            {/* 第一个侧边栏: 菜单栏导航组件 */}
            <ChatSidebarMenu data={data} onMenuClick={handleMenuClick} />

            {/* 第二个侧边栏：不同类型的消息频道组件 */}
            <ChatSidebarChannels activeItem={activeItem} channels={channels} onChannelClick={handleChannelClick} />
        </Sidebar>
    )
}
