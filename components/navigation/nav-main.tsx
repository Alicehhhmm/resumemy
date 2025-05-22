'use client'

import Link from 'next/link'
import { type NavItemsType } from '@/types/navigation'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

export function NavMain({ items }: { items: NavItemsType[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className='flex flex-col gap-2'>
                <SidebarMenu>
                    {items.map(item => (
                        <SidebarMenuItem key={item.title}>
                            <Link href={item.url}>
                                <SidebarMenuButton tooltip={item.title} isActive={item?.isActive || false}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
