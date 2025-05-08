'use client'

import { memo } from 'react'
import type { ReactNode } from 'react'
import { ProjectGrid } from '@/components/projects/project-grid'
import { ProjectFilters } from '@/components/projects/project-filters'
import { useProjects } from '@/hooks/use-projects'
import type { ProjectsResponse } from '@/types/project'

interface ContentMainProps {
    children: ReactNode
    initialProjects: ProjectsResponse
}

export const ContentMain = memo(({ children, initialProjects }: ContentMainProps) => {
    const { projects, loading, loadingMore, initialLoading, total, search, setSearch, category, setCategory, sort, setSort, observerRef } =
        useProjects({ initialProjects })

    return (
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0 content-wrapper'>
            <ProjectFilters
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                sort={sort}
                onSortChange={setSort}
                totalProjects={total}
                shownProjects={projects.length}
            />

            <div className={`transition-opacity duration-300 ${loading ? 'opacity-90' : 'opacity-100'}`}>
                <ProjectGrid
                    projects={projects}
                    loading={loading}
                    loadingMore={loadingMore}
                    initialLoading={initialLoading}
                    searchTerm={search}
                    category={category}
                    observerRef={observerRef}
                />
            </div>

            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>{children}</div>
        </div>
    )
})
