'use client'

import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Link2Icon } from 'lucide-react'

import type { BookmarkItemType } from '@/types'
import { Link } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'

interface BookmarkCardProps {
    item: BookmarkItemType
    className?: string
}

const cardVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    hover: {
        y: -4,
        boxShadow: '0 8px 20px rgba(var(--primary-rgb), 0.08)',
        transition: { duration: 0.25 },
    },
}

export const BookmarkCard: FC<BookmarkCardProps> = ({ item, className = '' }) => {
    const { link, desc } = item

    return (
        <motion.div
            variants={cardVariants}
            initial='initial'
            whileInView='animate'
            whileHover='hover'
            viewport={{ once: true }}
            className={`h-full ${className}`}
        >
            <Link href={link} target='_blank' rel='noopener noreferrer' className='block h-full group'>
                <Card className='relative h-full rounded-xl overflow-hidden border border-gray-100 bg-white transition-all duration-300 shadow-sm hover:shadow-md'>
                    <div className='relative h-44 bg-gray-100 overflow-hidden'>
                        <img
                            src={link ?? '/placeholder.svg'}
                            alt={link}
                            loading='lazy'
                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                            onError={e => {
                                e.currentTarget.src = '/placeholder.svg'
                            }}
                        />
                    </div>

                    <CardContent className='p-4 flex flex-col justify-between gap-1'>
                        <p className='text-sm font-semibold text-gray-900 line-clamp-3'>{desc}</p>

                        <div className='line-clamp-4 inline-flex items-center gap-1 text-xs text-gray-500'>
                            <span className='truncate'>{link}</span>
                            <Link2Icon size={12} className='shrink-0 text-xs text-gray-400 group-hover:text-lime-400 transition-colors' />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}
