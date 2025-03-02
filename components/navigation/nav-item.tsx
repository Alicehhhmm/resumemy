'use client'

import { Link } from '@/components/common'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useState, useCallback, memo } from 'react'

import { cn } from '@/lib/utils'
import { useLang } from '@/hooks/use-lang'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export interface NavItemProps {
    key: string
    name: string
    path: string
    subMenu?: Array<{ type: string; label: string }>
}

const NavItem = memo(({ name, path, subMenu }: NavItemProps) => {
    const { t } = useLang()

    const pathname = usePathname()
    const isActive = pathname === path
    const [isOpen, setIsOpen] = useState(false)

    const handleMouseEnter = useCallback(() => {
        setIsOpen(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
        setIsOpen(false)
    }, [])

    const baseItemStyles =
        'relative flex items-center h-[60px] px-3 py-2 text-sm transition-all duration-200 ease-in-out hover:text-primary'
    const activeItemStyles = cn(
        'text-primary font-medium',
        'after:absolute after:bottom-0 after:left-0 after:right-0',
        'after:h-[2px] after:bg-primary',
        'after:transform after:scale-x-100 after:transition-all after:duration-300 after:ease-out'
    )
    const inactiveItemStyles = cn(
        'text-muted-foreground',
        'after:absolute after:bottom-0 after:left-0 after:right-0',
        'after:h-[2px] after:bg-primary',
        'after:transform after:scale-x-0 after:origin-left after:transition-all after:duration-300 after:ease-out',
        'hover:after:scale-x-100'
    )

    if (!subMenu?.length) {
        return (
            <Link href={path} className={cn(baseItemStyles, isActive ? activeItemStyles : inactiveItemStyles)}>
                {t(name)}
            </Link>
        )
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='relative'>
            <DropdownMenu open={isOpen}>
                <DropdownMenuTrigger className='focus:outline-none'>
                    <div className={cn(baseItemStyles, isActive ? activeItemStyles : inactiveItemStyles, 'group')}>
                        {t(name)}
                        <ChevronDown className={cn('ml-1 h-4 w-4 transition-transform duration-300 ease-in-out')} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align='start'
                    sideOffset={0}
                    className={cn(
                        'w-48 bg-popover/95 backdrop-blur supports-[backdrop-filter]:bg-popover/80',
                        'transition-all duration-300 ease-out',
                        'origin-top-left',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        'data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2'
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {subMenu.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            className={cn(
                                'text-sm text-muted-foreground',
                                'transition-all duration-200 ease-out',
                                'hover:text-primary hover:bg-accent/50',
                                'hover:translate-x-1',
                                'focus:text-primary focus:bg-accent/50',
                                'active:scale-[0.98]',
                                // 添加延迟动画，使菜单项依次显示
                                'data-[state=open]:animate-in',
                                'data-[state=open]:fade-in-0',
                                'data-[state=open]:slide-in-from-left-1',
                                `data-[state=open]:delay-[${index * 50}ms]`
                            )}
                        >
                            {t(item.label)}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
})

NavItem.displayName = 'NavItem'

export { NavItem }
