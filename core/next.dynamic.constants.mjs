'use strict'

import { defaultLocale } from './next.locales.mjs'

/**
 * This is a list of all static routes or pages from the Website that we do not
 * want to allow to be statically built on our Static Export Build.
 *
 * @type {Array<((route: import('./types').RouteSegment) => boolean)>} A list of Ignored Routes by Regular Expressions
 */
export const IGNORED_ROUTES = [
    // 此选项用于忽略除: 默认语言(zh) 之外的所有博客路由
    ({ locale, pathname }) => locale !== defaultLocale.code && /^blog/.test(pathname),
    // 忽略所有空的路径名
    ({ locale, pathname }) => locale.length && !pathname.length,
]

/**
 * This constant is used to create static routes on-the-fly that do not have a file-system
 * counterpart route. This is useful for providing routes with matching Layout Names
 * but that do not have Markdown content and a matching file for the route
 *
 * @type {Map<string, import('./types').Layouts>} A Map of pathname and Layout Name
 */
export const DYNAMIC_ROUTES = new Map([
    // Provides Routes for all Blog Categories
])
