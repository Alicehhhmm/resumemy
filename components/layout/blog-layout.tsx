import type { FC, PropsWithChildren } from 'react'

import { NavHeader } from '@/components/navigation/nav-header'
import { FooterSimple } from '@/components/common/footer-simple'
import { BlogHeader, BolgSettingsSheet, BlogCenter } from '@/components/blog'

export const BlogLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NavHeader />
            <main className='pt-[60px] min-h-[calc(100vh-86.4px)]'>
                <BlogHeader />
                <BolgSettingsSheet />
                <BlogCenter />
                {children}
            </main>
            <FooterSimple />
        </>
    )
}
