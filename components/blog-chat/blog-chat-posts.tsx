'use client'

import type { FC, PropsWithChildren } from 'react'
import { PostLayout } from '@/components/layout/posts'

interface ChatPostLayoutProps extends PropsWithChildren {}

export const BlogChatPostLayout: FC<ChatPostLayoutProps> = ({ children }) => {
    // TODO: add bg-meash and update styles

    return (
        <div className='p-0'>
            <PostLayout>{children}</PostLayout>
        </div>
    )
}
