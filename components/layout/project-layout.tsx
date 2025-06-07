import type { FC, PropsWithChildren } from 'react'

import { ProjectSidebar } from '@/components/projects/project-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { ContentMain } from '@/components/projects/content-main'

import { getProjects } from '@/fatch-data/fetch-projects-data'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import { ContentHeader } from '../projects/content-header'

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
                <ProjectSidebar />
                <SidebarInset>
                    <ContentHeader />
                    <ContentMain initialProjects={initialProjects}>{children}</ContentMain>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
