'use strict'

import { readFile } from 'node:fs/promises'
import { join, normalize, sep } from 'node:path'

import { DYNAMIC_ROUTES, IGNORED_ROUTES, PAGE_METADATA } from './next.dynamic.constants.mjs'
import { POSTS_FOLDER_NAME } from './dynamic-route-constants'

import { availableLocaleCodes, defaultLocale } from './next.locales.mjs'
import { getMarkdownFiles } from './complier/next.helpers.mjs'

/**
 * [中文文档]
 * 将文件系统路径转换为路由对象
 *
 * @params {string} [locale=defaultLocale.code] - BCP 47语言标签
 * @params {string} [path=''] - 文件系统路径（操作系统特定格式）
 * @return {Object} 路由配置对象
 * @property {string} locale - 目标语言代码
 * @property {string[]} path - 标准化路由分段
 * @example
 * Windows系统
 * mapPathToRoute('zh-CN', 'docs\\api\\rest.mdx')  → { locale: 'zh-CN', path: ['docs', 'api', 'rest'] }
 *
 * Unix系统
 * mapPathToRoute('en-US', 'blog/news') → { locale: 'en-US', path: ['blog','news'] }
 * @note 使用操作系统特定的路径分隔符, 保证不同操作系统的兼容性 (('node:path').sep)
 * @usage 从文件系统结构生成静态路由
 */
const mapPathToRoute = (locale = defaultLocale.code, path = '') => ({
    locale,
    path: path.split(sep),
})

/**
 * 将路由对象转换为浏览器可用的URL
 * Reconstructs URL path from path segments
 *
 * @param {string[]} [path=[]] - Route segments array
 * @returns {string} Normalized URL path (always uses '/' separator)
 * @example
 * getPathname(['blog', 'news']) → 'blog/news'
 */
const getPathname = (path = []) => path.join('/')

const getDynamicRouter = async () => {
    // Keeps the map of pathnames to filenames
    const pathnameToFilename = new Map()

    // 获取指定文件夹下, 特定语言路径的所有 md(x) 文件
    // [ 'index.mdx', 'blog\\index.md', 'blog\\new\\new-welcon.md' ]
    const websitePages = await getMarkdownFiles(process.cwd(), `${POSTS_FOLDER_NAME}/${defaultLocale.code}`)

    websitePages.forEach(filename => {
        // This Regular Expression is used to remove the `index.md(x)` suffix
        // of a name and to remove the `.md(x)` extensions of a filename.
        let pathname = filename.replace(/((\/)?(index))?\.mdx?$/i, '')
        // blog\\index.md -> blog\index

        if (pathname.length > 1 && pathname.endsWith(sep)) {
            pathname = pathname.substring(0, pathname.length - 1)
            // blog\ ->  blog
        }

        pathname = normalize(pathname).replace('.', '')

        // We map the pathname to the filename to be able to quickly
        // resolve the filename for a given pathname
        pathnameToFilename.set(pathname, filename)
    })

    /**
     * ZH: 该方法返回所给语言环境中存在的所有路由的列表
     * This method returns a list of all routes that exist for a given locale
     *
     * @param {string} locale
     * @returns {Promise<Array<string>>}
     */
    const getRoutesByLanguage = async (locale = defaultLocale.code) => {
        const shouldIgnoreStaticRoute = pathname => IGNORED_ROUTES.every(e => !e({ pathname, locale }))

        return [...pathnameToFilename.keys()].filter(shouldIgnoreStaticRoute).concat([...DYNAMIC_ROUTES.keys()])
    }

    return {
        mapPathToRoute,
        getPathname,
        getRoutesByLanguage,
        // getMDXContent,
        // getMarkdownFile,
        // getPageMetadata,
    }
}

export const dynamicRouter = await getDynamicRouter()
