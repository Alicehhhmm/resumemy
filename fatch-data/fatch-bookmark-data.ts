import { getTranslations } from "next-intl/server";
import type { BookmarksCategory, BookmarkItemType, ChannelType } from '@/types'

import { getBookmarksData } from '@/core/providers/bookmarks.data'

import { DEFAULT_RAINDROP_COLLECTIONS_ID } from '@/lib/constants'
import { getBookmarkCollections, getSubCollections, getBookmarksByCollection } from '@/lib/raindrop.io'

/** 获取本地书签数据并映射为标准格式 */
const fetchSiteBookmarks = async (slug: string): Promise<{ bookmarks: BookmarkItemType[]; siteChannels: ChannelType[] }> => {
    const t = await getTranslations();
    const { list, categories } = await getBookmarksData(slug)
    const thumio = process.env.NEXT_PUBLIC_THUMIO_URL

    const bookmarks = (list ?? []).map((item, index) => ({
        _id: `site_bookmark_${index}`,
        link: item.link,
        title: item.title,
        cover: thumio + item.link,
        domain: item.link,
    }))

    const mapSiteChannels = (categories: Array<BookmarksCategory>) => {
        return categories.map(category => ({
            key: category,
            label: t(`layouts.bookmarks.categories.${category}`),
            link: `/bookmarks/${category}`,
            count: bookmarks.length,
        }))
    }

    const siteChannels: ChannelType[] = mapSiteChannels(categories as Array<BookmarksCategory>)

    return { bookmarks, siteChannels }
}

/** 获取符合本地分类的 Raindrop 子集合 */
const fetchMatchedCollections = async (siteChannels: ChannelType[]): Promise<ChannelType[]> => {
    const allCollections = await getBookmarkCollections()
    const subCollections = await getSubCollections()

    const parentId = allCollections && allCollections.find(c => c._id === DEFAULT_RAINDROP_COLLECTIONS_ID)?._id

    const matched = (subCollections ?? []).filter(c => c.parent?.$id === parentId && siteChannels.some(sc => sc.key === c.slug))

    return matched.map(c => ({
        key: `${c._id}`,
        label: c.title,
        link: `/bookmarks/${c.slug}`,
        count: c.count,
    }))
}

/** 获取某个 Raindrop 频道下的书签 */
const fetchRaindropBookmarks = async (collectionId: string): Promise<BookmarkItemType[]> => {
    const raw = await getBookmarksByCollection({ collectionId })
    return (raw ?? []).map(item => ({
        _id: `${item._id}`,
        link: item.link,
        title: item.title,
        cover: item.cover,
        domain: item.link,
    }))
}

/** 合并本地 + 远程频道列表 */
const mergeChannels = (local: ChannelType[], remote: ChannelType[]): ChannelType[] => {
    const mapChannel = new Map<string, ChannelType>()

    for (const ch of local) {
        mapChannel.set(ch.link, { ...ch })
    }

    for (const ch of remote) {
        const existing = mapChannel.get(ch.link)
        mapChannel.set(ch.link, {
            ...ch,
            count: (existing?.count || 0) + (ch.count || 0),
        })
    }

    return Array.from(mapChannel.values()).map(ch => ({
        ...ch,
        desc: `${ch.count ?? 0} bookmarks`,
    }))
}

/** 加载所有书签数据（合并本地+远程） */
export const loadBookmarks = async (slug: string) => {
    const { bookmarks: siteBookmarks, siteChannels } = await fetchSiteBookmarks(slug)
    const remoteChannels = await fetchMatchedCollections(siteChannels)

    let combinedBookmarks = [...siteBookmarks]
    const currentChannel = remoteChannels.find(c => c.link === slug)

    if (currentChannel) {
        const remoteBookmarks = await fetchRaindropBookmarks(currentChannel.key)
        combinedBookmarks = [...combinedBookmarks, ...remoteBookmarks]
    }

    return {
        bookmarks: combinedBookmarks,
        channels: mergeChannels(siteChannels, remoteChannels),
    }
}
