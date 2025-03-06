import type { FC, PropsWithChildren } from 'react'

import { NavHeader } from '@/components/navigation/nav-header'
import { FooterSimple } from '@/components/common/footer-simple'

import { ArticleAside } from '@/components/common/ArticleAside'
import { TOCMOCK } from '@/config/toc-mock'

import React from 'react'

const PostLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NavHeader />

            <div className='flex pt-navh'>
                {/* Main Content Area */}
                <div className='min-h-[calc(100vh-60px)] flex-1 dark:bg-background'>
                    <main className='w-[calc(100vw-15px)] md:max-w-[calc(100vw-var(--nr-sidebar)-15px)] overflow-hidden'>
                        <article className='flex flex-col gap-6 mx-20 max-sm:mx-10 px-10 py-10 overflow-hidden'>{children}</article>
                    </main>
                </div>

                {/* Sidebar */}
                <div
                    className='hidden md:block flex-shrink-0 w-[var(--nr-sidebar)] max-h-[calc(100vh-60px)] 
                    sticky top-[60px] scrollbar-hide overflow-hidden overflow-y-auto dark:bg-background'
                >
                    <aside className='bg-background dark:bg-background flex flex-col'>
                        <ArticleAside toc={TOCMOCK} />
                    </aside>
                </div>
            </div>

            <FooterSimple />
        </>
    )
}

export default PostLayout
