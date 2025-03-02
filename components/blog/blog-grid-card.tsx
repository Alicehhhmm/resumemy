import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { Link } from '@/components/common'

import type { PostRow } from '@/types/blog'
import { formatDate } from '@/lib/date'

export function BlogGridCard({ post }: { post: PostRow }) {
    return (
        <div className=' flex flex-col bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            <div className='relative h-48'>
                <Link href={`/blog/${post.slug}`}>
                    <Image
                        fill
                        unoptimized
                        src={post.coverImage || '/placeholder.svg'}
                        alt={post.title}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='object-cover'
                    />
                </Link>
            </div>
            <div className='p-4 flex-1 flex flex-col'>
                <Link href={`/blog/${post.slug}`} className='text-xl font-semibold hover:underline mb-2'>
                    {post.title}
                </Link>
                <p className='text-gray-600 flex-1'>{post.excerpt}</p>
                <div className='mt-4 flex justify-between items-center'>
                    {post.date && (
                        <div className='flex items-center gap-1 text-sm text-gray-400'>
                            <Calendar className='w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0' />
                            <time className='text-sm text-gray-500'>{formatDate(post.date)}</time>
                        </div>
                    )}
                    <Link href={`/blog/${post.slug}`} className='text-lime-500 hover:underline'>
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    )
}
