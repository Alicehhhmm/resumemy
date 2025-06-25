import type { FC, PropsWithChildren } from 'react'
import { WithChatLayout } from '@/components/WithChatLayout'
import { BookmarkList } from '@/components/bookmarks'

import { getGlobClientContext } from '@/core/server'
import { loadBookmarks } from '@/fatch-data/fatch-bookmark-data'

export const BookmarkLayout: FC<PropsWithChildren> = async ({ children }) => {
    const { pathname } = getGlobClientContext()
    const { bookmarks, channels } = await loadBookmarks(pathname)

    return (
        <WithChatLayout modelKey={['bookmarks']} messages={{ channels, bookmarks }}>
            <BookmarkList pathname={pathname} initialData={bookmarks} />
        </WithChatLayout>
    )
}

export default BookmarkLayout
