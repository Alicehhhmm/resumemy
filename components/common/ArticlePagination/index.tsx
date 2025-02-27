import { FC } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from '@/components/common'

export interface PaginationItem {
    href: string
    title: string
}

interface ArticlePaginationProps {
    previous?: PaginationItem
    next?: PaginationItem
}

export const ArticlePagination: FC<ArticlePaginationProps> = ({ previous, next }) => {
    if (!previous && !next) return null

    const baseClass = `
        flex h-full items-center  gap-2
        rounded-lg border border-gray-200 p-4 transition-all 
        hover:border-lime-600/80 hover:bg-orange-50/50 
        active:border-lime-600/80 active:bg-orange-50/50
        dark:border-gray-800
        dark:hover:border-lime-600/60 dark:active:border-lime-600/60
        dark:hover:bg-fluo-background dark:active:bg-fluo-background
        focus:outline-none focus:ring-1 focus:ring-lime-600/60 
    `
    const labelCalss = `
        text-sm font-medium text-gray-700/90 transition-colors 
        group-hover:text-lime-600 
        dark:group-hover:text-lime-500
        dark:group-active:text-lime-500
    `
    const iconClass = `
        h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-lime-600
    `

    return (
        <nav aria-label='文章尾部导航' className='not-prose mt-12'>
            <div className='flex flex-col gap-4 sm:flex-row sm:justify-between'>
                {previous && (
                    <div className='group flex-1'>
                        <Link href={previous.href} className={cn(baseClass)} aria-label={`上一页：${previous.title}`}>
                            <ChevronLeft className={cn(iconClass)} />
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-500'>Previous Page</span>
                                <span className={cn(labelCalss)}>{previous.title}</span>
                            </div>
                        </Link>
                    </div>
                )}

                {next && (
                    <div className='group flex-1 sm:text-right'>
                        <Link href={next.href} className={cn(baseClass, `justify-end`)} aria-label={`下一页：${next.title}`}>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-500'>Next Page</span>
                                <span className={cn(labelCalss)}>{next.title}</span>
                            </div>
                            <ChevronRight className={cn(iconClass)} />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default ArticlePagination
