'use client'

import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import type { BlogPostsRSC, LinkTab } from '@/types/blog'

import { WithChatLayout } from '@/components/WithChatLayout'
import { BlogChatPostLayout } from '@/components/blog-chat/blog-chat-posts'

import { BlogList } from './blog-list'
import { useGlobClientContext } from '@/hooks/use-glob-context'
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

    const { setBreadcrumbLinks, clearBreadcrumbs } = useSidebarStore()

    const showPosts = !!children && layout && SUPPORTED_LAYOUTS.includes(layout as SupportedLayout)

    // Based on the current pathname, listen to the currently selected article.
    useEffect(() => {
        if (!showPosts) return

        const selectedPost = blogData.posts.find(p => p.slug === pathname)
        if (selectedPost) {
            setBreadcrumbLinks({
                href: selectedPost.slug,
                label: selectedPost.title,
            })
        }
        
    }, [showPosts, pathname, blogData.posts, setBreadcrumbLinks])

    return (
        <WithChatLayout modelKey={['blog-chat']} messages={{ channels: categories }}>
            {showPosts ? <BlogChatPostLayout>{children}</BlogChatPostLayout> : <BlogList data={blogData} />}
        </WithChatLayout>
    )
}
