import { getTranslations } from "next-intl/server";
import type { BookmarksCategory, BookmarkItemType, ChannelType } from '@/types'

import { getBookmarksData, provideBookmarksCategories, getBookmarksByCategory } from '@/core/providers/bookmarks.data'

import { DEFAULT_RAINDROP_COLLECTIONS_ID } from '@/lib/constants'
import { getBookmarkCollections, getSubCollections, getBookmarksByCollection } from '@/lib/raindrop.io'


/** 获取指定分类下的书签（本地） */
export const fetchSiteBookmarks = async (slug: string): Promise<BookmarkItemType[]> => {
  const [, , category = 'all', , page = 1] = slug.split('/')

  const { list } = await getBookmarksData(category as BookmarksCategory, page)
  const thumio = process.env.NEXT_PUBLIC_THUMIO_URL!;

  return (list ?? []).map((item, idx) => ({
    _id: `site_bookmark_${idx}`,
    link: item.link,
    title: item.title,
    cover: thumio + item.link,
    domain: item.link,
    category: category as BookmarksCategory,
  }))
}

/** 获取所有本地书签分类频道列表 */
export const fetchAllSiteChannels = async (): Promise<ChannelType[]> => {
  const t = await getTranslations()
  const categories: BookmarksCategory[] = provideBookmarksCategories()

  return Promise.all(
    (categories).map(async (category) => {
      const list = await getBookmarksByCategory(category)
      const count = list?.length ?? 0

      return {
        key: category,
        label: t(`layouts.bookmarks.categories.${category}`),
        link: `/bookmarks/${category}`,
        count,
        desc: `${count} bookmarks`,
      }
    })
  )
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
  const siteBookmarks = await fetchSiteBookmarks(slug)
  const siteChannels = await fetchAllSiteChannels()
  const remoteChannels = await fetchMatchedCollections(siteChannels)

  let combinedBookmarks = [...siteBookmarks]
  const currentChannel = remoteChannels.find(c => c.link === slug)

  if (currentChannel) {
    const remoteBookmarks = await fetchRaindropBookmarks(currentChannel.key)
    combinedBookmarks = [...combinedBookmarks, ...remoteBookmarks]
  }

  let channels = mergeChannels(siteChannels, remoteChannels)

  return {
    bookmarks: combinedBookmarks,
    channels,
  }
}
