'use client'

import type { FC, PropsWithChildren } from 'react'

import { NavHeader } from '@/components/navigation/nav-header'
import WithFooter from '@/components/WithFooter'
import { PostLayout } from '@/components/layout/posts'

export const BlogPosts: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NavHeader />

            <PostLayout>{children}</PostLayout>

            <WithFooter />
        </>
    )
}
