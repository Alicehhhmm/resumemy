import type { FC, PropsWithChildren } from 'react'

import { NavHeader } from '@/components/navigation'
import WithFooter from '@/components/WithFooter'

export const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className='min-h-screen flex flex-col'>
                <NavHeader />
                <main className='pt-[60px] overflow-hidden flex-1'>{children}</main>
                <div className='flex-none'>
                    <WithFooter />
                </div>
            </div>
        </>
    )
}
