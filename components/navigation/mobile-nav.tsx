'use client'

import Link from 'next/link'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { stripLangPrefixPath } from '@/utils/paths'
import { LangToggle } from '@/components/common/lang-toggle'
import { ThemeToggle } from '@/components/common/theme-toggle'

interface MobileNavProps {
    navigationList: {
        key: string
        path: string
        name: string
        subMenu: never[]
    }[]
}

export const MobileNav: FC<MobileNavProps> = ({ navigationList }) => {
    const t = useTranslations()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState<string | null>('/')

    const changeHidden = (hid: boolean) => {
        if (hid) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }

    useEffect(() => {
        if (pathname) {
            setActive(stripLangPrefixPath(pathname))
        }

        changeHidden(isOpen)
        return () => changeHidden(false)
    }, [isOpen])

    return (
        <div className='flex items-center md:hidden'>
            <button
                type='button'
                className='relative h-10 w-10 rounded-lg hover:bg-accent/50'
                aria-label='移动端导航按钮'
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                    {isOpen ? (
                        <X className='h-5 w-5 transition-all duration-300 ease-out' />
                    ) : (
                        <Menu className='h-5 w-5 transition-all duration-300 ease-out' />
                    )}
                </div>
            </button>

            {/* nav plen */}
            <div
                className={cn(
                    'fixed inset-0 top-[60px] z-50 h-[calc(100vh-60px)]',
                    'bg-background/95 backdrop-blur-lg shadow-lg',
                    'transition-[transform,opacity] duration-300 ease-in-out',
                    'dark:bg-background/90',
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                )}
                onClick={e => e.stopPropagation()}
                onTouchMove={e => e.preventDefault()}
            >
                <div className='h-full flex flex-col'>
                    <nav className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-1'>
                        {navigationList.map(item => (
                            <div key={item.key} className='border-b border-border/20 last:border-0'>
                                <div
                                    className={cn(
                                        'flex items-center justify-between py-3',
                                        'text-sm font-medium ',
                                        'hover:bg-accent/5 active:bg-accent/10 active:text-lime-500',
                                        'rounded-lg px-1.5 py-2 -mx-1',
                                        'transition-colors duration-200 ease-out',
                                        item.path === active && 'bg-accent-foreground/10 text-lime-500'
                                    )}
                                >
                                    <Link href={item.path ?? '/'} onClick={() => setActive(item.path ?? '/')}>
                                        <span className='tracking-tight'>{t(item.name as any)}</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className='p-4 sm:p-6 pt-3 border-t border-border/20 bg-accent/5'>
                        <div className='flex justify-center gap-3 mb-3'>
                            <LangToggle />
                            <ThemeToggle />
                        </div>
                        <p className='text-[0.8rem] text-muted-foreground/80 text-center leading-5'>
                            © {new Date().getFullYear()}Norush. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
