'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function RThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider attribute='data-theme' defaultTheme='light' enableSystem storageKey='rose-theme' {...props}>
            {children}
        </NextThemesProvider>
    )
}
