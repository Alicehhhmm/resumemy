'use client'

import { useEffect, useState } from 'react'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

type Language = 'zh' | 'en'

export const LangToggle = () => {
    const [mounted, setMounted] = useState(false)
    const [currentLang, setCurrentLang] = useState<Language>('en')

    useEffect(() => {
        setMounted(true)
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang) setCurrentLang(savedLang)
    }, [])

    if (!mounted) return null

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'zh' : 'en'
        setCurrentLang(newLang)
        localStorage.setItem('language', newLang)
        // TODO: 这里可以添加语言切换的具体实现
        // 例如使用 next-intl 或其他国际化库
    }

    return (
        <button
            onClick={toggleLanguage}
            className={cn(
                'rounded-lg p-2 transition-all duration-300 ease-out',
                'hover:bg-gray-100 dark:hover:bg-gray-800/30',
                'transform hover:scale-105 active:scale-95',
                'text-gray-600/90 dark:text-gray-400/90',
                'hover:text-primary'
            )}
            aria-label='Toggle language'
        >
            <div className='relative flex items-center gap-2'>
                <Languages className='h-5 w-5 transition-all duration-300 ease-out' />
                <span className='text-sm font-medium'>{currentLang.toUpperCase()}</span>
            </div>
        </button>
    )
}
