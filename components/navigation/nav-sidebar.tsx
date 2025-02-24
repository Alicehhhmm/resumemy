'use client'

import React, { useCallback, memo, useMemo } from 'react'
import type { ComponentType } from 'react'
import { usePathname } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import Link from '@/components/common/Link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebarStore } from '@/hooks/use-sidebar-store'
import { WithIcon } from '@/components/withIcon'

// 用于判断当前路径是否激活
const useIsActive = (href: string) => {
    const pathname = usePathname()
    const isActive = useMemo(() => pathname === href || pathname?.startsWith(`${href}/`), [pathname, href])
    return isActive
}

export interface SidebarDataType {
    title: string
    type?: 'link' | 'group'
    url?: string
    icon?: string
    items?: Array<SubMenuType>
}

interface SubMenuType {
    label: string
    href: string
    active?: boolean
}

interface SidebarLinkProps extends SubMenuType {
    icon?: ComponentType
}

interface SidebarItmeProps extends SubMenuType {}

interface SidebarProps {
    iconMap?: Record<string, React.ComponentType>
    sections: SidebarDataType[]
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, iconMap }) => {
    const { expandedSections, toggleSection } = useSidebarStore()

    const handleToggle = useCallback(
        (meunKey: string) => (e: React.MouseEvent) => {
            toggleSection(meunKey)
        },
        [toggleSection]
    )

    // 展开项判断
    const isExpanded = (key: string) => expandedSections.includes(key)

    // 菜单栏数据初始化
    const memoizedSections = useMemo(
        () =>
            sections.map(section => ({
                ...section,
                meunKey: uuidv4(),
                icon: section.icon ? iconMap?.[section.icon] : undefined,
            })),
        [sections]
    )

    return (
        <aside className='w-64 h-full flex flex-col border-r bg-background'>
            <ScrollArea className='flex-1'>
                <nav className='p-4 space-y-1'>
                    {memoizedSections.map(section => (
                        <div key={section.meunKey}>
                            {section.type === 'link' ? (
                                <SidebarLink href={section.url || '#'} label={section.title} icon={section.icon} />
                            ) : (
                                <div className='space-y-1'>
                                    <button
                                        onClick={handleToggle(section.meunKey)}
                                        className={cn(
                                            'flex items-center justify-between w-full px-3 py-2',
                                            'text-sm rounded-lg transition-colors',
                                            'hover:bg-accent/50 text-foreground/80 hover:text-foreground',
                                            'group focus:outline-none '
                                        )}
                                        aria-expanded={isExpanded(section.meunKey)}
                                    >
                                        <div className='flex items-center gap-2'>
                                            {section.icon && <WithIcon icon={section.icon} className='h-4 w-4' />}
                                            <span>{section.title}</span>
                                        </div>
                                        <WithIcon
                                            icon={ChevronDown}
                                            className={cn(
                                                'h-4 w-4 transition-transform text-muted-foreground',
                                                isExpanded(section.meunKey) ? 'rotate-0' : '-rotate-90'
                                            )}
                                        />
                                    </button>

                                    <div
                                        className={cn(
                                            'ml-4 pl-2 border-l overflow-hidden',
                                            'transition-[max-height,opacity] duration-300 ease-ease-in-out',
                                            isExpanded(section.meunKey) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                        )}
                                        aria-hidden={!isExpanded(section.meunKey)}
                                    >
                                        <div className='py-1 space-y-1'>
                                            {section.items?.map(item => (
                                                <SidebarItme key={item.href} {...item} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>
        </aside>
    )
}

export default Sidebar

const SidebarLink = memo(({ href, label, icon }: SidebarLinkProps) => {
    const isActive = useIsActive(href)

    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm',
                'rounded-lg transition-all duration-200 ease-out',
                'hover:bg-accent/50 hover:text-foreground',
                isActive ? `bg-primary/10 text-primary font-medium` : 'text-muted-foreground'
            )}
        >
            {icon && <WithIcon icon={icon} className='h-4 w-4 shrink-0' />}
            <span className='truncate'>{label}</span>
        </Link>
    )
})

const SidebarItme = memo(({ href, label, active }: SidebarItmeProps) => {
    const pathnameActive = useIsActive(href)
    const { activeItem, setActiveItem } = useSidebarStore()

    const isActive = activeItem === href || pathnameActive || active

    return (
        <div
            onClick={() => setActiveItem(href)}
            className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm',
                'rounded-lg transition-all duration-200 ease-out',
                'hover:bg-accent/50 hover:text-foreground',
                isActive ? `bg-primary/10 text-primary font-medium` : 'text-muted-foreground'
            )}
        >
            <span className='truncate'>{label}</span>
        </div>
    )
})
