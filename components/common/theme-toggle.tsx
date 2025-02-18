'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun, Laptop } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ThemeToggle = ({ className }: { className?: string }) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // 解决 SSR 主题不匹配问题
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    // 样式配置
    const baseStyle = cn(
        'rounded-lg p-2 transition-all duration-300 ease-out',
        'hover:bg-gray-100 dark:hover:bg-fluo-background',
        'transform hover:scale-105 active:scale-95',
        className
    )
    const activeStyle = 'text-blue-500 scale-110'
    const inactiveStyle = 'text-gray-600/90 dark:text-gray-400/90'

    return (
        <div className='flex items-center gap-2 bg-background/80 backdrop-blur-lg rounded-xl p-1 border border-border/20 shadow-sm'>
            <button
                onClick={() => setTheme('light')}
                className={`${baseStyle} ${theme === 'light' ? activeStyle : inactiveStyle}`}
                aria-label='Light theme'
            >
                <Sun className='h-5 w-5 transition-all duration-300 ease-out' />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`${baseStyle} ${theme === 'dark' ? activeStyle : inactiveStyle}`}
                aria-label='Dark theme'
            >
                <Moon className='h-5 w-5 transition-all duration-300 ease-out' />
            </button>
            <button
                onClick={() => setTheme('system')}
                className={`${baseStyle} ${theme === 'system' ? activeStyle : inactiveStyle}`}
                aria-label='System theme'
            >
                <Monitor className='h-5 w-5 transition-all duration-300 ease-out' />
            </button>
        </div>
    )
}

export const ThemeToggleBtn = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const themeOrder = ['light', 'dark']

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const cycleTheme = () => {
        const currentIndex = themeOrder.indexOf(theme || 'light')
        const nextIndex = (currentIndex + 1) % themeOrder.length
        setTheme(themeOrder[nextIndex])
    }

    const getIcon = () => {
        switch (theme) {
            case 'dark':
                return <Moon className='h-5 w-5' />
            case 'system':
                return <Laptop className='h-5 w-5' />
            default:
                return <Sun className='h-5 w-5' />
        }
    }

    return (
        <button
            onClick={cycleTheme}
            className={cn(
                'rounded-lg p-2 transition-all duration-300 ease-out',
                'hover:bg-gray-100 dark:hover:bg-gray-800/30',
                'transform hover:scale-105 active:scale-95',
                'text-gray-600/90 dark:text-gray-400/90',
                'hover:text-blue-500 dark:hover:text-blue-400'
            )}
            aria-label='Toggle theme'
        >
            <div className='relative h-5 w-5'>
                <div className='absolute inset-0 transition-all duration-300 ease-out'>{getIcon()}</div>
            </div>
        </button>
    )
}
