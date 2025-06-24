'use client'

import type { FC } from 'react'
import { useMemo } from 'react'
import type { BookmarkItemType } from '@/types'

import { BookmarkCard } from '@/components/bookmarks'
import { MasonryGrid } from '@/components/common'
import { ScaleInWhenVisible } from '@/components/motions/scroll-animation'

interface BookmarkListProps {
    list: BookmarkItemType[]
}

export const BookmarkList: FC<BookmarkListProps> = ({ list }) => {
    const memoizedBookmarks = useMemo(
        () =>
            list.map((item, index) => (
                <ScaleInWhenVisible key={`bookmark_animate_key${index}`} delay={index * 0.05}>
                    <BookmarkCard item={item} />
                </ScaleInWhenVisible>
            )),
        [list]
    )

    return (
        <div className=''>
            <MasonryGrid columns='3' gap='md'>
                {memoizedBookmarks}
            </MasonryGrid>
        </div>
    )
}
