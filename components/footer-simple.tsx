'use client'

import { cn } from '@/lib/utils'
import { WebLinkSettings } from '@/config/system-settings'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLang } from '@/hooks/use-lang'
import { Github, Facebook, Mail } from 'lucide-react'

export const FooterSimple = () => {
    const currentYear = new Date().getFullYear()
    const { t } = useLang()

    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'system.links.github':
                return <Github className='h-5 w-5' />
            case 'system.links.juejin':
                return <Facebook className='h-5 w-5' />
            case 'system.links.gmail':
                return <Mail className='h-5 w-5' />
            default:
                return null
        }
    }

    // 样式配置
    const baseStyle = cn(
        'rounded-lg p-2 transition-all duration-300 ease-out',
        'text-gray-600/90 dark:text-gray-400/90',
        'hover:bg-gray-100 dark:hover:bg-fluo-background',
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
                        <p className='text-sm text-muted-foreground max-sm:text-xs'>© 2024-PRESENT({currentYear}). by Norush</p>
                    </div>
                    <div className='flex items-center gap-2 order-2 max-sm:order-1 max-sm:w-full max-sm:justify-center'>
                        {WebLinkSettings.map(section => (
                            <ul key={section.type} className='flex items-center gap-2 py-2 border border-border/20 max-sm:border-none'>
                                {section.type === 'me' &&
                                    section.children.map(link => (
                                        <li key={link.name} className={baseStyle}>
                                            <a
                                                title={t(link.name)}
                                                href={link.link}
                                                className='h-5 w-5 transition-all duration-300 ease-out max-sm:h-4 max-sm:w-4'
                                                target={link.blank ? '_blank' : '_self'}
                                                rel='noopener'
                                            >
                                                {getIcon(link.name)}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        ))}
                    </div>
                    <div className='flex items-center gap-3 order-3 max-sm:order-3 max-sm:w-full max-sm:justify-center'>
                        <ThemeToggle className='max-sm:h-8 max-sm:w-8' />
                    </div>
                </div>
            </div>
        </footer>
    )
}
