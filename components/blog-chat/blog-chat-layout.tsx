'use client'
import type { FC, PropsWithChildren } from 'react'
import type { BlogPostsRSC, LinkTab } from '@/types/blog'

import { WithChatLayout } from '@/components/WithChatLayout'
import { BlogChatPostLayout } from '@/components/blog-chat/blog-chat-posts'

import { BlogList } from './blog-list'
import { useGlobClientContext } from '@/hooks/use-glob-context'
import { useMemo } from 'react'
import { useSidebarStore } from '@/hooks'

interface BlogChatLayoutProps extends PropsWithChildren {
    categories: Array<LinkTab>
    blogData: BlogPostsRSC
}

const SUPPORTED_LAYOUTS = ['blog-post', 'blog-chat-post'] as const
type SupportedLayout = (typeof SUPPORTED_LAYOUTS)[number]

export const BlogChatLayout: FC<BlogChatLayoutProps> = ({ children, categories, blogData }) => {
    const { frontmatter, pathname } = useGlobClientContext()
    const { layout } = frontmatter

    const { setBreadcrumbLinks } = useSidebarStore()

    const showPosts = useMemo(() => {
        // 根据全局上下文，结合 pathname 获取选择的文章加入到面包屑
        let selectPost = blogData.posts.find(p => p.slug === pathname)
        if (selectPost) {
            setBreadcrumbLinks({
                href: selectPost.slug,
                label: selectPost.title,
            })
        }

        return Boolean(children && layout && SUPPORTED_LAYOUTS.includes(layout as SupportedLayout))
    }, [children, layout, pathname])

    return (
        <WithChatLayout modelKey={['blog-chat']} messages={{ channels: categories }}>
            {showPosts ? <BlogChatPostLayout>{children}</BlogChatPostLayout> : <BlogList data={blogData} />}
        </WithChatLayout>
    )
}
