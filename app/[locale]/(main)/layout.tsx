import React from 'react'

import WithLayout from '@/components/layout/with-layout'

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {
    return (
        <>
            <WithLayout layout={'home'}>{children}</WithLayout>
        </>
    )
}

export default MainLayout
