'use client'

import type { FC } from 'react'
import { useTransition } from 'react'
import { LanguagesIcon } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { type Locale, useRouter, usePathname } from '@/i18n/routing'

import { cn } from '@/lib/utils'
import { availableLocales } from '@/core/next.locales.mjs'

import type { UniversalDropdownMenuProps } from '@/components/common'
import { UniversalDropdownMenu } from '@/components/common'

type LanguageOption = {
    value: Locale
    label: string
}

interface LanguageSwitcherProps {
    className?: string
    currentLanguage?: Locale
    options?: LanguageOption[]
}

export const LangToggle: FC<LanguageSwitcherProps> = ({ className, currentLanguage, options = [] }) => {
    const { replace } = useRouter()
    const pathname = usePathname()
    const locales = useLocale()
    const t = useTranslations()
    const [isPending, startTransition] = useTransition()

    // init data
    if (!currentLanguage || !options) {
        const languages = availableLocales.map(lang => ({
            value: lang.code,
            label: lang.localName,
        }))
        options = [...languages]
        currentLanguage = locales
    }

    const handleLocaleChange = (newLocale: Locale) => {
        if (!pathname || newLocale === currentLanguage) return

        startTransition(() => {
            replace(pathname!, { locale: newLocale })
        })
    }

    // filter map
    const currentOption = options.find(option => option.value === currentLanguage) || options[0]
    const ariaLabel = t('components.common.languageDropdown.label')

    const groups: UniversalDropdownMenuProps['groups'] = [
        {
            label: `${ariaLabel}: ${currentOption.label}`,
            items: options.map(option => ({
                label: option.label,
                disabled: isPending,
                shortcut: currentLanguage === option.value ? '✓' : undefined,
                selected: currentLanguage === option.value,
                onSelect: () => handleLocaleChange(option.value),
            })),
        },
    ]

    return (
        <UniversalDropdownMenu
            trigger={
                <button
                    className={cn(
                        'rounded-lg p-2 transition-all duration-300 ease-out',
                        'hover:bg-gray-100 dark:hover:bg-fluo-background',
                        'text-gray-600/90 hover:text-primary dark:text-gray-400/90',
                        isPending && 'opacity-70 pointer-events-none',
                        className
                    )}
                    disabled={isPending}
                    aria-label={ariaLabel}
                >
                    <LanguagesIcon className='size-5' />
                </button>
            }
            groups={groups}
            className='min-w-[8rem] rounded-lg overflow-hidden py-2 space-y-1'
        />
    )
}
