'use client'

import type { FC } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import type { NavigationKeys } from '@/types'

interface WithBreadcrumbsProps {
    navKeys?: Array<NavigationKeys>
}

export const WithBreadcrumbs: FC<WithBreadcrumbsProps> = ({ navKeys = [] }) => {
    // TODO: get usePathname path to BreadcrumbLink hash to BreadcrumbPage
    return (
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className='hidden md:block'>
                            <BreadcrumbLink href='#'>Projects</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='hidden md:block' />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
