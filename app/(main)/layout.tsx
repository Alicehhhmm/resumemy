import React from 'react'
import { NavHeader } from '@/components/navigation/nav-header'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <div className='bg-white w-full hidden sm:block md:flex md:h-[72px] z-30 fixed'>
                <NavHeader />
            </div>
            <main className='sm:pt-[36px] md:pt-[72px] h-full'>{children}</main>
        </div>
    )
}

export default MainLayout
