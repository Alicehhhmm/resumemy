import { notFound } from 'next/navigation'
import { Open_Sans } from 'next/font/google'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { RThemeProvider } from '@/components/providers/theme-providers'

const font = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
})

type RootProps = {
    children: React.ReactNode
    params: { locale: string }
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Omit<RootProps, 'children'>) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'common' })

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default async function RootLayout({ children, params }: RootProps) {
    const { locale } = await params

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound()
    }

    // Enable static rendering
    setRequestLocale(locale)

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn(font.className, `antialiased`, `bg-white dark:bg-[#313333]`)}>
                <NextIntlClientProvider messages={messages}>
                    <RThemeProvider attribute='class' defaultTheme='light' enableSystem storageKey='rose-theme'>
                        {children}
                    </RThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
