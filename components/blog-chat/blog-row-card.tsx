import Image from 'next/image'
import { Calendar, MoreVertical } from 'lucide-react'

import { toast } from 'sonner'
import type { ArticleColumn } from '@/types/blog'
import { formatDate } from '@/lib/date'
import { Link } from '@/components/common'
import ArticleCover from '@/components/common/ArticleCover'

type BlogPostCardProps = ArticleColumn

export const BlogPostCardRow = ({
    title,
    category,
    description,
    author,
    date,
    slug,
    viewCount = 0,
    commentCount = 0,
    coverImage,
}: BlogPostCardProps) => {
    const handleEditor = () => {
        toast('未开放', {
            description: 'Go to github to edit this page',
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
            },
        })
    }
    return (
        <article className='group relative w-full bg-white dark:bg-neutral-900/40 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            <div className='flex flex-col sm:flex-row h-full px-3 sm:px-4 sm:space-x-4'>
                <Link href={slug} className='w-full sm:w-48 h-32 sm:h-36 my-3 sm:my-4 relative shrink-0'>
                    {!coverImage ? (
                        <Image
                            fill
                            unoptimized
                            src={coverImage || '/placeholder.svg'}
                            alt={title}
                            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                            className='rounded-lg size-full object-cover'
                        />
                    ) : (
                        <ArticleCover title='' type='default' className='rounded-lg size-full object-cover' />
                    )}
                </Link>
                <div className='flex flex-col flex-1 py-2 sm:py-4'>
                    <div className='flex items-start justify-between'>
                        <Link href={slug}>
                            <h3 className='text-base sm:text-lg font-medium text-gray-900 dark:text-muted-foreground mb-1 line-clamp-1 hover:underline hover:text-lime-500 dark:hover:text-lime-400'>
                                {title}
                            </h3>
                        </Link>
                        {/* TODO: Go to github to edit this page*/}
                        <button
                            onClick={handleEditor}
                            className='text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                        >
                            <MoreVertical size={16} className='sm:size-18' />
                        </button>
                    </div>

                    <p className='text-xs sm:text-sm text-gray-600 dark:text-foreground/40 line-clamp-2 mb-2'>{description}</p>

                    <div className='mt-auto flex flex-wrap items-center text-xs text-gray-500 dark:text-foreground/30 gap-3 sm:gap-6'>
                        <div className='flex items-center'>
                            <Calendar size={12} className='mr-1 max-sm:size-3' />
                            <span>{date ? formatDate(date) : ''}</span>
                        </div>

                        <div className='flex items-center'>
                            <span className='mr-1'>文章数</span>
                            <span>{viewCount}</span>
                        </div>

                        <div className='flex items-center'>
                            <span className='mr-1'>订阅人数</span>
                            <span>{commentCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
