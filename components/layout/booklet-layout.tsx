import type { FC, PropsWithChildren } from 'react'

import { BookletSidebar } from '@/components/booklet/booklet-sidebar'
import { BookletContentMain } from '@/components/booklet/booklet-content-main'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { WithBreadcrumbs } from '@/components/WithBreadcrumbs'

export const BookletLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SidebarProvider>
                <BookletSidebar />
                <SidebarInset>
                    <WithBreadcrumbs navKeys={['booklet']} />
                    <BookletContentMain>{children}</BookletContentMain>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
