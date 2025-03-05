import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { Link } from '@/components/common'

import type { ExtendedType } from '@/types/blog'
import { formatDate } from '@/lib/date'

export function BlogGridCard({ post }: { post: ExtendedType }) {
    return (
        <div className='flex flex-col bg-white dark:bg-neutral-900/40 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            <div className='relative h-48 sm:h-56 md:h-64'>
                <Link href={`/blog/${post.slug}`}>
                    <Image
                        fill
                        unoptimized
                        src={post.coverImage || '/placeholder.svg'}
                        alt={post.title}
                        sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                        className='object-cover'
                    />
                </Link>
            </div>
            <div className='p-4 md:p-5 flex-1 flex flex-col'>
                <Link
                    href={`/blog/${post.slug}`}
                    className='text-lg sm:text-xl font-semibold hover:underline mb-2 text-gray-900 dark:text-muted-foreground'
                >
                    {post.title}
                </Link>
                <p className='text-gray-600 dark:text-muted-foreground/80 text-sm sm:text-base flex-1 line-clamp-3'>{post.excerpt}</p>
                <div className='mt-4 flex justify-between items-center'>
                    {post.date && (
                        <div className='flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-500'>
                            <Calendar className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-gray-600 dark:text-gray-500 flex-shrink-0' />
                            <time>{formatDate(post.date)}</time>
                        </div>
                    )}
                    <Link href={`/blog/${post.slug}`} className='text-lime-600 dark:text-lime-500 hover:underline text-sm sm:text-base'>
                        阅读更多
                    </Link>
                </div>
            </div>
        </div>
    )
}
