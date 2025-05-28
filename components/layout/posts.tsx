'use client'
import { useRef, useMemo } from 'react'
import type { FC, PropsWithChildren } from 'react'

import { ArticleProvider } from '@/components/providers'
import { ArticleAside } from '@/components/common/ArticleAside'

import { transformHeadingsToTOC } from '@/utils'
import { useGlobClientContext, useActiveHeading } from '@/hooks'

export const PostLayout: FC<PropsWithChildren> = ({ children }) => {
    const { headings } = useGlobClientContext()
    const articleRef = useRef<HTMLDivElement>(null)

    const tocData = useMemo(() => transformHeadingsToTOC(headings, 2), [headings])

    // 获取当前文章置顶标题ID
    const activeId = useActiveHeading(articleRef, {
        topBoundary: 120,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    })

    return (
        <>

            <ArticleProvider
                tocOptions={{
                    activeKey: activeId,
                }}
            >
                <div className='flex pt-navh lg:mx-20 xl:ml-40 bg-background dark:bg-background'>
                    <div className='min-h-[calc(100vh-60px)] flex-1 dark:bg-background'>
                        <main className='lg:max-w-[calc(100vw-var(--nr-sidebar)-15px)] overflow-hidden'>
                            <article ref={articleRef} className='flex flex-col gap-6 max-sm:px-6 px-16 py-10 overflow-hidden'>
                                {children}
                            </article>
                        </main>
                    </div>

                    {/* Sidebar TOC*/}
                    <div
                        className='hidden lg:block flex-shrink-0 w-[var(--nr-sidebar)] max-h-[calc(100vh-60px)] 
                        sticky top-[60px] scrollbar-hide overflow-hidden overflow-y-auto dark:bg-background'
                    >
                        <aside className='bg-background dark:bg-background flex flex-col'>
                            <ArticleAside toc={tocData} />
                        </aside>
                    </div>
                </div>
            </ArticleProvider>

        </>
    )
}
