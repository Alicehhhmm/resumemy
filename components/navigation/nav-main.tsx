'use client'

import Link from 'next/link'
import { useCallback } from 'react'
import type { FC, ComponentProps } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { type NavItemsType } from '@/types/navigation'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

type NavMainProps = {
    items: NavItemsType[]
    onMenuClick?: (item: NavItemsType) => void
    SidebarGroupProps?: ComponentProps<typeof SidebarGroup>
    SidebarMenuButtonProps?: ComponentProps<typeof SidebarMenuButton>
}

export const NavMain: FC<NavMainProps> = ({ items, onMenuClick, SidebarGroupProps, SidebarMenuButtonProps }) => {
    const pathname = usePathname()
    const router = useRouter()

    const activeItem = useCallback(
        (link: string) => {
            if (!link) return false
            return pathname === link
        },
        [pathname]
    )

    const handleClick = useCallback(
        (item: NavItemsType) => {
            const url = item.link
            if (!url) return

            if (item.target === '_blank') {
                window.open(url, '_blank')
            } else {
                router.push(url)
            }

            onMenuClick?.(item)
        },
        [onMenuClick, router]
    )

    return (
        <SidebarGroup {...SidebarGroupProps}>
            <SidebarGroupContent className='flex flex-col gap-2'>
                <SidebarMenu>
                    {items.map(item => (
                        <SidebarMenuItem key={item.link} className='w-full'>
                            <Link href={item.link} target={item.target} className='w-full'>
                                <SidebarMenuButton
                                    tooltip={{
                                        children: item.label,
                                        hidden: false,
                                    }}
                                    onClick={() => handleClick(item)}
                                    isActive={item?.isActive || activeItem(item.link)}
                                    {...SidebarMenuButtonProps}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
