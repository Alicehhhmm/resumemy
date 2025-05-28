'use client'
import type { FC, PropsWithChildren } from 'react'
import type { BlogPostsRSC, LinkTab } from '@/types/blog'

import { WithChatLayout } from '@/components/WithChatLayout'
import { BlogChatPostLayout } from "@/components/blog-chat/blog-chat-posts";

import { BlogList } from './blog-list'
import { useGlobClientContext } from "@/hooks/use-glob-context"
import { useMemo } from 'react'

interface BlogChatLayoutProps extends PropsWithChildren {
    categories: Array<LinkTab>
    blogData: BlogPostsRSC
}

const SUPPORTED_LAYOUTS = ['blog-post', 'blog-chat-post'] as const
type SupportedLayout = typeof SUPPORTED_LAYOUTS[number]

export const BlogChatLayout: FC<BlogChatLayoutProps> = ({ children, categories, blogData }) => {
    const { frontmatter } = useGlobClientContext()
    const { layout } = frontmatter
    
    const showPosts = useMemo(() => {
        return Boolean(
            children && 
            layout && 
            SUPPORTED_LAYOUTS.includes(layout as SupportedLayout)
        )
    }, [children, layout])
    
    return (
        <WithChatLayout modelKey={['blog-chat']} messages={{ channels: categories }}>
            {
              showPosts ? (
                <BlogChatPostLayout>{children}</BlogChatPostLayout>
              ) : (
                <BlogList data={blogData} />
              )
            }
        </WithChatLayout>
    )
}
