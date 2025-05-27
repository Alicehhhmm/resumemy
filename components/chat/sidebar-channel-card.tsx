import type { FC, ComponentType } from 'react'
import { type LucideIcon, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarChannelCardProps {
    group: {
        link: string
        label: string
        icon?: LucideIcon
        desc: string
        isActive?: boolean
    }
    className?: string
}

export const SidebarChannelCard: FC<SidebarChannelCardProps> = ({ group, className }) => {
    return (
        <>
            <a
                href={group.link}
                key={group.link}
                className={cn(
                    'flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    group.isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
                    className
                )}
            >
                <div className='flex w-full items-center gap-2'>
                    <span>{group.label}</span>
                    <span className='ml-auto text-xs'>
                        {group.icon ? <group.icon className='inline size-3' /> : <Star className='inline size-3' />}
                    </span>
                </div>
                <span className='line-clamp-2 w-[260px] whitespace-break-spaces text-xs'>{group.desc}</span>
            </a>
        </>
    )
}
