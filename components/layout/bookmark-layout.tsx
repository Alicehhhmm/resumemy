import type { FC, PropsWithChildren } from 'react'

import { WithChatLayout } from '@/components/WithChatLayout'
import { BookmarkList } from '@/components/bookmarks'

import { getGlobClientContext } from '@/core/server'

import { getBookmarksData } from '@/core/providers/bookmarks.data'

export const BookmarkLayout: FC<PropsWithChildren> = async ({ children }) => {
    const { pathname } = getGlobClientContext()

    const { list } = await getBookmarksData(pathname)

    // TODO: filter list link use raindrop.io 

    return (
        <WithChatLayout modelKey={['bookmarks']} messages={{ channels: [] }}>
            <BookmarkList list={list} />
        </WithChatLayout>
    )
}

export default BookmarkLayout
