'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useLocale, useTranslations } from 'next-intl'

import { ThemeToggleBtn } from '@/components/common/theme-toggle'
import { NavItem } from '@/components/navigation/nav-item'
import { GitHub } from '@/components/icons/social'
import { LangToggle } from '@/components/common/lang-toggle'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ActionLink } from '@/components/common/action-link'
import { Logon } from '@/components/icons'

import { getRepositoryLink } from '@/config/lib'
import { NavItemSettings } from '@/config/system-settings'
import { useLang } from '@/hooks/use-lang'


export const NavHeader = () => {
    const headmap = NavItemSettings
    const { t } = useLang()
    const { theme } = useTheme()
    const locale = useLocale()
    const resumeLink = getRepositoryLink('repositories-source', 'system.links.resumemy')

    return (
        <div className='w-full h-[60px] fixed top-0 left-0 right-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
            <div className='h-full px-4 sm:px-6 lg:px-20 flex items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center space-x-2'>
                    <Link href='/' className='flex items-center space-x-2'>
                        <Logon width={32} height={32} fill={theme !== 'dark' ? '#9DFF3A' : '#000'} bgfill />
                        <h2 className='hidden font-bold lg:inline-block text-xl sm:text-2xl text-foreground'>Norush website</h2>
                    </Link>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='hidden md:flex items-center gap-2 mr-2'>
                        {headmap.map(hnav => (
                            <NavItem key={hnav.key} name={hnav.name} path={hnav.path} subMenu={hnav.subMenu} />
                        ))}
                        <div className='h-6 w-[1px] mx-2 bg-border/60' />
                        <LangToggle />
                        <ThemeToggleBtn />
                        <ActionLink href={resumeLink.link} label={t(resumeLink.name)} icon={<GitHub />} target='_blank' />
                    </div>
                    <div className='md:hidden flex items-center gap-1'>
                        <ThemeToggleBtn />
                        <div className='h-5 w-[1px] mx-1 bg-border/60' />
                        <MobileNav />
                    </div>
                </div>
            </div>
        </div>
    )
}
