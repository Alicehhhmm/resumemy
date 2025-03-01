import { User, Calendar } from 'lucide-react'
import type { BlogCategory } from '@/types/blog'

import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/date'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/components/common'
import ArticleCover from '@/components/common/ArticleCover'

type BlogPostCardProps = {
    title: string
    category: BlogCategory
    description?: string
    author?: string
    date?: Date
    slug?: string
}

export const BlogPostCard = ({ title, category, description, author, date, slug }: BlogPostCardProps) => {
    return (
        <article className='group relative w-fullbg-white rounded-lg shadow-sm'>
            <Link href={slug} className='w-full overflow-hidden rounded-lg m-0 cursor-pointer'>
                <ArticleCover title={title} type='default' />
            </Link>

            <div className='space-y-3 p-0 flex flex-col mt-4 pb-4'>
                {category && (
                    <Badge
                        className={cn(
                            'w-fit px-3 py-1 text-xs font-semibold uppercase tracking-wider',
                            'border-lime-200 bg-lime-100/20 text-lime-500 cursor-pointer rounded-md',
                            'hover:bg-lime-100 transition-colors'
                        )}
                    >
                        {category}
                    </Badge>
                )}

                <Link
                    href={slug}
                    className={cn(
                        'text-xl font-bold text-gray-900 dark:text-foreground/60 leading-tight',
                        'hover:text-lime-600 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 rounded-md'
                    )}
                >
                    {title}
                </Link>

                {description && <p className='text-gray-600 leading-relaxed line-clamp-3'>{description}</p>}

                <footer className='flex flex-row items-center justify-between'>
                    <div className='space-y-1'>
                        <div className='flex items-center gap-1 text-sm'>
                            <User className='w-4 h-4 text-gray-400 flex-shrink-0' />
                            <span className='text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border-gray-200'>{author ?? 'Untitled'}</span>
                        </div>

                        {/* 日期 */}
                        {date && (
                            <div className='flex items-center gap-1 text-sm text-gray-400'>
                                <Calendar className='w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0' />
                                <time>{formatDate(date)}</time>
                            </div>
                        )}
                    </div>
                </footer>
            </div>
        </article>
    )
}
