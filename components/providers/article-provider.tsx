'use client'

import { createContext } from 'react'
import type { FC, ReactNode, PropsWithChildren } from 'react'

export interface ArticleSharedContext {
    href: string
    label: string
    title: string
    tocOptions: {
        activeKey?: string
        onClick?: (id: string) => void
    }
}

type ArticleContextType = PropsWithChildren<Partial<ArticleSharedContext>>

export const ArticleContext = createContext<ArticleContextType>({})

export const ArticleProvider: FC<ArticleContextType> = ({ children, ...props }) => {
    return <ArticleContext.Provider value={{ ...props }}>{children}</ArticleContext.Provider>
}
