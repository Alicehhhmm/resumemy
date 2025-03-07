'use strict'

import { compile as mdxCompile } from '@mdx-js/mdx'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { matter } from 'vfile-matter'

import { createSval } from './complier.jsx.mjs'
import { REHYPE_PLUGINS, REMARK_PLUGINS } from '../plugins/mdx.plugins.mjs'
import { createGitHubSlugger } from '@/utils/gitHubUtils'

// 定义 MDX 编译器使用的 JSX Fragment 和 JSX 运行时
export const reactRuntime = { Fragment, jsx, jsxs }

/**
 * 编译 Markdown/MDX 源内容，返回解析后的 JSX 和相关元数据
 *
 * @param {import('vfile').VFile} source Markdown/MDX 源内容
 * @param {'md' | 'mdx'} fileExtension 文件扩展名，决定使用 MDX 还是 Markdown 解析器
 * @param {import('mdx/types').MDXComponents} components 用于 MDX Provider 的组件
 * @param {Record<string, any>} props 额外的 React props，传递给 MDX 组件
 *
 * @returns {Promise<{
 *   content: import('react').ReactElement; // 编译后的 React 元素
 *   headings: Array<import('@vcarl/remark-headings').Heading>; // 标题列表
 *   frontmatter: Record<string, any>; // 解析后的 Frontmatter 数据
 *   readingTime: import('reading-time').ReadTimeResults; // 阅读时间计算结果
 * }>}
 */
export async function compile(source, fileExtension, components = {}, props = {}) {
    // 解析 Frontmatter 并将其从源内容中移除
    // 确保 MDX 编译器只处理剩余的内容
    matter(source, { strip: true })

    // 用于生成与 GitHub相同的slug
    const slugger = createGitHubSlugger()

    // 定义编译器使用的相关插件
    // 将 MDX/Markdown 源内容编译为可序列化的 VFile
    const compiled = await mdxCompile(source, {
        rehypePlugins: REHYPE_PLUGINS,
        remarkPlugins: REMARK_PLUGINS,
        format: fileExtension,
    })

    // 创建 Sval 解释器，用于执行编译后的 JavaScript 代码
    const interpreter = createSval({
        ...components,
        'react/jsx-runtime': reactRuntime,
    })

    // 运行编译后的 MDX JavaScript 代码
    interpreter.run(compiled.toString())

    // 从编译后的 MDX 中获取默认导出
    const MDXContent = interpreter.exports.default

    // 直接从编译器渲染 MDX 内容
    const content = <MDXContent {...props} components={components} />

    // 从 VFile 的元数据中获取解析后的数据
    // 包括 Frontmatter、Markdown 标题和阅读时间
    const { headings = [], matter: frontmatter, readingTime } = source.data

    // 为每个标题重新生成 slug，确保与 GitHub 的 slug 一致
    headings.forEach(heading => {
        heading.data = { ...heading.data, id: slugger(heading.value) }
    })

    return { content, headings, frontmatter, readingTime }
}
