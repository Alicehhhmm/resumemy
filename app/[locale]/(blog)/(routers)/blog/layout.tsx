import React from 'react'

import WithLayout from '@/components/layout/with-layout'

interface BlogMainLayoutProps {
    children: React.ReactNode
}

const BlogMainLayout = async ({ children }: BlogMainLayoutProps) => {
    return (
        <>
            <WithLayout layout={'blog'}>{children}</WithLayout>
        </>
    )
}

export default BlogMainLayout
