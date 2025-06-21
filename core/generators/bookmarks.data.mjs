import { siteNavigation, bookmarksJSON } from '@/config/next.json.mjs'

const DEFAULT_CATEGORY = 'all'

// 统一缓存对象
const cache = {
    categories: new Map(),
    bookmarks: new Map(),
}

/**
 * 获取指定导航键对应的书签类别
 * @param {string[]} keys - 导航键数组
 * @returns {string[]} 类别数组
 */
export function getBookmarksCategories(keys = []) {
    const cacheKey = keys.slice().sort().join('-') || 'empty'
    if (cache.categories.has(cacheKey)) return cache.categories.get(cacheKey)

    const categories = keys.flatMap(key => {
        const navItem = siteNavigation.sideNavigation[key]
        return navItem?.items ? Object.keys(navItem.items) : []
    })

    cache.categories.set(cacheKey, categories)
    return categories
}

/**
 * 构建书签信息，包括所有类别、每类的书签列表和总书签数
 * @returns {Promise<{ categories: string[], bookmarksMap: Map<string, any[]>}>}
 */
export async function generateBookmarks() {
    const cacheKey = 'global'
    if (cache.bookmarks.has(cacheKey)) return cache.bookmarks.get(cacheKey)

    const dynamicCategories = getBookmarksCategories(['bookmarks'])

    const bookmarksMap = new Map(Object.entries(bookmarksJSON).map(([category, items]) => [category, Array.isArray(items) ? items : []]))

    const result = {
        categories: [DEFAULT_CATEGORY, ...dynamicCategories],
        bookmarksMap,
    }
    
    cache.bookmarks.set(cacheKey, result)
    return result
}
