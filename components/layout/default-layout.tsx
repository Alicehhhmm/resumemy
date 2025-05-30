import type { FC, PropsWithChildren } from 'react'

import { NavHeader } from '@/components/navigation/nav-header'
import WithFooter from '@/components/WithFooter'

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <NavHeader />
            <main className='pt-[60px] min-h-[calc(100vh-86.4px)]'>{children}</main>
            <WithFooter />
        </>
    )
}
