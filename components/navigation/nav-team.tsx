'use client'

import type { FC } from 'react'
import Link from 'next/link'

import { Logon } from '@/components/icons'

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
            <Link href={link} className='w-full'>
                <SidebarMenuButton size='lg' className='md:h-8 md:p-0'>
                    <Avatar className='size-8 rounded-full'>
                        <AvatarImage src={avatar} alt={title} />
                        <AvatarFallback className='flex aspect-square size-8 items-center justify-center rounded-full bg-fluo-logobg text-fluo-logo '>
                            <Logon />
                        </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>{title}</span>
                        <span className='truncate text-xs'>{subhead}</span>
                    </div>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    </SidebarMenu>
)
