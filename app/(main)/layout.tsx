import React from 'react'
import { NavHeader } from '@/components/navigation/nav-header'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <div className='fixed top-0 left-0 right-0 z-30'>
                <NavHeader />
            </div>
            <main className='pt-[60px] h-full'>{children}</main>
        </div>
    )
}

export default MainLayout
