import React from 'react'
import { NavHeader } from '@/components/navigation/nav-header'
import { Footer } from '@/components/common/footer'
import { FooterSimple } from '@/components/common/footer-simple'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen flex flex-col'>
            <div className='fixed top-0 left-0 right-0 z-30'>
                <NavHeader />
            </div>
            <main className='pt-[60px] overflow-hidden flex-1'>{children}</main>
            <div className='flex-none'>
                <FooterSimple />
            </div>
        </div>
    )
}

export default MainLayout
