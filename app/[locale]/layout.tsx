import { getTranslations } from 'next-intl/server'

import { LocaleProvider } from '@/components/providers/locale-provider'
import { RThemeProvider } from '@/components/providers/theme-providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'
import { IBM_PLEX_MONO, OPEN_SANS } from '@/lib/next.fonts'
import { cn } from '@/lib/utils'
import { TopLoader } from '@/components/common'

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
                        {children}
                    </RThemeProvider>
                </LocaleProvider>
            </body>
        </html>
    )
}
