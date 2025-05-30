'use client'

import type { FC } from 'react'

import { cn } from '@/lib/utils'

import type { LinkLike } from '@/types/links'
import { SocialIconMap } from '@/components/icons/EnumIcons'
import { ThemeToggle, RightsReserved } from '@/components/common'

type Navigation = {
    socialLinks: Array<{
        icon: string
        link: string
        text: string
        target?: string
    }>
    footerLinks: Array<{
        text: string
        link: string
    }>
}

export const FooterSimple: FC<{
    pathname: string
    as: LinkLike
    navigation: Navigation
}> = ({ pathname = '/', as = 'a', navigation }) => {
    const baseStyle = cn(
        'rounded-lg p-2 transition-all duration-300 ease-out',
        'text-gray-600/90 dark:text-gray-400/90',
        'hover:bg-gray-100 dark:hover:bg-fluo-background',
        'hover:text-fluo-500/80',
        'active:text-blue-500 dark:active:text-fluo-primary',
        'transform hover:scale-105 active:scale-95',
        'max-sm:p-1.5'
    )

    return (
        <footer
            className={cn(
                'mt-auto border-t border-border/80',
                'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
                'max-sm:px-4'
            )}
        >
            <div className='mx-20 py-4 sm:px-6 md:px-8 lg:px-4 max-sm:mx-4 max-sm:py-3'>
                <div className='flex flex-row sm:flex-col flex-wrap md:flex-row justify-between gap-y-4'>
                    <div className='flex justify-center items-center gap-2 order-1 max-sm:order-2 max-sm:w-full'>
                        <RightsReserved companyName='Norush' />
                    </div>
                    <div className='flex items-center gap-2 order-2 max-sm:order-1 max-sm:w-full max-sm:justify-center'>
                        <ul className='flex items-center gap-2 py-2 border border-border/20 max-sm:border-none'>
                            {navigation.socialLinks.map(link => {
                                const SocialIcon = SocialIconMap[link.icon]

                                // TODO: add ActionItems compoents
                                // <ActionItems key={link.icon} href={link.link} type="footer" as={as} pathname={pathname} />
                                return (
                                    <li key={link.icon} className={baseStyle}>
                                        <a
                                            title={link.text}
                                            href={link.link}
                                            className='size-5 transition-all duration-300 ease-out max-sm:h-4 max-sm:w-4'
                                            target={link.target === 'blank' ? '_blank' : '_self'}
                                            rel='noopener'
                                        >
                                            <SocialIcon width={20} height={20} aria-label={link.link} />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='flex items-center gap-3 order-3 max-sm:order-3 max-sm:w-full max-sm:justify-center'>
                        <ThemeToggle className='max-sm:size-8' />
                    </div>
                </div>
            </div>
        </footer>
    )
}
