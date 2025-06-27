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
        <ArticleProvider
            tocOptions={{
                activeKey: activeId,
            }}
        >
            <div className='grid lg:grid-cols-[minmax(0,1fr)_var(--nr-sidebar)]'>
                <div className='max-h-[calc(100vh-60px)] lg:max-w-[calc(100vw-var(--nr-sidebar))] scrollbar-hide overflow-y-auto'>
                    <article ref={articleRef} className='flex flex-col gap-6 max-sm:px-6 px-16 py-10 overflow-hidden text-muted-foreground'>
                        {children}
                    </article>
                </div>

                {/* Sidebar TOC*/}
                <div
                    className='hidden lg:block flex-shrink-0 w-[var(--nr-sidebar)] max-h-[calc(100vh-60px)] 
                        sticky top-[60px] scrollbar-hide overflow-hidden overflow-y-auto dark:bg-muted/30'
                >
                    <aside className='flex flex-col'>
                        <ArticleAside toc={tocData} />
                    </aside>
                </div>
            </div>
        </ArticleProvider>
    )
}
