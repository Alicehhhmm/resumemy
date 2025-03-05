import type { BlogCategory, BlogPostsRSC } from '@/types';
import { IS_DEV_ENV, VERCEL_ENV, ENABLE_STATIC_EXPORT } from '@/core/next.constants.mjs'

export default function getBlogData(
    cat: BlogCategory,
    page?: number
): Promise<BlogPostsRSC> {
    // 同时支持静态站点生成（SSG）和服务器动态渲染（SSR）的复杂场景
    // 1.判断当前运行环境是 SSR 还是 SSG
    const IS_NOT_SSR = (!IS_DEV_ENV && !VERCEL_ENV)

    // 2.当是静态导出（SSG）时, 动态调用本地数据生成函数
    if (ENABLE_STATIC_EXPORT || IS_NOT_SSR) {
        console.log('CURRENT_ENV', IS_NOT_SSR);
        return import('@/core/providers/blogData').then(
            ({ provideBlogPosts, providePaginatedBlogPosts }) =>
                page ? providePaginatedBlogPosts(cat, page) : provideBlogPosts(cat)
        );
    }

    // 3.默认使用服务器动态渲染（SSR）
    const fetchURL = `http://localhost:3000/zh/api/posts`

    return fetch(fetchURL)
        .then(response => response.json())
        .catch(error => console.log('[FETCH_ERROR_BLOG_DATA]', error))

};
