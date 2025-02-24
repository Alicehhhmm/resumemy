'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { LangToggle } from '@/components/common/lang-toggle'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { NavItemSettings } from '@/config/system-settings'
import { useLang } from '@/hooks/use-lang'

export const MobileNav = () => {
    const { t } = useLang()
    const [isOpen, setIsOpen] = useState(false)
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    const toggleSubMenu = (key: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev)
            newSet.has(key) ? newSet.delete(key) : newSet.add(key)
            return newSet
        })
    }

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

            {/* 导航面板 */}
            <div
                className={cn(
                    'fixed inset-0 top-[60px] z-50 h-[calc(100vh-60px)]',
                    'bg-background/95 backdrop-blur-lg shadow-lg',
                    'transition-[transform,opacity] duration-300 ease-in-out',
                    'dark:bg-background/90',
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                )}
            >
                <div className='h-full flex flex-col'>
                    <nav className='flex-1 overflow-y-auto p-4 sm:p-6'>
                        {NavItemSettings.map(item => (
                            <div key={item.key} className='border-b border-border/20 last:border-0'>
                                <div
                                    className={cn(
                                        'flex items-center justify-between py-3',
                                        'text-base font-medium text-foreground/95',
                                        'hover:bg-accent/5 active:bg-accent/10',
                                        'rounded-lg px-2 -mx-1',
                                        'transition-colors duration-200 ease-out',
                                        'active:scale-[0.98] transform'
                                    )}
                                    onClick={e => {
                                        if (item.subMenu) {
                                            e.preventDefault()
                                            toggleSubMenu(item.key)
                                        } else {
                                            setIsOpen(false)
                                        }
                                    }}
                                >
                                    <span className='tracking-tight'>{t(item.name)}</span>
                                    {item.subMenu && (
                                        <div className='flex items-center gap-1.5'>
                                            <span className='text-xs text-muted-foreground/80'>{item.subMenu.length}项</span>
                                            <ChevronDown
                                                className={cn(
                                                    'h-4 w-4 text-foreground/80 transition-all duration-200',
                                                    expandedItems.has(item.key) && 'rotate-180'
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>

                                {item.subMenu && (
                                    <div
                                        className={cn(
                                            'ml-4 pl-2 border-l border-border/10',
                                            'overflow-hidden transition-all duration-250 ease-out',
                                            expandedItems.has(item.key) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-90'
                                        )}
                                    >
                                        <div className='space-y-2 py-2'>
                                            {item.subMenu.map((subItem, index) => (
                                                <Link
                                                    key={index}
                                                    href='#'
                                                    className={cn(
                                                        'block py-1.5 text-sm text-muted-foreground/90',
                                                        'hover:text-primary transition-all duration-150',
                                                        'hover:translate-x-1.5',
                                                        'active:translate-x-0.5',
                                                        'border-l border-transparent pl-2 -ml-px',
                                                        'hover:border-primary/50'
                                                    )}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        setIsOpen(false)
                                                    }}
                                                >
                                                    {t(subItem.label)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* 底部信息优化 */}
                    <div className='p-4 sm:p-6 pt-3 border-t border-border/20 bg-accent/5'>
                        <div className='flex justify-center gap-3 mb-3'>
                            <LangToggle />
                            <ThemeToggle />
                        </div>
                        <p className='text-[0.8rem] text-muted-foreground/80 text-center leading-5'>
                            © {new Date().getFullYear()} Resume My. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
