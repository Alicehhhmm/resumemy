'use client'

import type { FC, PropsWithChildren } from 'react'

import { ChevronDown, Home, Rocket, Zap, Code, Gauge, Settings, GitBranch, BookOpen } from 'lucide-react'

import { NavHeader } from '@/components/navigation/nav-header'
import { FooterSimple } from '@/components/common/footer-simple'
import { BlogHeader, BolgSettingsSheet, BlogCenter } from '@/components/blog'

import { Sidebar, SidebarDataType } from '@/components/navigation/nav-sidebar'
import sidebarData from '@/config/siderbar-data-model.json'

export const BlogLayout: FC<PropsWithChildren> = ({ children }) => {
    const iconMap = {
        Home,
        Rocket,
        Zap,
        Code,
        Gauge,
        Settings,
        GitBranch,
        BookOpen,
    }

    return (
        <>
            <NavHeader />
            <div className='flex pt-navh'>
                {/* 左侧目录 */}
                <div className='w-[var(--nr-siderbar)] h-[calc(100dvh-60px)] sticky top-[60px]'>
                    <Sidebar sections={sidebarData.sections as SidebarDataType[]} iconMap={iconMap} />
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='flex-1 flex flex-row'>
                        {/* 中间内容区域 */}
                        <main className='flex-1 bg-white dark:bg-background'>
                            <div className='max-w-4xl mx-auto p-6 overflow-auto'>
                                <BlogHeader cover='' title='博客文章' description='行业新闻、研究案例、学习笔记和资源。' />
                                <article className='h-[2000px]'>{children}</article>
                            </div>
                        </main>
                        {/* 右侧目录 */}
                        <div className='w-[var(--nr-siderbar)] max-h-[calc(100vh-60px)] sticky top-[60px] scrollbar-hide overflow-hidden overflow-y-auto'>
                            <aside className='w-full flex flex-col'>
                                <div className='h-60 w-60  bg-slate-300'>1</div>
                                <div className='h-60 bg-green-400'>2</div>
                                <div className='h-60 bg-pink-400'>3</div>
                            </aside>
                        </div>
                    </div>
                    <FooterSimple />
                </div>
            </div>
        </>
    )
}
