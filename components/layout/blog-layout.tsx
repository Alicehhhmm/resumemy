import type { FC, PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
import { v4 as uuidv4 } from 'uuid'

import { getGlobClientContext } from '@/core/server'
import { NavHeader } from '@/components/navigation/nav-header'
import { FooterSimple } from '@/components/common/footer-simple'
import { BlogHeader, WithBlogCategories } from '@/components/blog'

import { BlogPreviewType, BlogPostsRSC } from '@/types/blog'

export const BlogLayout: FC<PropsWithChildren> = async ({ children }) => {
    const t = await getTranslations()
    const { pathname } = getGlobClientContext()

    const categories: Array<BlogPreviewType> = ['default', 'announcements', 'release', 'vulnerability']

    // generate tabs data
    const mapCategoriesToTabs = (categories: Array<BlogPreviewType>) =>
        categories.map(category => ({
            key: category,
            label: t(`layouts.blog.categories.${category}`),
            link: `/blog/${category}`,
        }))

    // 当前最新路径例：/zh/blog/release
    console.log('pathname', pathname, pathname?.split('/'))

    const blogData: BlogPostsRSC & any = {
        category: pathname?.split('/')[2],
        pagination: {
            next: 2,
            prev: 0,
            pages: 1,
            total: 1,
        },
        posts: [
            {
                id: uuidv4(),
                title: 'Node.js March 17th Infrastructure Incident Post-mortem',
                category: 'all',
                description: 'descriptionxxxxxxxxxxxxxxxxxx',
                author: 'Jane Smith',
                username: 'Jane Smith',
                date: new Date('2024-10-10'),
                slug: '/blog/introduction-to-react-19',
                categories: ['all'],
            },
            {
                id: uuidv4(),
                title: '2Introduction to React 19',
                category: 'all',
                description: 'description',
                authors: ['Jane Smith'],
                username: 'Jane Smith',
                date: new Date('2024-10-10'),
                slug: '/blog/default/2introduction-to-react-19',
                categories: ['all'],
            },
            {
                id: uuidv4(),
                title: '3Introduction to React 19',
                category: 'all',
                description: 'description',
                author: 'Jane Smith',
                username: 'Jane Smith',
                date: new Date('2024-10-10'),
                slug: '/blog/default/3introduction-to-react-19',
                categories: ['all'],
            },
            {
                id: uuidv4(),
                title: '4Introduction to React 19',
                category: 'all',
                description: 'description',
                author: 'Jane Smith',
                username: 'Jane Smith',
                date: new Date('2024-10-10'),
                slug: '/blog/default/4introduction-to-react-19',
                categories: ['all'],
            },
        ],
        grid: [
            {
                slug: '/mdx-lib-analysis',
                title: 'mdx-lib-analysis',
                date: '2023-04-18',
                coverImage: '/placeholder.svg?height=400&width=600',
                excerpt: 'This is my first blog post!',
                content: '<p>This is the content of my first blog post.</p>',
            },
            {
                slug: '/new/new-welcon',
                title: 'new-welcon',
                date: '2023-04-19',
                coverImage: '/placeholder.svg?height=400&width=600',
                excerpt: 'This is my second blog post!',
                content: '<p>This is the content of my second blog post.</p>',
            },
            {
                slug: '/release/v2025-3-3',
                title: 'release/v2025-3-3',
                date: '2023-04-18',
                coverImage: '/placeholder.svg?height=400&width=600',
                excerpt: 'This is my first blog post!',
                content: '<p>This is the content of my first blog post.</p>',
            },
        ],
    }

    return (
        <>
            <NavHeader />
            <main className='pt-navh min-h-[calc(100vh-60px)] bg-gray-50 dark:bg-fluo-background'>
                <div className='max-w-5xl mx-auto p-6 overflow-auto dark:bg-fluo-background space-y-2'>
                    <BlogHeader cover='' title='博客文章' description='行业新闻、研究案例、学习笔记和资源。' />
                    <WithBlogCategories blogData={blogData} categories={mapCategoriesToTabs(categories)} />
                </div>
            </main>
            <FooterSimple />
        </>
    )
}
