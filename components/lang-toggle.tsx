'use client'

import { useEffect, useState, useTransition } from 'react'
import { Languages } from 'lucide-react'

import { useLocale } from 'next-intl'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Locale, routing, getPathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export const LangToggle = () => {
    const locale = useLocale() as Locale
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const toggleLanguage = () => {
        const newLocale: Locale = locale === 'en' ? 'zh' : 'en'

        startTransition(() => {
            try {
                // 获取无语言前缀的原始路径
                const rawPathname = pathname.split('/').slice(2).join('/') || '/'

                // 生成正确的本地化路径
                const localizedPathname = getPathname({
                    href: { pathname: rawPathname },
                    locale: newLocale,
                })

                // 保留查询参数
                const searchString = searchParams.toString()
                const targetURL = `${localizedPathname}${searchString ? `?${searchString}` : ''}`

                // 更新路由并持久化设置
                router.replace(targetURL)
                document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
                localStorage.setItem('user-locale', newLocale)
            } catch (error) {
                // 异常时回退到默认语言
                const fallbackPath = getPathname({
                    href: { pathname },
                    locale: routing.defaultLocale,
                })
                router.replace(`${fallbackPath}?${searchParams.toString()}`)
            }
        })
    }

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className={cn(
                'rounded-lg p-2 transition-all duration-300 ease-out',
                'hover:bg-gray-100 dark:hover:bg-gray-800/30',
                'transform hover:scale-105 active:scale-95',
                'text-gray-600/90 dark:text-gray-400/90',
                'hover:text-primary flex items-center gap-2',
                isPending && 'opacity-50 cursor-not-allowed'
            )}
            aria-label='Toggle language'
        >
            <div className='relative flex items-center gap-2'>
                <Languages className='h-5 w-5 transition-all duration-300 ease-out' />
                <span className='text-sm font-medium'>{locale.toUpperCase()}</span>
            </div>
        </button>
    )
}
