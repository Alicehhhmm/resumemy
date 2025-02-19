import type { FC, PropsWithChildren } from 'react'

import { NavHeader } from '@/components/navigation/nav-header'
import { FooterSimple } from '@/components/common/footer-simple'

export const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className='h-screen flex flex-col'>
                <NavHeader />
                <main className='pt-[60px] overflow-hidden flex-1'>{children}</main>
                <div className='flex-none'>
                    <FooterSimple />
                </div>
            </div>
        </>
    )
}
