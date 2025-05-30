'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ThemeToggleBtn } from '@/components/common/theme-toggle'
import { NavItem } from '@/components/navigation/nav-item'
import { GitHub } from '@/components/icons/social'
import { LangToggle } from '@/components/common/lang-toggle'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ActionLink } from '@/components/common/action-link'
import { Logon } from '@/components/icons'

import { useSiteNavigation } from '@/hooks/server'
import { siteNavigation } from '@/config/next.json.mjs'

export const NavHeader = () => {
    const { navigationItems } = useSiteNavigation()
    const { sourceRepositoryNav } = siteNavigation

    // Transform the navigation items to the required format
    const transformNavData = (sourceData: any[]) =>
        sourceData.map(([key, items]) => ({
            key,
            ...items,
        }))

    const headmap = transformNavData(navigationItems)

    const t = useTranslations()
    const siteRepository = sourceRepositoryNav['site'].map((link: any) => ({ ...link, label: t(link.label) }))[0]

    return (
        <div className='w-full h-[60px] fixed top-0 left-0 right-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
            <div className='h-full px-4 sm:px-6 lg:px-20 flex items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center space-x-2'>
                    <Link href='/' className='flex items-center space-x-2'>
                        <div className='flex aspect-square size-8 items-center justify-center rounded-full bg-fluo-logobg text-fluo-logo '>
                            <Logon />
                        </div>
                        <h2 className='hidden font-bold lg:inline-block text-xl sm:text-2xl text-foreground'>Norush website</h2>
                    </Link>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='hidden md:flex items-center gap-2 mr-2'>
                        {headmap.map(hnav => (
                            <NavItem key={hnav.key} label={hnav.label} link={hnav.link} />
                        ))}
                        <div className='h-6 w-[1px] mx-2 bg-border/60' />
                        <LangToggle />
                        <ThemeToggleBtn />
                        <ActionLink href={siteRepository.link} label={siteRepository.label} icon={<GitHub />} target='_blank' />
                    </div>
                    <div className='md:hidden flex items-center gap-1'>
                        <ThemeToggleBtn />
                        <div className='h-5 w-[1px] mx-1 bg-border/60' />
                        <MobileNav navigationList={headmap} />
                    </div>
                </div>
            </div>
        </div>
    )
}
