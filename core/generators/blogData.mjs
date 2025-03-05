'use strict'

import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { basename, extname, join } from 'node:path'

import graymatter from 'gray-matter'

import { getMarkdownFiles } from '../complier/next.helpers.mjs'

/** 获取当前博客文件夹路径 */
const blogPath = join(process.cwd(), 'pages/zh/blog')

/** 存储博客分类的元数据 */
const blogCategories = new Set(['all'])

/**
 * 使用 gray-matter 提取文件的头部信息
 *
 * @param {string} filename
 * @param {string} source
 * @returns {Object} Frontmatter
 */
const getFrontMatter = (filename, source) => {
    const { title = 'Untitled', author = 'unknown', username, date = new Date(), category = 'uncategorized' } = graymatter(source).data

    const publishYear = new Date(date).getUTCFullYear()

    // 构建文章的分类列表: [默认类型,时间类型,可拓展的自定义类型]
    const categories = ['all', `year-${publishYear}`, category]

    //   将创建年份添加到全局分类集合中
    blogCategories.add(`year-${publishYear}`)

    // 将文章分类添加到全局分类集合中
    blogCategories.add(category)

    // 生成文章的访问路径，基于文件结构
    const slug = `/blog/${category}/${basename(filename, extname(filename))}`

    let result = { title, author, username, date: new Date(date), categories, slug }

    return result
}

/**
 * 该方法用于生成网站博客数据
 * 并在 RSC和静态构建过程中使用
 *
 * @return {Promise<import('../../types').BlogData>}
 */
const generateBlogData = async () => {
    // 获取所有博客文章的完整路径，用于逐个读取文件
    const filenames = await getMarkdownFiles(process.cwd(), 'pages/zh/blog', ['**/index.md', '**/README.md'])

    return new Promise(resolve => {
        const posts = []
        const rawFrontmatter = []

        filenames.forEach(filename => {
            // 创建文件读取流，避免一次性读取大文件
            const _stream = createReadStream(join(blogPath, filename))

            // 创建逐行读取的接口
            const _readLine = createInterface({ input: _stream })

            // 定义分隔符'---'的储存数组
            rawFrontmatter[filename] = [0, '']

            // 逐行读取文件内容
            _readLine.on('line', line => {
                rawFrontmatter[filename][1] += `${line}\n`

                // 检测并记录分隔符 '---'
                if (line === '---') {
                    rawFrontmatter[filename][0] += 1
                }

                // 当检测到两个分隔符时关闭读取流
                if (rawFrontmatter[filename][0] === 2) {
                    _readLine.close()
                    _stream.close()
                }
            })

            // 当读取流关闭时,在解析 Frontmatter
            // 这种方式只读取文件的 Frontmatter 部分
            // 优化了读取性能，尤其适用于处理内容大的Markdown文件
            _readLine.on('close', () => {
                posts.push(getFrontMatter(filename, rawFrontmatter[filename][1]))

                if (posts.length === filenames.length) {
                    resolve({ categories: [...blogCategories], posts })
                }
            })
        })
    })
}

export default generateBlogData
