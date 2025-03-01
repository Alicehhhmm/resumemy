import { Calendar, MoreVertical } from 'lucide-react'
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
}: BlogPostCardProps) => {
    return (
        <article className='group relative w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            <Link href={slug} className='flex flex-row h-full'>
                <div className='w-48 h-36 relative shrink-0'>{/* <ArticleCover title={title} type='default' /> */}</div>
                <div className='flex flex-col flex-1 p-4'>
                    <div className='flex items-start justify-between'>
                        <h3 className='text-lg font-medium text-gray-900 mb-1 line-clamp-1'>{title}</h3>
                        <button className='text-gray-400 hover:text-gray-600'>
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
            </Link>
        </article>
    )
}
