'use client'


import type { FC, PropsWithChildren } from 'react'
import { PostLayout } from '@/components/layout/posts'
import { WithChatLayout } from '@/components/WithChatLayout'

interface ChatPostLayoutProps extends PropsWithChildren {

}

export const BlogChatPostLayout: FC<ChatPostLayoutProps> = ({ children }) => {

  // TODO: add bg-meash and update styles

    return (
        <>
            <PostLayout>  
                  {children}
            </PostLayout>
        </>
    )
}
