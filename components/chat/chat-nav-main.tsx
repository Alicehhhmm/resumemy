import * as React from 'react'
import type { FC } from 'react'
import { usePathname } from 'next/navigation'

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'

import type { ChatSidebarType } from '@/types/chat'

interface ChatNavMainProps {
    navMain: ChatSidebarType['navMain']
    onMenuClick?: (item: ChatSidebarType['navMain'][0]) => void
    className?: string
}

export const ChatNavMain: FC<ChatNavMainProps> = ({ navMain, onMenuClick, className }) => {
    const pathname = usePathname()
    const { setOpen } = useSidebar()

    // 根据当前路由找到活动项
    const activeItem = React.useMemo(() => {
        return navMain.find(item => item.link === pathname) || navMain[0]
    }, [pathname, navMain])

    // TODO: change SidebarMenu form @/copmponents/navigation the nav-main.tsx

    return (
        <SidebarGroup className={className}>
            <SidebarGroupContent className='px-1.5 md:px-0'>
                <SidebarMenu>
                    {navMain.map(item => (
                        <SidebarMenuItem key={item.link}>
                            <SidebarMenuButton
                                tooltip={{
                                    children: item.label,
                                    hidden: false,
                                }}
                                onClick={() => {
                                    if (item.link) {
                                        window.location.href = item.link
                                    }
                                    onMenuClick?.(item)
                                    setOpen(true)
                                }}
                                isActive={activeItem?.link === item.link}
                                className='px-2.5 md:px-2'
                            >
                                {item.icon && <item.icon />}
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
