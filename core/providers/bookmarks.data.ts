import { cache } from "react";

import type { BookmarksCategory, BookmarkItemType } from '@/types'

import { generateBookmarks } from "@/core/generators/bookmarks.data.mjs";

const { categories, bookmarksMap } = await generateBookmarks();

export const provideBookmarksCategories = cache(() => categories as Array<BookmarksCategory>);

export const getBookmarksByCategory = cache(async (category: string): Promise<BookmarkItemType[]> => {
    if (!category) return [];

    const result = ['all', ''].includes(category)
        ? Array.from(bookmarksMap.values()).flat()
        : bookmarksMap.get(category) || [];

    return result;
});


/**
 * 根据当前路由返回所有书签相关的数据
 * @params category - 当前路由
 * @param page - 当前页面
 * @returns Object<{ list: BookmarkItemType[], categories: string[] }>
 */
export const getBookmarksData = cache(async (category: BookmarksCategory, page: number | string) => {
    const list = await getBookmarksByCategory(category)
    const categories = provideBookmarksCategories()

    return {
        list,
        categories,
    }
})