import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { RThemeProvider } from '@/components/providers/theme-providers'

const font = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'RoseUI Documentation',
    description: 'An interesting library of react ui components',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={cn(font.className, `antialiased`, `bg-white dark:bg-[#313333]`)}>
                <RThemeProvider attribute='class' defaultTheme='light' enableSystem storageKey='rose-theme'>
                    {children}
                </RThemeProvider>
            </body>
        </html>
    )
}
