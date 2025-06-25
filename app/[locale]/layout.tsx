import { getTranslations } from 'next-intl/server'

import { Toaster } from '@/components/ui/sonner'
import { TopLoader } from '@/components/common'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { RThemeProvider, LocaleProvider, QueryProvider } from '@/components/providers'

import { cn } from '@/lib/utils'
import { IBM_PLEX_MONO, OPEN_SANS } from '@/lib/next.fonts'

// TODO: Use dynamic routing configuration uniformly
import { siteConfig } from '@/config/next.json.mjs'

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
        icons: { icon: siteConfig.favicon },
    }
}

export default async function RootLayout({ children, params }: RootProps) {
    const { locale } = await params

    return (
        <html lang={locale} suppressHydrationWarning>
            {/* dev: react-scan */}

            <body className={cn(OPEN_SANS.className, IBM_PLEX_MONO.variable)}>
                <TailwindIndicator />
                <Toaster />
                <LocaleProvider locale={locale}>
                    <RThemeProvider>
                        <TopLoader />
                        <QueryProvider>{children}</QueryProvider>
                    </RThemeProvider>
                </LocaleProvider>
            </body>
        </html>
    )
}
