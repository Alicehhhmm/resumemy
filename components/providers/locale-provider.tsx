import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { useMessages, NextIntlClientProvider, useTimeZone } from 'next-intl'
import type { FC, PropsWithChildren } from 'react'
import { routing } from '@/i18n/routing'

interface LocaleProviderProps extends PropsWithChildren {
    locale: string
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }))
}

export const LocaleProvider: FC<LocaleProviderProps> = ({ children, locale }) => {
    const messages = useMessages()
    const timezone = useTimeZone()

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound()
    }

    // Enable static rendering
    setRequestLocale(locale)

    return (
        <NextIntlClientProvider messages={messages} timeZone={timezone}>
            {children}
        </NextIntlClientProvider>
    )
}
