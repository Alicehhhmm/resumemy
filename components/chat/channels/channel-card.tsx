'use client'

import type { FC } from 'react'
import { Star } from 'lucide-react'
import { usePathname } from 'next/navigation'

import type { RIconType } from '@/types'
import { cn } from '@/lib/utils'
import { isActivePath } from '@/utils/paths'

interface SidebarChannelCardProps {
    group: {
        link: string
        label: string
        icon?: RIconType
        desc?: string
        isActive?: boolean
    }
    className?: string
    onClick?: () => void
}

export const SidebarChannelCard: FC<SidebarChannelCardProps> = ({ group, className, onClick }) => {
    const pathname = usePathname()!
    const active = isActivePath(pathname, group.link) || group.isActive

    return (
        <a
            href={group.link}
            key={group.link}
            onClick={e => {
                e.preventDefault()
                onClick?.()
            }}
            className={cn(
                'flex flex-col items-start gap-2 whitespace-nowrap border-b  p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                active && 'bg-sidebar-accent text-sidebar-accent-foreground',
                className
            )}
        >
            <div className='flex w-full items-center gap-2'>
                <span>{group.label}</span>
                <span className='ml-auto text-xs'>
                    {group.icon ? <group.icon className='inline size-3' /> : <Star className='inline size-3' />}
                </span>
            </div>
            {group.desc && <span className='line-clamp-2 w-[260px] whitespace-break-spaces text-xs'>{group.desc}</span>}
        </a>
    )
}
