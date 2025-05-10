'use client'

import { memo } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'
import { stripLangPrefixPath } from '@/utils/paths'
import { Link } from '@/components/common'

export interface NavItemProps {
    key: string
    name: string
    path: string
}

const NavItem = memo(({ name, path }: NavItemProps) => {
    const t = useTranslations()

    const pathname = usePathname()
    const isActive = stripLangPrefixPath(pathname) === path

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

    return (
        <Link href={path} className={cn(baseItemStyles, isActive ? activeItemStyles : inactiveItemStyles)}>
            {t(name as any)}
        </Link>
    )
})

NavItem.displayName = 'NavItem'

export { NavItem }
