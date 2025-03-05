'use strict'

import { cache } from 'react'

import { readFile } from 'node:fs/promises'
import { join, normalize, sep } from 'node:path'

import { DYNAMIC_ROUTES, IGNORED_ROUTES, PAGE_METADATA } from './next.dynamic.constants.mjs'
import { POSTS_FOLDER_NAME } from './dynamic-route-constants'
import { IS_DEV_ENV } from '@/core/next.constants.mjs'

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

/**
 * 该方法用于存储 Markdown 文件内容
 * - 在开发环境下，禁用缓存
 *
 * @returns {Map|null} 缓存对象
 */
const createCachedMarkdownCache = () => {
    if (IS_DEV_ENV) {
        return {
            has: () => false,
            set: () => {},
            get: () => null,
        }
    }

    return new Map()
}

const getDynamicRouter = async () => {
    const pathnameToFilename = new Map()
    const cachedMarkdownFiles = createCachedMarkdownCache()

    // 获取指定文件夹下, 特定语言路径的所有md(x)文件
    // 返回[ 'index.mdx', 'blog\\index.md']
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

    /**
     * 获取本地的 Markdown 文件(原)内容
     *
     * @param {string} locale
     * @param {string} pathname
     * @returns {Promise<{ source: string; filename: string }>}
     */
    const _getMarkdownFile = async (locale = '', pathname = '') => {
        const normalizedPathname = normalize(pathname).replace('.', '')

        // 检查路径是否存在于路径到文件名的映射中(如果存在，则该路由可以渲染)
        if (pathnameToFilename.has(normalizedPathname)) {
            const filename = pathnameToFilename.get(normalizedPathname)
            const filepath = join(process.cwd(), `${POSTS_FOLDER_NAME}`, locale, filename)

            // 检查缓存中是否已存在本地版本的文件内容(如果存在，则直接返回缓存内容)
            if (cachedMarkdownFiles.has(`${locale}${normalizedPathname}`)) {
                const fileContent = cachedMarkdownFiles.get(`${locale}${normalizedPathname}`)

                return { source: fileContent, filename }
            }

            // 开始读取本地文件内容
            const fileLanguageContent = await readFile(filepath, 'utf8').catch(() => undefined)

            // 如果成功读取到本地文件内容，则将其加入缓存并返回
            if (fileLanguageContent && typeof fileLanguageContent === 'string') {
                cachedMarkdownFiles.set(`${locale}${normalizedPathname}`, fileLanguageContent)

                return { source: fileLanguageContent, filename }
            }

            // 避免无限递归：
            // 当前语言是默认语言（例如 'en'），且文件不存在，则返回空内容
            if (locale === defaultLocale.code) {
                return { filename: '', source: '' }
            }

            // 如果本地版本不存在，则尝试获取默认语言版本的内容
            const { source: fileContent } = await _getMarkdownFile(defaultLocale.code, pathname)

            // 将默认语言版本的内容加入本地缓存，以提高后续读取性能
            cachedMarkdownFiles.set(`${locale}${normalizedPathname}`, fileContent)

            return { source: fileContent, filename }
        }

        return { filename: '', source: '' }
    }

    // Creates a Cached Version of the Markdown File Resolver
    const getMarkdownFile = cache(async (locale, pathname) => {
        return await _getMarkdownFile(locale, pathname)
    })

    return {
        mapPathToRoute,
        getPathname,
        getRoutesByLanguage,
        getMarkdownFile,
        // getMDXContent,
        // getPageMetadata,
    }
}

export const dynamicRouter = await getDynamicRouter()
