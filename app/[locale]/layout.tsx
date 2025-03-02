import { getTranslations } from 'next-intl/server'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { OPEN_SANS, IBM_PLEX_MONO } from '@/config/next.fonts'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { RThemeProvider } from '@/components/providers/theme-providers'
import { LocaleProvider } from '@/components/providers/locale-provider'

import '@/styles/globals.css'

type RootProps = {
    children: React.ReactNode
    params: { locale: string }
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

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn(OPEN_SANS.className, IBM_PLEX_MONO.variable, `antialiased`, `bg-white dark:bg-[#313333]`)}>
                <TailwindIndicator />
                <Toaster />
                <LocaleProvider locale={locale}>
                    <RThemeProvider>{children}</RThemeProvider>
                </LocaleProvider>
            </body>
        </html>
    )
}
