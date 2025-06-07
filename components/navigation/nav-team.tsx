'use client'

import type { FC } from 'react'

import { Link } from '@/components/common'
import { NavLogo } from '@/components/navigation'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface NavTeamProps {
    title: string
    subhead: string
    avatar?: string
    link?: string
}

export const NavTeam: FC<NavTeamProps> = ({ title, avatar, subhead, link = '/' }) => (
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton size='lg' className='md:h-8 md:p-0'>
                <Avatar className='size-8 rounded-full'>
                    <AvatarImage src={avatar} alt={title} />
                    <AvatarFallback>
                        <NavLogo />
                    </AvatarFallback>
                </Avatar>
                <Link href={link} className='w-full'>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>{title}</span>
                        <span className='truncate text-xs'>{subhead}</span>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
)
