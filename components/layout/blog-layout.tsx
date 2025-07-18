import type { FC, PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'

import { getGlobClientContext } from '@/core/server'

import { BlogPreviewType, BlogCategory } from '@/types/blog'
import { FetchBlogData } from '@/fatch-data'
import { BlogChatLayout } from '@/components/blog-chat/blog-chat-layout'

const getBlogCategory = async (pathname: string) => {
    // pathname format can either be: /en/blog/{category}
    // or /en/blog/{category}/page/{page}
    // hence we attempt to interpolate the full /en/blog/{category}/page/{page}
    // and in case of course no page argument is provided we define it to 1
    // note that malformed routes can't happen as they are all statically generated
    const [, , category = 'all', , page = 1] = pathname.split('/')

    const { posts, pagination } = await FetchBlogData(category as BlogCategory, Number(page))

    return { category, posts, pagination, page: Number(page) }
}

const BlogLayout: FC<PropsWithChildren> = async ({ children }) => {
    const t = await getTranslations()
    const { pathname } = getGlobClientContext()

    const categories: Array<BlogPreviewType> = ['all', 'news', 'announcements', 'release', 'vulnerability', 'other']

    // generate tabs data
    const mapCategoriesToTabs = (categories: Array<BlogCategory>) =>
        categories.map(category => ({
            key: category,
            label: t(`layouts.blog.categories.${category}`),
            link: `/blog/${category}`,
        }))

    const blogData = await getBlogCategory(pathname)

    return (
        <BlogChatLayout blogData={blogData} categories={mapCategoriesToTabs(categories)}>
            {children}
        </BlogChatLayout>
    )
}

export default BlogLayout