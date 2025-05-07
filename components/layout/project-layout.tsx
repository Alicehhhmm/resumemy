import type { FC, PropsWithChildren } from 'react'

import { AppSidebar } from '@/components/projects/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { ContentHeader } from '@/components/projects/content-header'
import { ContentMain } from '@/components/projects/content-main'

export const ProjectLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <ContentHeader />
                    <ContentMain>{children}</ContentMain>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
