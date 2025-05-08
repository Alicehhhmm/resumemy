import type { FC, PropsWithChildren } from 'react'

import { AppSidebar } from '@/components/projects/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { ContentHeader } from '@/components/projects/content-header'
import { ContentMain } from '@/components/projects/content-main'

import { getProjects } from '@/fatch-data/projects-data'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'

export const ProjectLayout: FC<PropsWithChildren> = async ({ children }) => {
    // Get initial projects for SSR
    const initialProjects = await getProjects({
        search: '',
        category: 'all',
        sort: 'trending',
        page: 1,
        limit: DEFAULT_PAGE_SIZE,
    })

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <ContentHeader />
                    <ContentMain initialProjects={initialProjects}>{children}</ContentMain>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
