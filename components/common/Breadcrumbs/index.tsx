'use client'

import type { FC } from 'react'
import { Fragment, useMemo } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import type { FormattedMessage, LinkLike } from '@/types'

import BreadcrumbHomeItem from './BreadcrumbHomeItem'

export type BreadcrumbLinks = {
    label: FormattedMessage
    href?: string
}

type BreadcrumbsProps = {
    links: BreadcrumbLinks[]
    maxLength?: number
    hideHome?: boolean
    homeLinkAriaLabel?: string
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links = [], maxLength = 5, hideHome = false, homeLinkAriaLabel }) => {
    const items = useMemo(() => {
        const visibleLinks = links.length > maxLength ? links.slice(-maxLength + 1) : links

        return visibleLinks.map((link, index) => {
            const isLastItem = index === visibleLinks.length - 1

            return (
                <Fragment key={link.label.toString()}>
                    <BreadcrumbItem>
                        {!isLastItem ? (
                            <BreadcrumbLink href={link.href ?? '#'}>{link.label}</BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{link.label}</BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                    {!isLastItem && <BreadcrumbSeparator className='hidden md:block' />}
                </Fragment>
            )
        })
    }, [links, maxLength])

    return (
        <Breadcrumb>
            <BreadcrumbList className='px-2'>
                {!hideHome && <BreadcrumbHomeItem aria-label={homeLinkAriaLabel} />}
                {items}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default Breadcrumbs
