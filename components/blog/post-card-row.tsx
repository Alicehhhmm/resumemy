import Image from 'next/image'
import { Calendar, MoreVertical } from 'lucide-react'

import { toast } from 'sonner'
import type { BlogCategory } from '@/types/blog'
import { formatDate } from '@/lib/date'
import { Link } from '@/components/common'
import ArticleCover from '@/components/common/ArticleCover'

type BlogPostCardProps = {
    title: string
    category: BlogCategory
    description?: string
    author?: string
    date?: Date
    slug?: string
    viewCount?: number
    commentCount?: number
    coverImage?: string
}

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
        <article className='group relative w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            <div className='flex flex-row h-full px-4 space-x-4'>
                <Link href={slug} className='w-48 h-36 my-4 relative shrink-0'>
                    {!coverImage ? (
                        <Image
                            fill
                            unoptimized
                            src={coverImage || '/placeholder.svg'}
                            alt={title}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='rounded-lg size-full object-cover'
                        />
                    ) : (
                        <ArticleCover title='' type='default' className='rounded-lg size-full object-cover' />
                    )}
                </Link>
                <div className='flex flex-col flex-1 py-4'>
                    <div className='flex items-start justify-between'>
                        <Link href={slug}>
                            <h3 className='text-lg font-medium text-gray-900 mb-1 line-clamp-1 hover:underline hover:text-lime-500'>
                                {title}
                            </h3>
                        </Link>
                        {/* TODO: Go to github to edit this page*/}
                        <button onClick={handleEditor} className='text-gray-400 hover:text-gray-600'>
                            <MoreVertical size={18} />
                        </button>
                    </div>

                    <p className='text-sm text-gray-600 line-clamp-2 mb-2'>{description}</p>

                    <div className='mt-auto flex items-center text-xs text-gray-500 space-x-6'>
                        <div className='flex items-center'>
                            <Calendar size={14} className='mr-1' />
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
