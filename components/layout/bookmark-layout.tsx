import type { FC, PropsWithChildren } from 'react'

import { WithChatLayout } from '@/components/WithChatLayout'
import { BookmarkList } from '@/components/bookmarks'

import type { BookmarkItemType, ChannelType } from '@/types'
import { getGlobClientContext } from '@/core/server'

import { getBookmarksData } from '@/core/providers/bookmarks.data'
import { DEFAULT_RAINDROP_COLLECTIONS_ID } from '@/lib/constants'

import { getBookmarkCollections, getSubCollections, getCollectionById, getBookmarksByCollection } from '@/lib/raindrop.io'

const fetchData = async (slug: string) => {
    let bookmarks: BookmarkItemType[] = []
    let bookmarkChannels: Array<ChannelType> = []

    // 获取本地书签数据元：`@/config/bookmarks.json`
    const { list: sitebookmarks, categories: siteBookmarkChannels } = await getBookmarksData(slug)

    if (sitebookmarks && sitebookmarks.length > 0) {
        const thumio = process.env.NEXT_PUBLIC_THUMIO_URL

        bookmarks = sitebookmarks.map((item, index) => ({
            _id: `site_bookmark_${index}`,
            link: item.link,
            title: item.title,
            cover: thumio + item.link,
            domain: item.link,
        }))
    }

    // 获取 Raindrop.io 所有根收藏夹
    const raindropCollections = await getBookmarkCollections()

    if (raindropCollections) {
        // 根据收藏夹 ID 获取所有在该收藏夹下的所有子收藏夹
        const parentcollectionId = raindropCollections.find(citem => citem._id === DEFAULT_RAINDROP_COLLECTIONS_ID)?._id
        const subcollection = await getSubCollections()

        if (subcollection) {
            const subs = subcollection.filter(c => c?.parent?.$id === parentcollectionId)

            // 过滤出与站点书签频道匹配的子收藏夹
            const matched = subs.filter(c => c.slug && siteBookmarkChannels.includes(c.slug))

            bookmarkChannels = matched.map(item => ({
                key: `${item._id}`,
                label: item.title,
                link: `/bookmarks/${item.slug}`,
                desc: `${item.count} bookmarks`,
            }))
        }
    }

    const currentBookmark = bookmarkChannels.find(bookmark => bookmark.link === slug)

    if (currentBookmark) {
        const raindropBookmarks = await getBookmarksByCollection({
            collectionId: currentBookmark.key,
        })

        if (raindropBookmarks && raindropBookmarks.length > 0) {
            const newRaindropBookmarks = raindropBookmarks.map(item => ({
                _id: `${item._id}`,
                link: item.link,
                title: item.title,
                cover: item.cover,
                domain: item.link,
            }))

            // 合并本地 bookmarks 和 Raindrop.io 书签
            bookmarks = [...bookmarks, ...newRaindropBookmarks]
        }
    }

    return { bookmarks, bookmarkChannels, currentBookmark }
}

export const BookmarkLayout: FC<PropsWithChildren> = async ({ children }) => {
    const { pathname } = getGlobClientContext()
    const { bookmarks, bookmarkChannels } = await fetchData(pathname)

    return (
        <WithChatLayout modelKey={['bookmarks']} messages={{ channels: bookmarkChannels, bookmarks: bookmarks }}>
            <BookmarkList list={bookmarks} />
        </WithChatLayout>
    )
}

export default BookmarkLayout
