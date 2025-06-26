'use client'

import type { FC } from 'react'
import qs from 'query-string'
import { ArrowBigDownDash } from 'lucide-react'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { BookmarkItemType } from '@/types'
import { MasonryGrid, NoMore, LoadMoreButton, EmptyState } from '@/components/common'
import { ScaleInWhenVisible } from '@/components/motions/scroll-animation'
import { BookmarkSkeleton, BookmarkCard } from '@/components/bookmarks'
import { getDefaultLocale } from '@/i18n/lib'

type BookmarksPage = {
    list: BookmarkItemType[]
    hasMore: boolean
    nextPage: number
}

interface FetchBookmarksProps {
    pageParam?: number
    pathname: string
}

async function fetchBookmarks({ pageParam = 1, pathname }: FetchBookmarksProps): Promise<BookmarksPage> {
    const locale = getDefaultLocale()?.code || 'zh'
    const apiPath = pathname ? `${locale}/api${pathname}` : `${locale}/api/bookmarks`

    const fetchURL = qs.stringifyUrl({
        url: `/${apiPath}`,
        query: { page: pageParam },
    })

    const res = await fetch(fetchURL)
    const ruslt = await res.json()

    if (!res.ok) throw new Error('Network error')
    return ruslt
}

export const BookmarkItems: FC<{ pathname: string }> = ({ pathname }) => {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<BookmarksPage, Error>({
        queryKey: ['bookmarks', pathname],
        queryFn: ({ pageParam }) => fetchBookmarks({ pageParam: pageParam as number, pathname }),
        getNextPageParam: (lastPage: BookmarksPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
        initialPageParam: 1,
    })

    const items = data?.pages.flatMap((page: BookmarksPage) => page.list) ?? []

    if (isLoading) {
        return <BookmarkSkeleton />
    }

    return (
        <>
            <MasonryGrid columns='3' gap='md'>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <ScaleInWhenVisible key={`animate_key${index}`} delay={index * 0.05}>
                            <BookmarkCard item={item} />
                        </ScaleInWhenVisible>
                    ))
                ) : (
                    <EmptyState variant='list' />
                )}
            </MasonryGrid>
            {hasNextPage && (
                <LoadMoreButton
                    onClick={fetchNextPage}
                    isLoading={isFetchingNextPage}
                    label='加载更多内容'
                    loadingLabel='努力加载中...'
                    buttonClassName='text-xs text-muted-foreground/80'
                    icon={<ArrowBigDownDash className='size-4' />}
                />
            )}
            {!hasNextPage && <NoMore />}
        </>
    )
}
