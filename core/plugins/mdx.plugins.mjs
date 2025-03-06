'use strict'

import remarkHeadings from '@vcarl/remark-headings'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import readingTime from 'remark-reading-time'

import rehypeShikiji from './mdx.shiki.mjs'

/**
 * 所有用于处理MDX中 HTML 的 Rehype 插件
 *
 * @type {Array<import('unified').Plugin>}
 */
export const REHYPE_PLUGINS = [
    // 为标题生成 `id` 属性 (H1, ...)
    rehypeSlug,
    // 为标题自动添加锚点链接 (#H1, ...)
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    // 代码块、代码高亮处理
    rehypeShikiji,
]

/**
 * 所有用于处理MDX中Markdown语法的 Remark 插件
 *
 * @type {Array<import('unified').Plugin>}
 */
export const REMARK_PLUGINS = [
    // 支持 GitHub Flavored Markdown 语法
    remarkGfm,
    // 提取 Markdown 标题元数据
    remarkHeadings,
    // 计算内容阅读时间
    readingTime,
]
