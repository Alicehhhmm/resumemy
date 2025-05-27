import type { FC, PropsWithChildren } from 'react'
import type { BlogPostsRSC, LinkTab } from '@/types/blog'

import { WithChatLayout } from '../WithChatLayout'

interface BlogChatLayoutProps extends PropsWithChildren {
    categories: Array<LinkTab>
    blogData: BlogPostsRSC
}

export const BlogChatLayout: FC<BlogChatLayoutProps> = async ({ children, categories, blogData }) => {
    return (
        <>
            <WithChatLayout modelKey={['blog-chat']} messages={{ channels: categories }} posts={blogData}>
                {children}
            </WithChatLayout>
        </>
    )
}
